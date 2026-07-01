'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import GenerateForm from "@/components/GenerateForm";
import GeneratedImage from "@/components/GeneratedImage";
import EnlargeModal from "@/components/EnlargeModal";

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
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You must be logged in to generate images.");
        setLoading(false);
        return;
      }

      // Call our backend securely
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/generate?prompt=${encodeURIComponent(prompt)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setImageUrl(data.image_url);
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

  // STRICT LOGIN WALL
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-sm p-10">
            <h2 className="text-3xl font-bold mb-4">AI Nail Art Generator</h2>
            <p className="text-gray-600 mb-8">
              Log in to continue.<br />
              Or<br />
              Create an account to use this feature.
            </p>
            <Link
              href="/login"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-black py-4 rounded-2xl font-medium text-lg transition-colors"
            >
              Log In to Generate
            </Link>
            <p className="text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
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
        <Link href="/" className="text-black hover:underline mb-8 inlineBlock">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-center mb-3">AI Nail Art Generator</h1>
        <p className="text-center text-gray-600 mb-2">Powered by Grok Imagine (xAI)</p>
        <p className="text-center text-gray-600">If on a phone, be sure to screenshot your generated images!</p>
        <p className="text-center text-gray-600">If on a computer, you can right-click and save the image.</p>

        {imageUrl && (
          <GeneratedImage
            imageUrl={imageUrl}
            onEnlarge={() => setIsModalOpen(true)}
            onClear={clearImage}
            onRegenerate={generateImage}
            loading={loading}
          />
        )}

        <br />

        <GenerateForm
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={generateImage}
          loading={loading}
          error={error}
        />
      </div>

      <EnlargeModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}