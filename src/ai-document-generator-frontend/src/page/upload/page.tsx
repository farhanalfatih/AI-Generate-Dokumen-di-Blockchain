import React, { useRef, useState, useEffect } from "react";
// pakai declarations hasil dfx generate
import { ai_document_generator_backend as backendActor } from "../../../../declarations/ai-document-generator-backend";

type DocMeta = {
  id: bigint;
  name: string;
  size: bigint;
  uploaded_at: bigint;
  uploader: unknown;                 // atau: import type { Principal } from "@dfinity/principal";
  uploader_name?: string | null;
};

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<DocMeta[]>([]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      console.log("🔄 Uploading ke backend...", {
        name: file.name,
        size: file.size,
        bytes: uint8Array.length,
      });

      // IDL: upload_file(name: Text, bytes: Vec Nat8) -> Nat
      const id: bigint = await backendActor.upload_file(file.name, Array.from(uint8Array));
      console.log("✅ File berhasil diupload! ID:", id.toString());

      await loadFiles();
      // reset file input agar event bisa terpicu lagi untuk file yang sama
      event.target.value = "";
    } catch (err) {
      console.error("❌ Error saat upload:", err);
      alert("Upload gagal. Cek console.");
    }
  };

  const loadFiles = async () => {
    try {
      const result = await backendActor.list_files(); // sudah bertipe DocMeta[]
      // Map backend DocMeta to local DocMeta type
      const mapped = result.map((f: any) => ({
        ...f,
        uploader_name: Array.isArray(f.uploader_name)
          ? f.uploader_name.length === 1
            ? f.uploader_name[0]
            : null
          : f.uploader_name,
      }));
      setFiles(mapped);
    } catch (err) {
      console.error("❌ Error loadFiles:", err);
      alert("Gagal memuat file, cek console log");
    }
  };

  const handleDownload = async (id: bigint) => {
    try {
      const opt = await backendActor.get_file(id); // [] | [[string, number[]]]
      if (opt.length === 0) {
        alert("❌ File tidak ditemukan");
        return;
      }
      const [name, content] = opt[0]; // unwrap
      const blob = new Blob([new Uint8Array(content)], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
      console.log("✅ File diunduh:", name);
    } catch (err) {
      console.error("❌ Error saat download:", err);
      alert("Download gagal, cek console log");
    }
  };

  

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center text-white px-6 md:px-10 py-10">
      <div className="max-w-6xl mt-20 w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Dokumen</h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Upload dokumen Anda langsung ke blockchain ICP dengan aman 🚀
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start">
          <div
            className="w-full md:w-80 h-40 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
            onClick={handleUploadClick}
          >
            <p className="text-gray-400 text-center px-2">Klik untuk pilih file</p>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />

          <div className="mt-6 flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={handleUploadClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              📤 Upload Dokumen
            </button>

            <button
              onClick={loadFiles}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              📂 Lihat File
            </button>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-xl font-bold mb-4">📑 Daftar File:</h2>
          <ul className="space-y-2">
            {files.map((f) => (
              <li
                key={f.id.toString()}
                className="p-3 bg-gray-800 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{f.name}</p>
                  <p className="text-sm text-gray-400">
                    {Math.round(Number(f.size) / 1024)} KB • {f.uploader_name ?? "Anon"} •{" "}
                    {new Date(Number(f.uploaded_at) / 1_000_000).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(f.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  ⬇ Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
