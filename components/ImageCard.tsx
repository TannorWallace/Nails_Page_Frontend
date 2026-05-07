'use client';

import Link from "next/link";

type ImageCardProps = {
  id: number;
  title: string;
  image_url: string;
};

export default function ImageCard({ id, title, image_url }: ImageCardProps) {
//same as the one in ImageViewer, if i do it this way it doesnt break when i switch to a full Cloudinary URL that already has the domain in it, but if it's just a path it will add the API URL in front of it.
  // const fullImageUrl = image_url.startsWith("http")
  //   ? image_url
  //   : `${process.env.NEXT_PUBLIC_API_URL}${image_url}`;

//WHY DID THIS BREAK OVER NIGHT?
  // FIXED: Handles full Cloudinary URLs + the common "https//" typo (missing colon)
  const fullImageUrl = image_url
    ? image_url.replace(/^https\/\//, "https://").startsWith("http")
      ? image_url.replace(/^https\/\//, "https://")
      : `${process.env.NEXT_PUBLIC_API_URL}${image_url.startsWith("/") ? "" : "/"}${image_url}`
    : "/static_front_images/placeholder.jpg";

  return (
    <Link href={`/gallery/${id}`} className="group">
      <div className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img
          src={fullImageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-center mt-3 text-sm font-medium text-gray-700">
        {title}
      </p>
    </Link>
  );
}