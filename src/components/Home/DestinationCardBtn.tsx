'use client'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function DestinationCardBtn({id}:{id:string | number}) {

  const handleAdd = async (id: string | number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        // Handle known cases with friendly messages
        if (res.status === 409) {
          alert("Already exists");
          return { success: false, exists: true};
        }
        if (res.status === 400) {
          alert("Invalid ID");
          return { success: false};
        }

        // Any other error status
        throw new Error(`Request failed (${res.status})`);
      }

      // Success (201)
      alert("Added package successfully");
      return { success: true};

    } catch (error) {
      console.error("handleAdd failed:", error);
      return { success: false, message: (error as Error).message };
    }
  };

  return (
    <div className="">
      <button onClick={() => handleAdd(id)} className="w-full bg-[#00A3C4] hover:bg-[#008CA8] text-white font-medium py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm mb-6">
        <span>Book Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
