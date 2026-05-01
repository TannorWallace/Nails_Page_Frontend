// components/Footer.tsx
'use client';
import Link from "next/link";
// import { Instagram, Facebook, X } from "lucide-react"; //WONT IMPORT (SHRUG)
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return(
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Branding catchphrases  */}
          <div>
            <p className="text-1xl text-purple-400 text-center">Nails by Mykala</p>
            <p className="text-gray-400 text-sm mt-1 text-center">Handcrafted with love</p>
          </div>

          {/* Links To Social Media Pages */}
          <div className="flex gap-6 text-2xl">
            <a href="https://www.instagram.com/nailsby_mykala" target="_blank" className="hover:text-purple-400 transition-colors">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" className="hover:text-purple-400 transition-colors">
              <FaFacebook />
            </a>
            <a href="https://x.com//nailsby_mykala" target="_blank" className="hover:text-purple-400 transition-colors">
              <FaXTwitter />
            </a>
          </div>

          <div className="text-sm text-gray-400 text-center md:text-right">
            © 2026 Nails by Mykala<br />
            All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
