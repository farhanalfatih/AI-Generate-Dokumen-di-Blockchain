import React, { useRef } from "react";

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // buka file manager
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ambil file setelah dipilih
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`File terpilih: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center text-white px-6 md:px-10 py-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Kiri: Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Dokumen
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ut sapiente quasi quia id maxime molestias!
          </p>
        </div>

        {/* Kanan: Upload area + button */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          {/* Upload area */}
          <div
            className="w-full md:w-80 h-40 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
            onClick={handleUploadClick}
          >
            <p className="text-gray-400 text-center px-2">
              Upload file
            </p>
          </div>

          {/* Hidden input file */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />

          {/* Tombol upload manual */}
          <div className="mt-6">
            <button
              onClick={handleUploadClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded w-full md:w-auto"
            >
              Upload Dokumen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;