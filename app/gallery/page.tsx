// app/gallery/page.tsx
'use client';   // This is the most important line

import { useState, useEffect } from "react";
import Link from "next/link";

type Image = {
  id: number;
  title: string;
  image_url: string;
  artist: string;
  created_at: string;
};

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/images/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch images");
        return res.json();
      })
      .then((data: Image[]) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Oops! Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading gallery...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black-900">Gallery</h1>
          <p className="text-xl text-black-600 mt-3">
            Browse Mykala's beautiful nail art designs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <Link
              key={image.id}
              href={`/gallery/${image.id}`}
              className="group"
            >
              <div className="aspect-square bg-black-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={`http://127.0.0.1:8000${image.image_url}`}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-3 text-sm font-medium text-black-700">
                {image.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}