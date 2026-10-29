'use client'
import { FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-20 pb-8 px-6 border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">
          
          {/* Brand Section */}
          <div className="lg:max-w-md">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">
              Pack & Go
            </h1>
            <p className="text-gray-400 font-light text-sm md:text-base">
              Your gateway to extraordinary travel experiences around the world.
            </p>
          </div>s

          {/* Newsletter Section */}
          <div className="w-full lg:max-w-sm">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 text-xs mb-4 font-light">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            
            {/* Input Form */}
            <form 
              className="relative flex items-center bg-[#1f1f1f] border border-transparent focus-within:border-gray-600 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent text-sm text-white px-4 py-3.5 outline-none placeholder:text-gray-500"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
                aria-label="Subscribe"
              >
                {/* <ArrowUpRight className="w-5 h-5 stroke-[1.5]" /> */}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-300 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">My Profile</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Support
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-300 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-300 font-light">
              <li>
                <a href="tel:+7869011622" className="hover:text-white transition-colors">
                  786 901 1622
                </a>
              </li>
              <li>
                <a href="mailto:info@wanderland.com" className="hover:text-white transition-colors">
                  info@packandgo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-800/50">
          <p className="text-xs text-gray-500 font-light order-2 md:order-1">
            {/* © {new Date().getFullYear()} Pack & Go. All rights reserved. */}
            © Pack & Go. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <a href="#" className="text-white hover:text-gray-400 transition-colors" aria-label="Twitter">
              <FaTwitter className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors" aria-label="Instagram">
              <FaInstagramSquare className="w-5 h-5 stroke-[1.5]" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}