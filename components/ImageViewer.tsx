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
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="select-none"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
        alt={title}
        className="w-full"/>
    </div>
  );
}