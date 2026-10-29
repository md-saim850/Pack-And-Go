// components/TestimonialCard.tsx
import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
  image: string;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  image,
}: TestimonialProps) {
  return (
    <div className="w-full max-w-[320px] md:max-w-[650px] bg-white border border-gray-200 p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 h-auto">
      {/* Text Content */}
      <div className="flex flex-col justify-between flex-1 order-2 sm:order-1">
        <p className="text-[15px] md:text-base text-gray-800 leading-snug font-medium mb-8">
          "{quote}"
        </p>
        
        <div className="flex flex-col">
          {/* Cyan Dash */}
          <div className="w-5 h-[2px] bg-[#00B4D8] mb-2"></div>
          <h4 className="text-sm font-bold text-[#00B4D8] tracking-wide">
            {name}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{location}</p>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-80 w-full sm:w-[180px] md:w-[200px] aspect-[4/5] sm:aspect-auto sm:h-auto shrink-0 order-1 sm:order-2">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 200px"
        />
      </div>
    </div>
  );
}