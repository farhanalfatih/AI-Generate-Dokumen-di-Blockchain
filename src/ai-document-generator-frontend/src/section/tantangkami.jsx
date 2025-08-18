import React from "react";
import Gambar from '../../public/logotim401.png'

const TantangKami = () => {
  return (
    <>
      <div className="w-full bg-black text-white py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {/* Gambar */}
          <div className="w-full md:w-2/3 flex justify-center">
            <img
              src={Gambar}
              alt="Tantang Kami"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Teks */}
          <div className="w-full md:w-3/3 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Tantang Kami
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Kami adalah tim yang bersemangat menggabungkan{" "}
              <span className="font-semibold text-white">AI & Blockchain (ICP)</span> 
              untuk menciptakan solusi praktis:{" "}
              <span className="font-semibold text-white">AI Generator Dokumen di Blockchain</span>.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Dengan aplikasi ini, pengguna bisa membuat dokumen otomatis 
              (kontrak, surat, CV, hingga profil DAO) lalu menyimpannya di blockchain 
              untuk keamanan, transparansi, dan keaslian.  
              Ringkas, bermanfaat, dan punya potensi besar untuk terus dikembangkan
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TantangKami;
