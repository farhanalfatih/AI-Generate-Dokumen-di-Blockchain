import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaLock } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import Footer from "./components/footer/footer";
import { AvatarCircles } from "./components/magicui/avatar-circles";
import Tentangkami from "./section/tantangkami";
import Layanan from "./section/layanan";
import Team from "./section/team";
import ChatbotOverlay from "./components/ChatbotOverlay";
import orang from '../public/orang.png'

const avatars = [
  { imageUrl: orang, profileUrl: "https://github.com/farhanalfatih" },
  { imageUrl: orang, profileUrl: "https://github.com/hikmawanpola" },
  { imageUrl: orang, profileUrl: "https://github.com/alvinyusuf" },
  { imageUrl: orang, profileUrl: "#" },
  { imageUrl: orang, profileUrl: "#" },
];

const App = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className="flex mt-32 flex-1 flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6 mt-5"
        >
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-3xl md:text-6xl font-extrabold leading-tight"
        >
          AI-Generated
          <span className="text-sky-500"> Documents</span> <br /> on the
          Blockchain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl"
        >
          A modern solution for creating secure, fast, and decentralized{" "}
          <span className="text-sky-500">
            AI-powered documents on the blockchain.
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex mt-8 gap-4 flex-wrap justify-center"
        >
          <a
            href="/upload"
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
              Automatically generate documents with artificial intelligence.
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
              Store documents on ICP for authenticity & security.
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
            <h2 className="text-2xl font-bold text-white mb-3">Secure</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Transparent, encrypted, and tamper-proof data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="mt-36">
        <Tentangkami />
      </section>

      {/* Services */}
      <section id="services" className="mt-20">
        <Layanan />
      </section>

      {/* Team */}
      <section id="team" className="mt-20">
        <Team />
      </section>

      {/* Footer */}
      <div className="mt-20 relative">
        <Footer />
        {/* Chatbot Overlay */}
        <ChatbotOverlay />
      </div>
    </div>
  );
};

export default App;
