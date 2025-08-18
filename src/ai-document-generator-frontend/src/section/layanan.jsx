import React from "react";

const Layanan = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Layanan Kami</h1>
      <p className="text-gray-400 text-sm">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa
        tempora consequatur reprehenderit ratione.
      </p>

      {/* Grid 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Kiri */}
        <div className="flex items-center justify-center border rounded-2xl p-6 bg-gray-900">
          <span className="text-xl"> Coming Soon</span>
        </div>

        {/* Tengah */}
        <div className="flex flex-col items-center justify-center border rounded-2xl p-6 bg-gray-800">
          <div className="mb-4">
            {/* Logo AI / Dokumen (contoh pakai emoji dulu) */}
            <span className="text-6xl">📄</span>
          </div>
          <h2 className="text-xl font-semibold">Upload Dokumen Blockchain</h2>
          <p className="text-sm mt-2 text-gray-300">
            Unggah file Anda untuk diproses dengan AI di blockchain.
          </p>
        </div>

        {/* Kanan */}
        <div className="flex items-center justify-center border rounded-2xl p-6 bg-gray-900">
          <span className="text-xl"> Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
