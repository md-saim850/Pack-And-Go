// components/TravelerReviews.tsx
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", // Placeholder for the man
  },
  {
    id: 2,
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop", // Placeholder for the woman
  },
  {
    id: 3,
    quote:
      "An incredible journey through Japan. The blend of ancient traditions and modern life was fascinating. The guides made us feel like locals.",
    name: "Emma Watson",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function TravelerReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Scroll by half the container width (approx one card)
      const scrollAmount = current.offsetWidth / 2 + 24; 
      
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-20 bg-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight mb-3">
            What Travelers Say
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light">
            Real experiences from our happy travelers
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-400"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-400"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)] snap-start flex-shrink-0"
          >
            <TestimonialCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}