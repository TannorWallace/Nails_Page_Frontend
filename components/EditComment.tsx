// components/EditComment.tsx
'use client';

import { useState } from "react";

type EditCommentProps = {
  commentId: number;
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
};

export default function EditComment({ commentId, initialText, onSave, onCancel }: EditCommentProps) {
  const [editText, setEditText] = useState(initialText);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(editText);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="w-full h-24 p-4 border rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
        autoFocus
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border border-gray-400 px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}