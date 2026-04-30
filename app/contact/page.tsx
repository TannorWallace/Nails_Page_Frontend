// app/contact/page.tsx
'use client';
import Link from "next/link";


import ContactInfo from "@/components/ContactInfo";
import LocationMap from "@/components/LocationMap";
import PhysicalAddress from "@/components/PhysicalAddress";

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="text-black hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Get In Touch</h1>

        <div className="grid md:grid-cols-3 gap-10">
          <ContactInfo />
          <LocationMap />
          <PhysicalAddress />
        </div>
      </div>
    </div>
  );
}