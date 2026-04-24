// components/PhysicalAddress.tsx
'use client';

export default function PhysicalAddress() {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-sm p-8">
      <h2 className="text-3xl font-semibold mb-6">Visit Us</h2>
      <div>
        <p className="font-medium">Hasbrouck House</p>
        <p className="text-black">12 Elm Street, Suite 101</p>
        <p className="text-black">Nampa, Idaho 83651</p>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-md text-black">Hours:</p>
          <p className="text-md text-black">Tuesday – Saturday: 9:00 AM – 6:00 PM</p>
          <p className="text-md text-black">Sunday & Monday: Closed</p>
        </div>
      </div>
    </div>
  );
}