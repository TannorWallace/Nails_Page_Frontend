// components/AwardsGrid.tsx
'use client';

export default function AwardsGrid() {
  return (
    <div className="prose text-lg text-black-700 leading-relaxed text-center mb-12 content-center">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          <img 
            src="/static_front_images/accolades_24.webp" 
            alt="2024 best Nail Salon nampa award gold winner."
            className="w-full aspect-square object-cover rounded-3xl shadow-md"
          />
          <img 
            src="/static_front_images/accolades_24_2.webp" 
            alt="2024 best Manicures and Pedicures in nampa award gold winner."
            className="w-full aspect-square object-cover rounded-3xl shadow-md"
          />
          <img 
            src="/static_front_images/accolades_25.webp" 
            alt="2024 best Nail Salon in nampa award platinum."
            className="w-full aspect-square object-cover rounded-3xl shadow-md"
          />
          <img 
            src="/static_front_images/accolades_25_2.webp" 
            alt="2024 best Manicures and Pedicures in nampa award platinum."
            className="w-full aspect-square object-cover rounded-3xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}