import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());

// Enhanced CORS configuration
app.use(
  cors({
    origin: ["http://localhost:4943", "http://127.0.0.1:4943", "*"],
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
  });
});

app.post("/chat", async (req, res) => {
  console.log("Received chat request:", req.body);

  const { prompt } = req.body;

  if (!prompt) {
    console.log("No prompt provided");
    return res.status(400).json({
      reply: "No prompt provided",
      error: "MISSING_PROMPT",
    });
  }

  if (!OPENROUTER_API_KEY) {
    console.log("No OpenRouter API key found");
    return res.status(500).json({
      reply: "API key not configured",
      error: "MISSING_API_KEY",
    });
  }

  try {
    console.log("Sending request to OpenRouter...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3001", // Required by OpenRouter
          "X-Title": "AI Document Generator", // Optional but recommended
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    console.log("OpenRouter response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);

      return res.status(response.status).json({
        reply: `API Error: ${response.status}`,
        error: "OPENROUTER_ERROR",
        details: errorText,
      });
    }

    const data = await response.json();
    console.log("OpenRouter raw response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content || "No reply from AI";

    if (!data.choices?.[0]?.message?.content) {
      console.log("No content in response:", data);
    }

    res.json({
      reply,
      success: true,
      usage: data.usage,
    });
  } catch (err) {
    console.error("OpenRouter error:", err.message);
    console.error("Stack trace:", err.stack);

    res.status(500).json({
      reply: "Error contacting AI service",
      error: "NETWORK_ERROR",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI proxy running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${!!OPENROUTER_API_KEY}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
