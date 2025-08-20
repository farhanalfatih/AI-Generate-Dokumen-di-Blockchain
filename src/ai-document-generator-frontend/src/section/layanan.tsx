import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layanan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-4 text-center"
      >
        Our Services
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-400 text-sm md:text-base max-w-2xl text-center mb-10"
      >
        We provide blockchain-based services powered by AI 
        to help manage and secure your digital documents.
      </motion.p>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-700 rounded-2xl p-8 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition"
        >
          <Clock className="w-12 h-12 mb-4 text-gray-500" />
          <h2 className="text-xl font-semibold">AI Chat</h2>
          <p className="text-sm mt-3 text-gray-300 text-start">
            A dedicated AI assistant to help you create agreements and documents.
          </p>
        </motion.div>

        {/* Middle → Navigate to /upload */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/upload")}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-700 rounded-2xl p-8 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition"
        >
          <FileText className="w-16 h-16 mb-4 text-blue-400" />
          <h2 className="text-xl font-semibold">Upload Documents to Blockchain</h2>
          <p className="text-sm mt-3 text-gray-300 text-start">
            Upload your files to be processed on the blockchain. 
            Secure, fast, and transparent.
          </p>
        </motion.div>

        {/* Right */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-800 rounded-2xl p-6 bg-gray-900/50 hover:bg-gray-800/70 transition"
        >
          <Clock className="w-12 h-12 mb-4 text-gray-500" />
          <span className="text-lg font-medium text-gray-400">Coming Soon</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Layanan;
