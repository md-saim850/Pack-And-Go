import SearchBar from "@/components/layout/SearchBar";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bannerImg from "../../../public/images/Banner.png"
import Image from "next/image";


export default function Hero() {
  return (
    <div className="relative flex-1 w-full flex flex-col justify-between">
      
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImg}
          alt="Hero Background"
          fill
          priority // Loads this image immediately since it's above the fold
          className="object-cover object-center"
          placeholder="blur" // Optional: Next.js generates a blur automatically for static imports
        />
        <div className="absolute inset-0 bg-black/50 lg:bg-black/40" />
      </div>

      {/* Hero Content Wrapper - Adds padding for mobile nav and search bar */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 py-20 lg:py-32 w-full max-w-6xl mx-auto mt-12 lg:mt-0">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-white mb-4 lg:mb-6">
          Discover Your <br />
          <span className="font-normal">Next Adventure</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light mb-8 lg:mb-10">
          Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-base rounded-none">
            EXPLORE NOW <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-black px-8 py-6 text-base rounded-none">
            VIEW DESTINATION
          </Button>
        </div>
      </div>

      {/* The Search Bar (Flows naturally on mobile, absolute on desktop) */}
      <div className="relative z-20 w-full lg:pb-0">
          <SearchBar />
      </div>

    </div>
  )
}
