'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";

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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`)
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
        <Link href="/" className="text-black mb-4 hover:underline inline-block">
          ← Back to Home
        </Link>
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-gray-900">Gallery</h1>
          <p className="text-xl text-gray-600 mt-3">
            Browse Mykala's beautiful nail art designs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              title={image.title}
              image_url={image.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}