export default function SearchBar() {
  return (
    // Changed to relative on mobile, absolute on larger screens
    <div className="w-full lg:absolute lg:bottom-0 lg:left-0 z-20">
      <div className="mx-auto max-w-7xl">
        {/* Grid: 1 col mobile, 2 cols tablet, 5 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-black/60 lg:bg-black/40 backdrop-blur-md border-t border-white/10">
          
          {/* Field 1 */}
          <div className="p-4 border-b sm:border-r lg:border-r border-white/20 flex flex-col justify-center">
            <label className="text-xs font-bold uppercase text-gray-300 mb-1">Location</label>
            <input 
              type="text" 
              placeholder="Address, City Or Zip" 
              className="bg-transparent border-none text-white placeholder:text-gray-400 focus:outline-none text-sm w-full"
            />
          </div>

          {/* Field 2 */}
          <div className="p-4 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col justify-center">
            <label className="text-xs font-bold uppercase text-gray-300 mb-1">Date/Duration</label>
            <input 
              type="text" 
              placeholder="Anytime/5 Days" 
              className="bg-transparent border-none text-white placeholder:text-gray-400 focus:outline-none text-sm w-full"
            />
          </div>

          {/* Field 3 */}
          <div className="p-4 border-b sm:border-b-0 sm:border-r lg:border-r border-white/20 flex flex-col justify-center">
            <label className="text-xs font-bold uppercase text-gray-300 mb-1">Budget</label>
            <input 
              type="text" 
              placeholder="$0 - $3000" 
              className="bg-transparent border-none text-white placeholder:text-gray-400 focus:outline-none text-sm w-full"
            />
          </div>

          {/* Field 4 */}
          <div className="p-4 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col justify-center">
            <label className="text-xs font-bold uppercase text-gray-300 mb-1">People</label>
            <input 
              type="text" 
              placeholder="5-10" 
              className="bg-transparent border-none text-white placeholder:text-gray-400 focus:outline-none text-sm w-full"
            />
          </div>

          {/* Search Button - Spans full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 transition-colors">
            <button className="w-full h-full py-4 lg:py-6 text-white font-semibold text-lg">
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}