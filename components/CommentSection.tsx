'use client';

import { Smile, Trash2 } from "lucide-react";

type Comment = {
  id: number;
  text: string;
  created_at: string;
  username: string;
};

type CommentSectionProps = {
  comments: Comment[];
  currentUsername: string | null;
  isAdmin: boolean;
  newComment: string;
  setNewComment: (value: string) => void;
  submitting: boolean;
  onSubmitComment: (e: React.FormEvent) => void;
  onDeleteComment: (commentId: number) => void;
};

export default function CommentSection({
  comments,
  currentUsername,
  isAdmin,
  newComment,
  setNewComment,
  submitting,
  onSubmitComment,
  onDeleteComment,
}: CommentSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => {
            const isOwner = currentUsername === comment.username;
            const canDelete = isOwner || isAdmin;

            return (
              <div key={comment.id} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-pink-600">{comment.username}</p>
                  <p className="mt-3 text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-4">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>

                {canDelete && (
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 -mt-1"
                    title="Delete comment"
                  >
                    <Trash2 size={22} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Be the first to comment!<br />
          Kind and constructive conversation please.<br />
          Its only nail art! <Smile />
        </p>
      )}

      {/* Comment Form */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-xl font-semibold mb-4">Leave a comment</h3>
        <form onSubmit={onSubmitComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="bg-white/10 backdrop-blur-md w-full h-28 p-4 border rounded-2xl"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-500 transition-colors disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </div>
  );
}