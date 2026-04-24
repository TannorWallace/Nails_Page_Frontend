// app/about/page.tsx
'use client';

import AboutBio from "@/components/AboutBio";
import AwardsGrid from "@/components/AwardsGrid";

export default function About() {
  return (
    <div className="min-h-screen bg-black-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <AboutBio />
        <AwardsGrid />
      </div>
    </div>
  );
}