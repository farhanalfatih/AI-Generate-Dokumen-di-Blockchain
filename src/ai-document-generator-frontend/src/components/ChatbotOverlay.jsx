import React, { useState, useEffect, useRef } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backendIDL } from "../../../declarations/ai-document-generator-backend";
import { FaRobot, FaUser, FaSpinner } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const agent = new HttpAgent({ host: "http://localhost:4943" });
const backend = Actor.createActor(backendIDL, {
  agent,
  canisterId: "uxrrr-q7777-77774-qaaaq-cai",
});

const ChatbotOverlay = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("unknown");
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  const checkServerHealth = async () => {
    try {
      const res = await fetch("http://localhost:3001/health");
      const data = await res.json();
      setServerStatus(data.hasApiKey ? "healthy" : "no-api-key");
    } catch {
      setServerStatus("offline");
    }
  };

  useEffect(checkServerHealth, []);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender, timestamp: Date.now() }]);
  };

  const isImageURL = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const renderMessageContent = (text) => {
    // Cek jika teks hanya berupa URL gambar
    if (isImageURL(text.trim())) {
      return (
        <img src={text} alt="AI generated" className="max-w-full rounded-md" />
      );
    }
    // Markdown & tabel
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    addMessage(userMessage, "user");
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();

      if (data.error || !data.reply) {
        addMessage(`❌ ${data.reply || data.error || "No reply"}`, "bot");
      } else {
        addMessage(data.reply, "bot");
      }

      try {
        await backend.chat(userMessage);
      } catch (err) {
        console.warn("Could not save to backend:", err.message);
      }
    } catch {
      addMessage(
        "🔗 Connection error. Please check if the server is running on port 3001.",
        "bot"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () =>
    ({
      healthy: "text-green-400",
      "no-api-key": "text-yellow-400",
      error: "text-red-400",
      offline: "text-red-500",
    }[serverStatus] || "text-gray-400");

  const getStatusText = () =>
    ({
      healthy: "Connected",
      "no-api-key": "No API Key",
      error: "Server Error",
      offline: "Server Offline",
    }[serverStatus] || "Checking...");

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-gradient-to-br from-purple-600 to-indigo-500 text-white p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transform transition z-50"
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-gray-900 rounded-xl shadow-2xl flex flex-col text-white z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-700 to-purple-600 p-3 flex justify-between items-center rounded-t-xl">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">AI Chatbot</span>
              <span className={`text-xs ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={checkServerHealth}
                className="text-white text-sm hover:text-blue-200 px-2 py-1 rounded"
                title="Refresh connection"
              >
                🔄
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white text-lg hover:text-red-400"
              >
                ❌
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-start p-2 rounded-lg max-w-[85%] ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-indigo-700 to-purple-600 self-end ml-auto flex-row-reverse"
                    : "bg-gray-800 self-start mr-auto"
                }`}
              >
                <div
                  className={`${
                    m.sender === "user" ? "ml-2" : "mr-2"
                  } flex-shrink-0`}
                >
                  {m.sender === "user" ? (
                    <FaUser className="text-yellow-300" size={14} />
                  ) : (
                    <FaRobot className="text-cyan-400" size={14} />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`${
                      m.sender === "user" ? "text-right" : "text-left"
                    } text-sm`}
                  >
                    {renderMessageContent(m.text)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start p-2 rounded-lg max-w-[85%] bg-gray-800 self-start mr-auto">
                <FaRobot className="mr-2 text-cyan-400" size={14} />
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" size={12} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-700 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={loading ? "Please wait..." : "Type a message..."}
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm text-white bg-gray-800 rounded-md outline-none placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="ml-2 bg-gradient-to-br from-purple-600 to-indigo-500 px-4 py-2 rounded-md hover:scale-105 transform transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <FaSpinner className="animate-spin" size={14} />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotOverlay;
