import React from "react";

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
    <>
      <div className="min-h-screen w-full bg-black flex flex-col overflow-x-hidden">
        {/* Navbar */}
        <div className="flex mt-36 flex-1 flex-col items-center justify-center text-center px-4">
          <div className="flex justify-center">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>
          <h1 className="text-white text-2xl md:text-6xl font-extrabold leading-tight">
            AI Generate <span className="text-blue-900">Dokumen</span> <br /> di
            Blockchain
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-xl">
            Solusi modern untuk membuat{" "}
            <span className="text-blue-900">dokumen berbasis AI yang aman</span>
            , cepat, dan terdesentralisasi di blockchain.
          </p>

          {/* Buttons */}
          <div className="flex mt-8 gap-4">
            <a
              href="#get-started"
              className="px-4 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
            >
              Get Started
            </a>
            <a
              href="#vote"
              className="px-4 py-2 rounded-xl border border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white transition"
            >
              Support
            </a>
          </div>
        </div>

        {/* 3 Card Section */}
        <div className="mt-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card AI */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
              <h2 className="text-xl font-bold text-white mb-2">🤖 AI</h2>
              <p className="text-gray-400 text-sm">
                Buat dokumen otomatis dengan kecerdasan buatan.
              </p>
            </div>

            {/* Card Blockchain */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                🔗 Blockchain (ICP)
              </h2>
              <p className="text-gray-400 text-sm">
                Simpan dokumen di ICP untuk keamanan & keaslian.
              </p>
            </div>

            {/* Card Security */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-center">
              <h2 className="text-xl font-bold text-white mb-2">🔒 Aman</h2>
              <p className="text-gray-400 text-sm">
                Data transparan, terenkripsi, dan bebas manipulasi.
              </p>
            </div>
          </div>
        </div>

        {/* Section berikutnya */}
        <div className="mt-36">
          <Tentangkami />
        </div>
        <div className="mt-12">
          <Layanan/>
        </div>
      </div>
    </>
  );
};

export default App;
