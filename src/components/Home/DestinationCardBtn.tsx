'use client'
import { authClient } from '@/lib/auth-client';
import { ArrowRight } from 'lucide-react'

export default function DestinationCardBtn({id}:{id:string | number}) {

  const handleAdd = async (id: string | number) => {
    try {
      const{data, error} = await authClient.token();

      if (error) {
        throw new Error("Failed to generate JWT token");
      }

      const token = data?.token

      if (!token) {
        throw new Error("JWT token not found");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });



      const result = await res.json();

      
      if (!res.ok) {
        alert(result.message);
        throw new Error(result.message || `Request failed (${res.status})`);
      }

      alert("Added package successfully");
      return { success: true };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      };
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
