// app/page.tsx
import Hero from "@/components/Hero";

export default function Home() {
  return <Hero />; // Best practice to keep the page component clean and delegate to a Hero component for the main content
}