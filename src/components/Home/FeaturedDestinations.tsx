"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DestinationCard from "./DestinationCard";

interface Destination {
  id: number | string;
  heroImage: string;
  location: string;
  title: string;
  price: number;
  duration: string;
  rating: number;
}

export default function FeaturedDestinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch destinations from API
  useEffect(() => {
    const controller = new AbortController();

    const getDestinations = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/all-packages`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API response must be an array");
        }

        setDestinations(data as Destination[]);
        setCurrentIndex(data.length > 0 ? 1 : 0);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getDestinations();

    return () => controller.abort();
  }, []);

  // Update the current slide when scrolling
  const handleScroll = () => {
    const container = scrollContainerRef.current;

    if (!container || destinations.length === 0) return;

    const firstCard = container.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    const gap = parseFloat(
      getComputedStyle(container).columnGap
    ) || 0;

    const step = firstCard.offsetWidth + gap;

    if (step > 0) {
      const index = Math.round(container.scrollLeft / step) + 1;

      setCurrentIndex(
        Math.min(Math.max(index, 1), destinations.length)
      );
    }
  };

  // Scroll left or right
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    const gap = parseFloat(
      getComputedStyle(container).columnGap
    ) || 0;

    const scrollAmount = firstCard.offsetWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1980px] px-6 py-16 md:px-20">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Featured Destinations
          </h2>

          <p className="mt-2 font-light text-gray-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-sm border border-cyan-500 px-6 py-2.5 text-xs font-bold tracking-wider text-cyan-600 transition-colors hover:bg-cyan-50"
        >
          ALL DESTINATIONS
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Loading, Error, Empty State, and Slider */}
      {loading ? (
        <div className="flex gap-6 overflow-hidden pb-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-80 min-w-[75%] animate-pulse rounded-xl bg-gray-200 md:min-w-[45%] lg:min-w-[30%]"
            />
          ))}
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm text-gray-500">
            Please check that your API server is running.
          </p>
        </div>
      ) : destinations.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          No destinations available right now.
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {destinations.map((item, indx) => (
            <div
              key={indx}
              className="min-w-[75%] snap-start md:min-w-[45%] lg:min-w-[30%]"
            >
              <DestinationCard {...item} />
            </div>
          ))}
        </div>
      )}

      {/* Footer and Controls */}
      {!loading && !error && destinations.length > 0 && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          {/* Pagination */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium text-gray-800">
              {currentIndex}
              <span className="text-lg text-gray-400">
                /{destinations.length}
              </span>
            </span>

            <div className="relative hidden h-px w-32 bg-gray-200 sm:block">
              <div
                className="absolute left-0 top-0 h-full bg-gray-400 transition-all duration-300"
                style={{
                  width: `${
                    (currentIndex / destinations.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={currentIndex <= 1}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={currentIndex >= destinations.length}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
