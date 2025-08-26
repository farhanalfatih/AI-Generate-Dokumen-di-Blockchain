import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layanan = () => {
  const navigate = useNavigate();

  // State untuk modal dan prompt
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  // Ref untuk abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Reset state saat buka modal
  const handleOpenModal = () => {
    setShowPromptModal(true);
    setPrompt("");
    setError("");
    setCurrentStep("");
  };

  // Fungsi untuk close modal dan cleanup
  const handleCloseModal = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setShowPromptModal(false);
    setIsGenerating(false);
    setError("");
    setCurrentStep("");
  };

  // Fungsi generate PDF dengan enhanced error handling
  const handleGeneratePDF = async () => {
    if (!prompt.trim()) {
      setError("Silakan masukkan prompt terlebih dahulu");
      return;
    }

    setIsGenerating(true);
    setError("");

    // Create abort controller untuk cancel request
    abortControllerRef.current = new AbortController();

    try {
      setCurrentStep("Menghubungi AI untuk membuat teks...");

      // 1️⃣ Kirim prompt ke AI generate surat
      const aiRes = await fetch("http://localhost:4000/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
        signal: abortControllerRef.current?.signal,
      });

      if (!aiRes.ok) {
        const errorData = await aiRes.json().catch(() => ({}));

        if (aiRes.status === 429) {
          throw new Error(
            "Layanan AI sedang sibuk. Silakan coba lagi dalam beberapa saat."
          );
        } else if (aiRes.status === 500) {
          throw new Error(
            "Terjadi kesalahan pada layanan AI. Silakan coba lagi."
          );
        } else {
          throw new Error(
            errorData.error || `AI service error: ${aiRes.status}`
          );
        }
      }

      const aiData = await aiRes.json();

      if (!aiData.aiText || aiData.aiText.trim() === "") {
        throw new Error(
          "AI tidak menghasilkan konten. Coba dengan prompt yang lebih detail."
        );
      }

      setCurrentStep("Membuat dokumen PDF...");

      // Small delay untuk UX yang lebih baik
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2️⃣ Kirim hasil AI ke server PDF
      const pdfRes = await fetch("http://localhost:4000/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aiText: aiData.aiText }),
        signal: abortControllerRef.current?.signal,
      });

      if (!pdfRes.ok) {
        const errorData = await pdfRes.json().catch(() => ({}));
        throw new Error(
          errorData.error || `PDF generation error: ${pdfRes.status}`
        );
      }

      setCurrentStep("Mengunduh dokumen...");

      // 3️⃣ Download PDF
      const blob = await pdfRes.blob();

      if (blob.size === 0) {
        throw new Error("PDF yang dihasilkan kosong");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `surat-perjanjian-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Success
      setCurrentStep("Dokumen berhasil dibuat!");
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err: unknown) {
      console.error("PDF Generation Error:", err);

      const errorMessage = err instanceof Error ? err.message : String(err);

      if (err instanceof Error && err.name === "AbortError") {
        setError("Permintaan dibatalkan");
      } else if (errorMessage.includes("fetch")) {
        setError(
          "Tidak dapat terhubung ke server. Pastikan server berjalan pada port 4000."
        );
      } else {
        setError(errorMessage || "Terjadi kesalahan saat membuat dokumen");
      }

      setCurrentStep("");
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  // Sample prompts untuk membantu user
  const samplePrompts = [
    "Buat surat perjanjian sewa rumah selama 1 tahun antara Budi (penyewa) dan Sari (pemilik) dengan harga 5 juta per bulan",
    "Buat surat perjanjian kerja karyawan tetap untuk posisi developer dengan gaji 8 juta per bulan",
    "Buat surat perjanjian jual beli motor Honda Beat tahun 2020 dengan harga 15 juta",
    "Buat surat perjanjian kerjasama bisnis online shop antara dua pihak",
  ];

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
        We provide blockchain-based services powered by AI to help manage and
        secure your digital documents.
      </motion.p>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left: AI Chat */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-700 rounded-2xl p-8 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition"
          onClick={handleOpenModal}
        >
          <FileText className="w-12 h-12 mb-4 text-blue-400" />
          <h2 className="text-xl font-semibold">AI Document Generator</h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            Create agreements and documents easily with AI assistance.
          </p>
        </motion.div>

        {/* Middle: Upload Documents */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/upload")}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-700 rounded-2xl p-8 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition"
        >
          <FileText className="w-16 h-16 mb-4 text-green-400" />
          <h2 className="text-xl font-semibold">
            Upload Documents to Blockchain
          </h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            Upload your files to be processed on the blockchain. Secure, fast,
            and transparent.
          </p>
        </motion.div>

        {/* Right: Coming Soon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer flex flex-col items-center justify-center border border-gray-800 rounded-2xl p-6 bg-gray-900/50 hover:bg-gray-800/70 transition"
        >
          <Clock className="w-12 h-12 mb-4 text-gray-500" />
          <span className="text-lg font-medium text-gray-400">Coming Soon</span>
        </motion.div>
      </div>

      {/* Enhanced Modal Prompt */}
      {showPromptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              🤖 AI Document Generator
            </h3>

            {/* Sample prompts */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">
                Contoh prompt yang bisa Anda gunakan:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {samplePrompts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(sample)}
                    className="text-xs text-left p-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
                    disabled={isGenerating}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-32 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Masukkan detail dokumen yang ingin dibuat...&#10;&#10;Contoh: Buat surat perjanjian sewa rumah selama 1 tahun antara Pak Ahmad (penyewa) dan Bu Siti (pemilik) dengan harga sewa 5 juta per bulan, lokasi di Jl. Merdeka No. 123 Jakarta."
              disabled={isGenerating}
            />

            {/* Character count */}
            <div className="text-right text-xs text-gray-500 mt-1">
              {prompt.length}/1000 karakter
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-3 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Current step indicator */}
            {currentStep && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mt-3 p-3 bg-blue-900/50 border border-blue-700 rounded-lg text-blue-300"
              >
                <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                <span className="text-sm">{currentStep}</span>
              </motion.div>
            )}

            {/* Tips */}
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">
                💡 Tips untuk prompt yang lebih baik:
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Sebutkan nama kedua pihak yang terlibat</li>
                <li>• Cantumkan detail seperti harga, durasi, lokasi</li>
                <li>• Jelaskan jenis perjanjian yang diinginkan</li>
                <li>• Semakin detail prompt, semakin baik hasilnya</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                onClick={handleCloseModal}
                disabled={isGenerating}
              >
                {isGenerating ? "Membatalkan..." : "Batal"}
              </button>

              <motion.button
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isGenerating || !prompt.trim()
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl"
                }`}
                onClick={handleGeneratePDF}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  "Generate PDF"
                )}
              </motion.button>
            </div>

            {/* Progress indicator */}
            {isGenerating && (
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Layanan;
