// components/Hero.tsx
'use client';

import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-4 text-black">
          Nails by Mykala.
        </h1>
        <p className="text-2xl text-black mb-8 max-w-md mx-auto">
          Beautiful handcrafted nail art.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/gallery"
            className="inline-block bg-purple-600 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            View Gallery
          </Link>
          
          <Link
            href="/generate"
            className="inline-block bg-purple-600 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            AI Nail Art Generator
          </Link>
        </div>
      </div>
    </div>
  );
}