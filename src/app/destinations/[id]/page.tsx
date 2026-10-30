import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  MapPin,
  Star,
  Calendar,
  Check,
  ArrowRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import DestinationCardBtn from "@/components/Home/DestinationCardBtn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

async function getDestination(id: string) {

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-packages/${id}`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${jwtToken?.token}`,
      },
    });

    if (res.status === 404) return { data: null, error: "not-found" };
    if (!res.ok) return { data: null, error: "server-error" };

    const data = await res.json(); // read the body only once
    return { data, error: null };
  } catch {
    return { data: null, error: "network-error" };
  }
}

export default async function DestinationDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data: destinationData, error } = await getDestination(id);

  if (error === "not-found") notFound();

  // Show an error UI ONLY when the fetch failed
  if (error || !destinationData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Could not load this destination.</p>
        <Link href="/destinations" className="text-cyan-600 underline">
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Fetch succeeded: render the full page
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm border border-rose-200 text-rose-500 rounded-md hover:bg-rose-50 transition-colors">
              <Trash2 className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>

        {/* Hero Image */}
        {destinationData.heroImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-8 shadow-sm">
            <Image
              src={destinationData.heroImage}
              alt={destinationData.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{destinationData.location}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4">
                {destinationData.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  <span className="font-semibold text-gray-900">
                    {destinationData.rating}
                  </span>
                  <span className="text-gray-500">
                    ({destinationData.reviewsCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{destinationData.duration}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-medium text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {destinationData.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-medium text-gray-900 mb-3">Highlights</h2>
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {destinationData.highlightsDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                {destinationData.highlightsList?.map(
                  (item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Booking Card) */}
          <div className="lg:col-span-1 border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50 bg-white sticky top-6">
            <div className="mb-6">
              <span className="text-xs text-gray-400 block mb-1">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-cyan-600">
                  ${destinationData.price}
                </span>
              </div>
              <span className="text-xs text-gray-400 block mt-0.5">
                per person
              </span>
            </div>

            <div className="mb-5">
              <input
                type="text"
                readOnly
                value={destinationData.date ?? ""}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none"
              />
            </div>

            <DestinationCardBtn id={destinationData._id}/>

            <div className="space-y-3 border-t border-gray-100 pt-5">
              {destinationData.perks?.map((perk: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs text-gray-600">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}