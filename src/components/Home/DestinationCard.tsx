import Image from "next/image";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import DestinationCardBtn from "./DestinationCardBtn";
import Link from "next/link";

interface DestinationProps {
  id:string | number;
  heroImage: string;
  location: string;
  title: string;
  price: number;
  duration: string;
}

export default function DestinationCard({
  id,
  heroImage,
  location,
  title,
  price,
  duration,
}: DestinationProps) {
  return (
    <div className="group flex flex-col gap-4 w-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>

        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-medium text-gray-900 leading-tight">
            {title}
          </h3>
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-gray-900">${price}</span>
            <span className="text-xs text-gray-500 ml-0.5">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>

        {/* Book Now Link */}
        <div className="">
          <Link href={`/destinations/${id}`}  className="flex items-center gap-1 text-sm font-bold text-cyan-600 mt-2 hover:text-cyan-700 transition-colors w-fit">
            BOOK NOW
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}