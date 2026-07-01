'use client';

import { useState, useEffect } from 'react';

export default function AdminUploadPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [singleTitle, setSingleTitle] = useState("Nail Art by Mykala");
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [singleFileName, setSingleFileName] = useState("");

  const [multiTitle, setMultiTitle] = useState("Nail Art by Mykala");
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [multiFileNames, setMultiFileNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load token safely after component mounts (fixes hydration error)
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  // Handle single file selection
  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSingleFile(file);
      setSingleFileName(file.name);
    }
  };

  // Handle multiple file selection
  const handleMultiFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setMultiFiles(fileArray);
      setMultiFileNames(fileArray.map(f => f.name));
    }
  };

  // Single Image Upload
  const handleSingleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleFile || !token) return alert("Please select a file");

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", singleTitle);
    formData.append("file", singleFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/images/cloudinary`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage("✅ Single image uploaded successfully!");
      setSingleFile(null);
      setSingleFileName("");
    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Multiple Images Upload
  const handleMultiUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (multiFiles.length === 0 || !token) return alert("Please select files");

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", multiTitle);
    multiFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/images/upload_mult/cloudinary`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage(`✅ ${multiFiles.length} images uploaded successfully!`);
      setMultiFiles([]);
      setMultiFileNames([]);
    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking token (prevents hydration error)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Show login message if not logged in
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">You must be logged in as admin to access this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Image Upload</h1>

      {message && (
        <div className="mb-6 p-4 bg-gray-100 rounded-xl text-center font-medium">
          {message}
        </div>
      )}

      {/* Single Image Upload */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6">Upload Single Image</h2>
        <form onSubmit={handleSingleUpload} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={singleTitle}
              onChange={(e) => setSingleTitle(e.target.value)}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Custom File Input */}
          <div>
            <label className="block mb-2 font-medium">Image</label>
            <label className="flex items-center justify-center w-full px-6 py-3 border-2 border-dashed border-purple-300 rounded-2xl cursor-pointer hover:border-purple-500 transition-colors">
              <span className="text-purple-600 font-medium">
                {singleFileName || "Click to choose an image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSingleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-black py-4 rounded-2xl font-medium text-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Single Image"}
          </button>
        </form>
      </div>

      {/* Multiple Images Upload */}
      <div className="bg-white rounded-3xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Upload Multiple Images</h2>
        <form onSubmit={handleMultiUpload} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Title (applies to all)</label>
            <input
              type="text"
              value={multiTitle}
              onChange={(e) => setMultiTitle(e.target.value)}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Custom Multiple File Input */}
          <div>
            <label className="block mb-2 font-medium">Images</label>
            <label className="flex items-center justify-center w-full px-6 py-3 border-2 border-dashed border-purple-300 rounded-2xl cursor-pointer hover:border-purple-500 transition-colors">
              <span className="text-purple-600 font-medium">
                {multiFileNames.length > 0 
                  ? `${multiFileNames.length} file(s) selected` 
                  : "Click to choose multiple images"}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultiFilesChange}
                className="hidden"
              />
            </label>
            {multiFileNames.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {multiFileNames.join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-black py-4 rounded-2xl font-medium text-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Multiple Images"}
          </button>
        </form>
      </div>
    </div>
  );
}