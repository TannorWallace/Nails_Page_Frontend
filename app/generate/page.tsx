// app/generate/page.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const res = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-imagine-image",
          prompt: `Professional studio photograph of nail art: ${prompt}. Anatomically correct human hands, Highly detailed, beautiful, commercial photography style, 8k resolution.`,
          n: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);

      if (data.data && data.data[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        setError("No image was returned. Try a different prompt.");
      }
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageUrl("");
    setIsModalOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  // STRICT LOGIN WALL
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm p-10">
            <h2 className="text-3xl font-bold mb-4">AI Nail Art Generator</h2>
            <p className="text-gray-600 mb-8">
              Log in to continue.<br/>
              Or<br/>
              Create an account to use this feature.<br />
            </p>
            <Link
              href="/login"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-black py-4 rounded-2xl font-medium text-lg transition-colors"
            >
              Log In to Generate
            </Link>
            <p className="text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/" className="text-black hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-center mb-3">AI Nail Art Generator</h1>
        <p className="text-center text-gray-600 mb-3">Powered by Grok Imagine (xAI)</p>
        <p className="text-center text-gray-600 mb-3">Be sure to save the image to show your nail tech!</p>
        <p className="text-center text-gray-600 mb-3">If on Mobile use screen capture to save the image.</p>
        <p className="text-center text-gray-600 mb-3">If on a desktop right click and save the image.</p>



        {imageUrl && (
          <div className="mt-5 text-center">
            <div
              className="mx-auto rounded-3xl shadow-md overflow-hidden border cursor-pointer hover:scale-105 transition-transform inline-block"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={imageUrl}
                alt="Generated Nail Art"
                className="max-h-[500px] object-contain w-full"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                onClick={generateImage}
                disabled={loading}
                className="px-8 py-3 border border-purple-600 text-black rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Regenerate
              </button>
              <button
                onClick={clearImage}
                className="px-8 py-3 border border-gray-400 text-black rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Clear Image
              </button>
            </div>
          </div>
        )}

        <br />

        <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-sm p-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: elegant black french tips with delicate gold lines and stars"
            className="w-full h-32 p-5 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            disabled={loading}
          />
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-black py-4 rounded-2xl font-medium text-lg transition-colors"
          >
            {loading ? "Generating..." : "Generate Nail Art"}
          </button>

          {error && <p className="text-red-600 text-center mt-6 font-medium">{error}</p>}
        </div>
      </div>

      {/* ENLARGE MODAL - Close button only here */}
      {isModalOpen && imageUrl && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-[98vw] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-2 bg-red-600 rounded text-white text-2xl hover:text-purple-400 transition-colors"
            >
               ✕ 
            </button>

            <img
              src={imageUrl}
              alt="Generated Nail Art - Enlarged"
              className="w-full max-h-[92vh] object-contain rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}