import React, { useRef, useState, useEffect } from "react";
import { ai_document_generator_backend as backendActor } from "../../../../declarations/ai-document-generator-backend";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";

type DocMeta = {
  id: bigint;
  name: string;
  size: bigint;
  uploaded_at: bigint;
  uploader: unknown;
  uploader_name?: string | null;
};

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<DocMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<bigint | null>(null);

  // state alert
  const [alert, setAlert] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // auto close alert
  useEffect(() => {
    if (alert.type) {
      const timer = setTimeout(() => {
        setAlert({ type: null, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // trigger file input
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // upload file
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      setLoading(true);
      // Replace 'upload_file' with the correct method name from your backend canister, e.g., 'uploadFile'
      const id: bigint = await backendActor.upload_file(
        file.name,
        Array.from(uint8Array)
      );

      await loadFiles();
      event.target.value = "";

      setAlert({
        type: "success",
        message: `File "${file.name}" berhasil diupload 🚀`,
      });
    } catch (err) {
      console.error("❌ Upload error:", err);
      setAlert({
        type: "error",
        message: "Upload gagal, coba lagi!",
      });
    } finally {
      setLoading(false);
    }
  };

  // ambil daftar file
  const loadFiles = async () => {
    try {
      setLoading(true);
      const result = await backendActor.list_files();
      const mapped = result.map((f: any) => ({
        ...f,
        uploader_name: Array.isArray(f.uploader_name)
          ? f.uploader_name[0] ?? null
          : f.uploader_name,
      }));
      setFiles(mapped);
    } catch (err) {
      console.error("❌ Load files error:", err);
      setAlert({
        type: "error",
        message: "Gagal memuat daftar file.",
      });
    } finally {
      setLoading(false);
    }
  };

  // download file
  const handleDownload = async (id: bigint) => {
    try {
      setDownloading(id);
      const opt = await backendActor.get_file(id);

      if (opt.length === 0) {
        setAlert({ type: "error", message: "❌ File tidak ditemukan" });
        return;
      }

      const [name, content] = opt[0];
      const blob = new Blob([new Uint8Array(content)], {
        type: "application/octet-stream",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);

      setAlert({
        type: "success",
        message: `File "${name}" berhasil diunduh ✅`,
      });
    } catch (err) {
      console.error("❌ Download error:", err);
      setAlert({ type: "error", message: "Download gagal." });
    } finally {
      setDownloading(null);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center text-white px-6 md:px-10 py-10">
      <div className="max-w-6xl mt-20 w-full flex flex-col gap-10">
        {/* ✅ ALERT pakai shadcn */}
        {alert.type && (
          <div className="w-full md:w-96 mx-auto">
            <Alert
              className={`${
                alert.type === "success"
                  ? "border-green-500 bg-green-900/20"
                  : "border-red-500 bg-red-900/20"
              }`}
            >
              {alert.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-400" />
              )}
              <AlertTitle>
                {alert.type === "success" ? "Berhasil" : "Error"}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Grid kiri-kanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Kiri: Judul + deskripsi */}
          <div className="flex flex-col text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Upload Dokumen</h1>
            <p className="text-gray-300 md:text-lg">
              Upload dokumen Anda langsung ke blockchain ICP 🚀
            </p>
          </div>

          {/* Kanan: Upload box */}
          <div
            className={`w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition ${
              loading
                ? "border-gray-700 bg-gray-900/50"
                : "border-gray-500 hover:border-blue-400"
            }`}
            onClick={!loading ? handleUploadClick : undefined}
          >
            {loading ? (
              <p className="text-blue-400 animate-pulse">Sedang memproses...</p>
            ) : (
              <p className="text-gray-400 text-center px-2">
                Klik untuk pilih file
              </p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Daftar file */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">📂 File Tersimpan</h2>
          <ul className="space-y-3">
            {files.map((file) => (
              <li
                key={file.id.toString()}
                className="flex items-center justify-between border border-gray-700 rounded-lg p-3 hover:bg-gray-900/50 transition"
              >
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(Number(file.size) / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(file.id)}
                  disabled={downloading === file.id}
                  className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
                >
                  {downloading === file.id ? "Downloading..." : "Download"}
                </button>
              </li>
            ))}
            {files.length === 0 && (
              <p className="text-gray-500">Belum ada file di blockchain.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
