// components/ContactInfo.tsx
'use client';

export default function ContactInfo() {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
      <ul className="space-y-6 text-lg">
        <li>
          <strong>Phone:</strong><br />
          <a href="tel:208-123-4567" className="text-black hover:underline">(208) 123-4567</a>
        </li>
        <li>
          <strong>Email:</strong><br />
          <a href="mailto:mykala@nailsbymykala.com" className="text-black hover:underline">
            mykala@fake-email.com
          </a>
        </li>
        <li>
          <strong>View Services & Book online:</strong><br />
          <a 
            href="https://book.squareup.com/appointments/2ba65931-efa8-4f1c-9408-937d89274a72/location/J87KZKYAF28HM/services?buttonTextColor=ffffff&color=274b3a&locale=en&referrer=so" 
            className="text-black hover:underline hover:text-purple-600"
          >
            Schedule an Appointment Now!
          </a>
        </li>
      </ul>
    </div>
  );
}