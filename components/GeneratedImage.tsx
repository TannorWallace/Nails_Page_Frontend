'use client';

import { useState } from 'react';

type GeneratedImageProps = {
  imageUrl: string;
  onEnlarge: () => void;
  onClear: () => void;
  onRegenerate: () => void;
  loading: boolean;
};

export default function GeneratedImage({
  imageUrl,
  onEnlarge,
  onClear,
  onRegenerate,
  loading,
}: GeneratedImageProps) {

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      const proxyUrl = `${process.env.NEXT_PUBLIC_API_URL}/ai/download?image_url=${encodeURIComponent(imageUrl)}`;
      
      const link = document.createElement("a");
      link.href = proxyUrl;
      link.download = `nail-art-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success notification
      setDownloadSuccess(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="mt-5 text-center">
      <div
        className="mx-auto rounded-3xl shadow-md overflow-hidden border cursor-pointer hover:scale-105 transition-transform inline-block"
        onClick={onEnlarge}
      >
        <img
          src={imageUrl}
          alt="Generated Nail Art"
          className="max-h-[500px] object-contain w-full"
        />
      </div>

      {/* Download Success Notification */}
      {downloadSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
          ✅ Image downloaded successfully!
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-8 py-3 border border-purple-600 text-purple-600 rounded-2xl hover:bg-purple-50 transition-colors disabled:opacity-50"
        >
          Regenerate
        </button>

        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-purple-600 text-black rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Download Image
        </button>

        <button
          onClick={onClear}
          className="px-8 py-3 border border-gray-400 text-gray-700 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          Clear Image
        </button>
      </div>
    </div>
  );
}