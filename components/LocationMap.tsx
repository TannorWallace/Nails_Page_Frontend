// components/LocationMap.tsx
'use client';

export default function LocationMap() {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
      <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.8104593139446!2d-116.57572162347273!3d43.568832457882905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54ae4c0b0293b9cb%3A0x2d3afbaf04ebf2f3!2sHasbrouck%20House!5e0!3m2!1sen!2sus!4v1776718954454!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}