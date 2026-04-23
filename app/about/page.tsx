// app/about/page.tsx
'use client';

import { AlertTriangle } from "lucide-react";

export default function About() {
    return(
         <div className="min-h-screen bg-black-50 py-12">
            <div className="max-w-4x1 mx-auto px-6">
                <img src="/static_front_images/logo_2.webp" alt="myna_bus_logo" className="w-60 h-60 mx-auto"></img>
                

                <div className="prose text-lg text-black-700 leading-relaxed text-center mb-12 content-center">
                    <img src="/static_front_images/mah_wife.jpg" alt="Mykala Wallace" className="w-90 h-90 mx-auto rounded-3xl object-cover shadow-md block mb-8"></img>
                        <h2 className="underline">About: <strong className="underline italic">Mykala Wallace</strong></h2>
                            <p className="max-w-3xl mx-auto text-left leading-relaxed px-4">
                                Hi, I’m Mykala! I’m a licensed nail technician based inside the charming Hasbrouck House in Nampa, Idaho. I specialize in natural nail care and creating beautiful, lasting enhancements that let your nails shine. From detailed nail art to classic, clean finishes, I offer a full range of manicure and pedicure services tailored to your style and self-care needs. Experience the difference of a soakless pedicure—sanitary, diabetic-friendly, and fully customized to support immunity, soothe skin sensitivities, or simply provide deep relaxation.<br/>                                
                                When I’m not painting nails, I’m a proud mom to my 10-year-old son, a cello player in the Caldwell Symphony, and the person who runs their social media and online marketing. I love the outdoors and you’ll often find me camping or hiking with my husband Tannor, our two dogs, gardening, or cuddling with my three cats...or playing SIMS4. For me, nail art is much more than just a job — it’s a true creative outlet that brings joy to both me and my clients.
                            </p>
                </div>
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
                                alt="2024 best Mainicures and Pedicures in nampa award gold winner."
                                className="w-full aspect-square object-cover rounded-3xl shadow-md"
                            />

                                                        <img 
                                src="/static_front_images/accolades_25.webp" 
                                alt="2024 best Nail Salon in nampa award platinum."
                                className="w-full aspect-square object-cover rounded-3xl shadow-md"
                            />

                                                        <img 
                                src="/static_front_images/accolades_25_2.webp" 
                                alt="2024 best Mainicures and Pedicures in nampa award platinum."
                                className="w-full aspect-square object-cover rounded-3xl shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
}