import Image from "next/image";
import { Calendar, MapPin, Eye } from "lucide-react";
import DeleteMyBookingBtn from "./DeleteMyBookingBtn";
import Link from "next/link";
import type{ BookingType } from "@/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getMyBooking = async() => {
  
  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwtToken?.token}`,
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

export default async function MyBookingsPage() {
  const {data:bookings, error} = await getMyBooking()

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings?.map((booking:BookingType) => {

            return (
              <div
                key={booking._id}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Left Section: Image and Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
                  
                  {/* Thumbnail Image */}
                  <div className="relative w-full sm:w-64 aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={booking.data.heroImage}
                      alt={booking.data.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 256px"
                    />
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col justify-between py-1 w-full space-y-3">
                    
                    {/* Status Badge & Title Row */}
                    <div>
                      <h2 className="text-2xl font-medium text-gray-900 tracking-tight">
                        {booking.data.title}
                      </h2>
                    </div>

                    {/* Metadata (Departure Date & Booking ID) */}
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Departure: {booking.data.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>Booking ID: {booking._id.slice(-4)}</span>
                      </div>
                    </div>

                    {/* Mobile Price View */}
                    <div className="block md:hidden text-2xl font-bold text-cyan-600 pt-1">
                      ${booking.data.price}
                    </div>
                  </div>
                </div>

                {/* Right Section: Price & Action Buttons */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 gap-4 shrink-0">
                  {/* Desktop Price */}
                  <div className="hidden md:block text-3xl font-bold text-cyan-600 mb-2">
                    ${booking.data.price}
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Cancel Button */}
                    <DeleteMyBookingBtn id={booking._id}/>

                    {/* View Button */}
                    <Link href={`/destinations/${booking.data._id}`} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}