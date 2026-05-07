'use client';

type ImageViewerProps = {
  imageUrl: string;
  title: string;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
};

export default function ImageViewer({
  imageUrl,
  title,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: ImageViewerProps) {

  // PERMANENT FIX — handles:
  // • Full Cloudinary URLs (correct https://...)
  // • Broken Cloudinary URLs with "https//" typo (missing colon)
  // • Old local paths (/static/images/...)
  // • Empty or invalid URLs
  const getFullImageUrl = (url: string): string => {
    if (!url) {
      return "/static_front_images/placeholder.jpg";
    }

    // Fix the common typo: "https//" → "https://"
    const cleanedUrl = url.replace(/^https\/\//i, "https://");

    // If it's already a full external URL (Cloudinary), use it as-is
    if (cleanedUrl.startsWith("http://") || cleanedUrl.startsWith("https://")) {
      return cleanedUrl;
    }

    // Otherwise it's a relative path → prepend the API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const path = cleanedUrl.startsWith("/") ? cleanedUrl : `/${cleanedUrl}`;
    return `${baseUrl}${path}`;
  };

  const fullImageUrl = getFullImageUrl(imageUrl);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="select-none"
    >
      <img
        src={fullImageUrl}
        alt={title}
        className="w-full max-w-[90vw] md:max-w-4xl mx-auto max-h-[70vh] md:max-h-[80vh] object-contain rounded-3xl shadow-2xl mt-2 mb-2"
      />
    </div>
  );
}