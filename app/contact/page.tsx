// app/contact/page.tsx
export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">Get In Touch</h1>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Section 1: Contact Info */}
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
                <strong>Veiw Services & Book online:</strong><br />
                <a href="https://book.squareup.com/appointments/2ba65931-efa8-4f1c-9408-937d89274a72/location/J87KZKYAF28HM/services?buttonTextColor=ffffff&color=274b3a&locale=en&referrer=so" className="text-black hover:underline hover:text-purple-600">Schedule an Appointment Now!</a>
              </li>
            </ul>
          </div>

          {/* Section 2: Google Map */}
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
                >

                </iframe>
            </div>
          </div>

          {/* Section 3: Physical Address */}
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

        </div>
      </div>
    </div>
  );
}