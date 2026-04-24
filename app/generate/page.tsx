// app/generate/page.tsx
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
        <p className="text-center text-gray-600 mb-5">Powered by Grok Imagine (xAI)</p>

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