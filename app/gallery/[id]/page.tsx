// app/gallery/[id]/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ImageViewer from "@/components/ImageViewer";
import CommentSection from "@/components/CommentSection";

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

  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Decode JWT
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUsername(payload.sub || null);
        setIsAdmin(payload.is_admin === true || payload.is_admin === "true");
      } catch (e) {
        console.error("Failed to decode token");
      }
    }
  }, []);

  // Fetch data
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data: ImageDetail) => setImage(data));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`)
      .then((res) => res.json())
      .then((data) => setAllImages(data))
      .finally(() => setLoading(false));
  }, [id]);

  const currentIndex = allImages.findIndex((img) => img.id === Number(id));
  const prevImage = currentIndex > 0 ? allImages[currentIndex - 1] : null;
  const nextImage = currentIndex < allImages.length - 1 ? allImages[currentIndex + 1] : null;

  // Swipe handlers
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

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Delete this comment permanently?")) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`, {
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
          <ImageViewer
            imageUrl={image.image_url}
            title={image.title}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold">{image.title}</h1>
            <p className="text-gray-600 mt-2">{image.artist}</p>

            {/* Previous / Next Buttons */}
            <div className="flex justify-between mt-6">
              <Link
                href={prevImage ? `/gallery/${prevImage.id}` : "#"}
                className={`px-6 py-3 rounded-full border flex items-center gap-2 ${prevImage ? 'bg-purple-500 border-gray-300 hover:bg-purple-400 text-black' : 'text-gray-300 pointer-events-none'}`}
              >
                ← Previous
              </Link>
              <Link
                href={nextImage ? `/gallery/${nextImage.id}` : "#"}
                className={`px-6 py-3 rounded-full border flex items-center gap-2 ${nextImage ? 'bg-purple-500 border-gray-300 hover:bg-purple-400 text-black' : 'text-gray-300 pointer-events-none'}`}
              >
                Next →
              </Link>
            </div>

            <CommentSection
              comments={image.comments}
              currentUsername={currentUsername}
              isAdmin={isAdmin}
              newComment={newComment}
              setNewComment={setNewComment}
              submitting={submitting}
              onSubmitComment={handleSubmitComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}