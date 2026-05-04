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

  // So if i do it this way it doesnt break when i switch to a full Cloudinary URL that already has the domain in it, but if it's just a path it will add the API URL in front of it.
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;


  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="select-none"
    >
      <img
        // src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
        src={fullImageUrl}
        alt={title}
        className="mt-4 max-w-3xl mx-auto max-h-[75vh] object-contain rounded-3xl shadow-2xl"/>
    </div>
  );
}