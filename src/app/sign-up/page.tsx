'use client'

import { User, Mail, Lock} from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signUp } from '../../lib/auth-client';

export default function SignUp() {

  const handleSignUp = async(e:React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault();
    try{
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries()) as {
        name: string, 
        email: string, 
        password:string, 
        password2:string
      };

      
      const {name, email, password, password2} = user;

      if(password !== password2){
        throw new Error("Password dose not match!")
      }

      const {data, error} = await signUp.email({
        name, 
        email, 
        password,
        callbackURL: "/"
      })


      console.log(data, error);

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-normal text-gray-900 mb-2 font-serif">
          Create Account
        </h2>
        <p className="text-sm text-gray-500">
          Start your adventure with Wanderlust
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-md w-full bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8">
        <form className="space-y-5" onSubmit={handleSignUp}>
          
          {/* Full Name Input */}
          <div>
            <label htmlFor="Full Name" className="block text-sm font-medium text-gray-800 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-100 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-100 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-100 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password2"
                name="password2"
                type="password"
                placeholder="Confirm your password"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-100 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0FA4C2] hover:bg-[#0c8ba5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
          >
            Create Account  
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              <FaGoogle className="h-4 w-4 mr-2 text-red-500" />
              Sign Up With Google
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="#" className="font-medium text-[#0FA4C2] hover:text-[#0c8ba5] transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}