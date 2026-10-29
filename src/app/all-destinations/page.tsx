import { Suspense } from "react";
import DestinationCard from "@/components/Home/DestinationCard";

interface Destination {
  _id: string;
  id?: number;
  heroImage : string;
  location: string;
  title: string;
  price: number;
  duration: string;
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading packages...</p>}>
      <ExploreDestinations />
    </Suspense>
  );
}

async function ExploreDestinations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-packages`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch travel packages.");
  }

  const destinations: Destination[] = await res.json();

  return (
    <section className="mx-auto w-full max-w-[1980px] px-4 py-12 font-sans sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-light tracking-tight text-gray-900 md:text-5xl">
          Explore All Destinations
        </h2>

        <p className="mt-2 text-base text-gray-500 md:text-lg">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* Results Count */}
      <div className="mb-8 text-sm text-gray-500">
        Showing {destinations.length} destinations
      </div>

      {/* Cards Grid */}
      {destinations.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No destinations found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest._id ?? dest.id}
              id={dest._id ?? dest.id}
              heroImage={dest.heroImage}
              location={dest.location}
              title={dest.title}
              price={dest.price}
              duration={dest.duration}
            />
          ))}
        </div>
      )}
    </section>
  );
}
