import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());

// Enhanced CORS configuration
app.use(
  cors({
    origin: [/localhost:\d+$/, /\.localhost:\d+$/], // cocok untuk local dev
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const PORT = 3001;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasApiKey: !!OPENROUTER_API_KEY,
    queueLength: requestQueue.length,
  });
});

// ===== Enhanced Queue system untuk menghindari 429 =====
let requestQueue = [];
let processing = false;
let lastRequestTime = 0;
const MIN_DELAY_BETWEEN_REQUESTS = 1000; // 1 detik minimum delay
const MAX_RETRIES = 3;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processQueue() {
  if (processing) return;
  if (requestQueue.length === 0) return;

  processing = true;

  try {
    while (requestQueue.length > 0) {
      const { req, res, retries = 0 } = requestQueue.shift();

      // Ensure minimum delay between requests
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < MIN_DELAY_BETWEEN_REQUESTS) {
        await delay(MIN_DELAY_BETWEEN_REQUESTS - timeSinceLastRequest);
      }

      try {
        const { prompt } = req.body;

        console.log(
          `Processing request (attempt ${retries + 1}/${MAX_RETRIES + 1})`
        );

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "http://localhost:3001",
              "X-Title": "AI Document Generator",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1:free",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 200,
              temperature: 0.7,
            }),
          }
        );

        lastRequestTime = Date.now();

        if (response.status === 429) {
          // Rate limited - implement exponential backoff
          if (retries < MAX_RETRIES) {
            const backoffDelay = Math.pow(2, retries) * 2000; // 2s, 4s, 8s
            console.log(
              `Rate limited, retrying in ${backoffDelay}ms (attempt ${
                retries + 1
              })`
            );

            await delay(backoffDelay);

            // Re-queue with retry count
            requestQueue.unshift({ req, res, retries: retries + 1 });
            continue;
          } else {
            return res.status(429).json({
              reply: "Service temporarily overloaded. Please try again later.",
              error: "RATE_LIMIT_EXCEEDED",
              retryAfter: 60,
            });
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Error ${response.status}:`, errorText);

          return res.status(response.status).json({
            reply: `API Error: ${response.status}`,
            error: "OPENROUTER_ERROR",
            details: errorText,
          });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No reply from AI";

        res.json({
          reply,
          success: true,
          usage: data.usage,
          queuePosition: 0,
        });
      } catch (err) {
        console.error("Request processing error:", err);

        if (
          retries < MAX_RETRIES &&
          (err.code === "ECONNRESET" || err.code === "ETIMEDOUT")
        ) {
          // Network error - retry
          const backoffDelay = Math.pow(2, retries) * 1000; // 1s, 2s, 4s
          console.log(`Network error, retrying in ${backoffDelay}ms`);

          await delay(backoffDelay);
          requestQueue.unshift({ req, res, retries: retries + 1 });
          continue;
        }

        res.status(500).json({
          reply: "Error contacting AI service",
          error: "NETWORK_ERROR",
          details: err.message,
        });
      }

      // Small delay between successful requests
      await delay(500);
    }
  } finally {
    processing = false;
  }
}

// Endpoint chat menggunakan queue
app.post("/chat", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      reply: "No prompt provided",
      error: "MISSING_PROMPT",
    });
  }

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({
      reply: "API key not configured",
      error: "MISSING_API_KEY",
    });
  }

  // Check queue size to prevent memory issues
  if (requestQueue.length > 50) {
    return res.status(503).json({
      reply: "Server is too busy. Please try again later.",
      error: "QUEUE_FULL",
      queueLength: requestQueue.length,
    });
  }

  // Add to queue with position info
  const position = requestQueue.length + 1;
  requestQueue.push({ req, res });

  console.log(`Request queued at position ${position}`);

  // Start processing if not already running
  if (!processing) {
    setTimeout(processQueue, 100); // Small delay to batch requests
  }
});

// Endpoint untuk cek status queue
app.get("/queue-status", (req, res) => {
  res.json({
    queueLength: requestQueue.length,
    processing,
    lastRequestTime: new Date(lastRequestTime).toISOString(),
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");

  // Respond to remaining queue items
  requestQueue.forEach(({ res }) => {
    if (!res.headersSent) {
      res.status(503).json({
        reply: "Server shutting down",
        error: "SERVER_SHUTDOWN",
      });
    }
  });

  process.exit(0);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`AI proxy running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${!!OPENROUTER_API_KEY}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Queue status: http://localhost:${PORT}/queue-status`);
});
