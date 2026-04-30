// app/about/page.tsx
'use client';
import Link from "next/link";


import AboutBio from "@/components/AboutBio";
import AwardsGrid from "@/components/AwardsGrid";

export default function About() {
  return (
    <div className="min-h-screen bg-black-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-black mb-4 hover:underline inline-block">
          ← Back to Home
        </Link>
        <AboutBio />
        <AwardsGrid />
      </div>
    </div>
  );
}