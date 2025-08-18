import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaLock } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";

import { AvatarCircles } from "./components/magicui/avatar-circles";
import Tentangkami from "./section/tantangkami";
import Layanan from "./section/layanan";

const avatars = [
  { imageUrl: "https://i.pravatar.cc/40?img=1", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/40?img=2", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/40?img=3", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/40?img=4", profileUrl: "#" },
];

const App = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex mt-32 flex-1 flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-3xl md:text-6xl font-extrabold leading-tight"
        >
          AI Generate <span className="text-sky-500">Dokumen</span> <br /> di
          Blockchain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl"
        >
          Solusi modern untuk membuat{" "}
          <span className="text-sky-500">dokumen berbasis AI yang aman</span>,
          cepat, dan terdesentralisasi di blockchain.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex mt-8 gap-4 flex-wrap justify-center"
        >
          <a
            href="#get-started"
            className="px-5 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            Get Started
          </a>
          <a
            href="#vote"
            className="px-5 py-3 rounded-xl border border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white transition"
          >
            Support
          </a>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="mt-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card AI */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-8 shadow-lg text-center"
          >
            <FaRobot className="text-sky-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">AI</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Buat dokumen otomatis dengan kecerdasan buatan.
            </p>
          </motion.div>

          {/* Card Blockchain */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gray-900 rounded-2xl p-8 shadow-lg text-center"
          >
            <SiBlockchaindotcom className="text-green-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Blockchain</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Simpan dokumen di ICP untuk keamanan & keaslian.
            </p>
          </motion.div>

          {/* Card Security */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-2xl p-8 shadow-lg text-center"
          >
            <FaLock className="text-red-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Aman</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Data transparan, terenkripsi, dan bebas manipulasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="about" className="mt-36">
        <Tentangkami />
      </section>

      {/* Layanan */}
      <section id="services" className="mt-20">
        <Layanan />
      </section>
    </div>
  );
};

export default App;
