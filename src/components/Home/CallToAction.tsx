// components/CallToAction.tsx
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        // Using an aerial view of a tropical island to match your reference
        src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
        alt="Aerial view of a tropical island"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 via-black/20 to-black/50" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-8">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-4">
          Ready To Start Your Journey?
        </h2>

        {/* Subheading */}
        <p className="text-base md:text-lg text-gray-200 font-light mb-10 max-w-2xl">
          Join thousands of travelers who have discovered the world with us
        </p>

        {/* Button */}
        <button className="group flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-gray-100">
          Book Your Trip Today
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}