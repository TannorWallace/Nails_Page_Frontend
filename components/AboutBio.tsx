// components/AboutBio.tsx
'use client';

export default function AboutBio() {
  return (
    <div className="prose text-lg text-black-700 leading-relaxed text-center mb-6 content-center">
      {/* real business logo */}
      {/* <img 
        src="/static_front_images/logo_2.webp" 
        alt="Mykala Nails Logo" 
        className="w-50 h-50 mx-auto mb-8" 
      /> */}

      {/* Picture of mah wife */}
      <img 
        src="/static_front_images/mah_wife.jpg" 
        alt="Mykala Wallace" 
        className="w-80 h-80 mx-auto rounded-3xl object-cover shadow-md block mb-4 border-2 border-black" 
      />

      <h2 className="underline">About: <strong className="underline italic">Mykala Wallace</strong></h2>
      <div className="bg-white/20 backdrop-blur-md rounded-3xl mb-2 shadow-sm p-4">
        <p  className=" max-w-3xl mx-auto text-left leading-relaxed px-4">
        <br/>
          Hi, I’m Mykala! I’m a licensed nail technician based inside the charming and historic Hasbrouck House in Nampa, Idaho. I specialize in natural nail care and creating beautiful, lasting enhancements that let your nails shine. From detailed nail art to classic, clean finishes, I offer a full range of manicure and pedicure services tailored to your style and self-care needs. Experience the difference of a soakless pedicure—sanitary, diabetic-friendly, and fully customized to support immunity, soothe skin sensitivities, or simply provide deep relaxation.<br/>
        </p> 

      <p className="max-w-3xl mx-auto text-left leading-relaxed px-4">
        When I’m not painting nails, I’m a proud mom to my 10-year-old son, a cello player in the Caldwell Symphony, and the person who runs their social media and online marketing. I love the outdoors and you’ll often find me camping or hiking with my husband Tannor, our two dogs, gardening, or cuddling with my three cats...or playing SIMS4. For me, nail art is much more than just a job — it’s a true creative outlet that brings joy to both me and my clients.
      </p>
      </div>
    </div>
  );
}