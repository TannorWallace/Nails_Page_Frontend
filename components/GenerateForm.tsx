// components/GenerateForm.tsx
'use client';

type GenerateFormProps = {
  prompt: string;
  setPrompt: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
  error: string;
};

export default function GenerateForm({
  prompt,
  setPrompt,
  onGenerate,
  loading,
  error,
}: GenerateFormProps) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm p-8">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: elegant black french tips with delicate gold lines and stars"
        className="w-full h-32 p-5 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
        disabled={loading}
      />
      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-medium text-lg transition-colors"
      >
        {loading ? "Generating..." : "Generate Nail Art"}
      </button>

      {error && <p className="text-red-600 text-center mt-6 font-medium">{error}</p>}
    </div>
  );
}