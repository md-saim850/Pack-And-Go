'use client'
import { authClient } from '@/lib/auth-client'
import { Trash2 } from 'lucide-react'

export default function DeleteMyBookingBtn({id}: {id:string}) {

  const handleDelete = async(id:string) =>{
    try{
      const {data, error} = await authClient.token();

      if(error || !data?.token){
        throw new Error("Unauthorizated") 
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${id}`, {
        method:"DELETE",
        headers:{
          "Authorization":`Bearer ${data.token}`
        }
      })

      if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
      }

      alert("Package Deleted.");

    }catch(error){
      console.log(error);
    }
  }

  return (
    <button onClick={() => handleDelete(id)} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-rose-200 text-rose-500 hover:bg-rose-50 text-sm font-medium rounded-lg transition-colors">
      <Trash2 className="w-4 h-4" />
      Cancel
    </button>
  )
}
