// app/gallery/[id]/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Smile, Trash2 } from "lucide-react";

type Comment = {
  id: number;
  text: string;
  created_at: string;
  username: string;
};

type ImageDetail = {
  id: number;
  title: string;
  image_url: string;
  artist: string;
  created_at: string;
  comments: Comment[];
};

export default function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState<ImageDetail | null>(null);
  const [allImages, setAllImages] = useState<ImageDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Comment form
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Current user info from JWT
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Decode JWT token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("🔑 JWT Payload:", payload);   // ← debug line
        setCurrentUsername(payload.sub || null);
        setIsAdmin(payload.is_admin === true || payload.is_admin === "true");
      } catch (e) {
        console.error("Failed to decode token");
      }
    }
  }, []);

  // Fetch image + all images
  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/images/${id}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data: ImageDetail) => setImage(data));

    fetch("http://127.0.0.1:8000/images/")
      .then((res) => res.json())
      .then((data) => setAllImages(data))
      .finally(() => setLoading(false));
  }, [id]);

  const currentIndex = allImages.findIndex((img) => img.id === Number(id));
  const prevImage = currentIndex > 0 ? allImages[currentIndex - 1] : null;
  const nextImage = currentIndex < allImages.length - 1 ? allImages[currentIndex + 1] : null;

  // Swipe handlers (unchanged)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && nextImage) window.location.href = `/gallery/${nextImage.id}`;
    if (distance < -50 && prevImage) window.location.href = `/gallery/${prevImage.id}`;
  };

  // DELETE COMMENT (owner OR admin)
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Delete this comment permanently?")) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete comment.");
      }
    } catch (err) {
      alert("Error deleting comment");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !image) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Log in or Register to leave a comment.");
      window.location.href = "/register";
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: newComment,
          image_id: image.id,
        }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to post comment.");
      }
    } catch (err) {
      alert("Error posting comment");
    } finally {
      setSubmitting(false);
      setNewComment("");
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (!image) return <div className="text-center py-20">Image not found</div>;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/gallery" className="text-black hover:underline mb-8 inline-block">
          ← Back to Gallery
        </Link>

        <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-sm overflow-hidden">
          <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className="select-none">
            <img src={`http://127.0.0.1:8000${image.image_url}`} alt={image.title} className="w-full" />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold">{image.title}</h1>
            <p className="text-gray-600 mt-2">{image.artist}</p>

            {/* Previous / Next Buttons */}
            <div className="flex justify-between mt-12">
              <Link href={prevImage ? `/gallery/${prevImage.id}` : "#"} className={`px-6 py-3 rounded-full border flex items-center gap-2 ${prevImage ? 'bg-purple-500 border-gray-300 hover:bg-purple-400 text-white' : 'text-gray-300 pointer-events-none'}`}>
                ← Previous
              </Link>
              <Link href={nextImage ? `/gallery/${nextImage.id}` : "#"} className={`px-6 py-3 rounded-full border flex items-center gap-2 ${nextImage ? 'bg-purple-500 border-gray-300 hover:bg-purple-400 text-white' : 'text-gray-300 pointer-events-none'}`}>
                Next →
              </Link>
            </div>

            {/* Comments */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Comments ({image.comments.length})</h2>

              {image.comments.length > 0 ? (
                <div className="space-y-6">
                  {image.comments.map((comment) => {
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
                            onClick={() => handleDeleteComment(comment.id)}
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
                <p className="text-gray-500 italic">Be the first to comment!<br/> Kind and constructive conversation please.<br/> Its only nail art! <Smile/></p>
              )}
            </div>

            {/* Comment Form */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Leave a comment</h3>
              <form onSubmit={handleSubmitComment}>
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
        </div>
      </div>
    </div>
  );
}