'use client';

type EnlargeModalProps = {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function EnlargeModal({ imageUrl, isOpen, onClose }: EnlargeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-[98vw] w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-red-600 rounded text-white text-2xl hover:text-purple-400 transition-colors"
        >
           ✕ 
        </button>

        <img
          src={imageUrl}
          alt="Generated Nail Art - Enlarged"
          className="w-full max-h-[92vh] object-contain rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  );
}