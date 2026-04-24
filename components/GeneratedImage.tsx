'use client';

type GeneratedImageProps = {
  imageUrl: string;
  onEnlarge: () => void;
  onClear: () => void;
  onRegenerate: () => void;
  loading: boolean;
};

export default function GeneratedImage({
  imageUrl,
  onEnlarge,
  onClear,
  onRegenerate,
  loading,
}: GeneratedImageProps) {
  return (
    <div className="mt-5 text-center">
      <div
        className="mx-auto rounded-3xl shadow-md overflow-hidden border cursor-pointer hover:scale-105 transition-transform inline-block"
        onClick={onEnlarge}
      >
        <img
          src={imageUrl}
          alt="Generated Nail Art"
          className="max-h-[500px] object-contain w-full"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-8 py-3 border border-purple-600 text-purple-600 rounded-2xl hover:bg-purple-50 transition-colors"
        >
          Regenerate
        </button>
        <button
          onClick={onClear}
          className="px-8 py-3 border border-gray-400 text-gray-700 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          Clear Image
        </button>
      </div>
    </div>
  );
}