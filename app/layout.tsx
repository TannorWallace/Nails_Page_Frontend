// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Nails by Mykala",
  description: "Beautiful nail art portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-900 flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}