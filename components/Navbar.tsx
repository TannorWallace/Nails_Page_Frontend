'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = "/";   // redirect to home
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 to-purple-600 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black-600 hover:text-purple-900 transition-colors">
            Nails by Mykala
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-base font-medium">
            <Link href="/" className="hover:text-purple-900 transition-colors">Home</Link>
            <Link href="/gallery" className="hover:text-purple-900 transition-colors">Gallery</Link>
            <Link href="/about" className="hover:text-purple-900 transition-colors">About</Link>
            {/* <Link href="https://book.squareup.com/appointments/2ba65931-efa8-4f1c-9408-937d89274a72/location/J87KZKYAF28HM/services?buttonTextColor=ffffff&color=274b3a&locale=en&referrer=so" className="hover:text-purple-900 transition-colors">Services</Link> */}
            <Link href="/contact" className="hover:text-purple-900 transition-colors">Contact</Link>
          </div>

     
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-purple-500 text-black px-5 py-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="bg-purple-500 text-black px-5 py-2 rounded-full hover:bg-purple-700 transition-colors">Login</Link>
                <Link href="/register" className="bg-purple-500 text-black px-5 py-2 rounded-full hover:bg-purple-700 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t flex flex-col gap-4 text-base font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-purple-600">Home</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-purple-600">Gallery</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-purple-600">About</Link>
            {/* <Link href="https://book.squareup.com/appointments/2ba65931-efa8-4f1c-9408-937d89274a72/location/J87KZKYAF28HM/services?buttonTextColor=ffffff&color=274b3a&locale=en&referrer=so" onClick={() => setIsOpen(false)} className="hover:text-purple-600">Services</Link> */}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-purple-600">Contact</Link>
            
            <div className="pt-4 border-t">
              {isLoggedIn ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-black-900">
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block py-2">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="block py-2">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}