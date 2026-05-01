'use client';

import Link from "next/link";

type ImageCardProps = {
  id: number;
  title: string;
  image_url: string;
};

export default function ImageCard({ id, title, image_url }: ImageCardProps) {
  return (
    <Link href={`/gallery/${id}`} className="group">
      <div className="aspect-square bg-black-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${image_url}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-center mt-3 text-sm font-medium text-black-700">
        {title}
      </p>
    </Link>
  );
}