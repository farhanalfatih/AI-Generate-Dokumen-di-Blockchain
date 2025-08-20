import React from "react";
import Gambar from '../../public/logotim401.png'

const TantangKami = () => {
  return (
    <>
      <div className="w-full bg-black text-white py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {/* Image */}
          <div className="w-full md:w-3/3 flex justify-center">
            <img
              src={Gambar}
              alt="About Us"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-3/3 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About Us
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are a passionate team combining{" "}
              <span className="font-semibold text-white">AI & Blockchain (ICP)</span> 
              to create practical solutions:{" "}
              <span className="font-semibold text-white">AI Document Generator on the Blockchain</span>.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              With this application, users can automatically generate documents 
              (contracts, letters, CVs, even DAO profiles) and store them on the blockchain 
              for security, transparency, and authenticity.  
              Simple, useful, and with huge potential for continuous development.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TantangKami;
