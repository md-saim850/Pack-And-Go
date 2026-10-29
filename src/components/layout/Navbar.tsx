"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Menu, X, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@base-ui/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign-out failed:", error);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="relative container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="text-gray-600 hover:text-gray-900"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
          >
            Home
          </Link>

          <Link
            href="/all-destinations"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Destinations
          </Link>

          <Link
            href="/my-booking"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            My Bookings
          </Link>

          <Link
            href="/admin"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Admin
          </Link>
        </div>

        {/* Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="font-serif text-xl font-bold italic tracking-tight text-cyan-600 md:text-2xl"
          >
            Pack & Go
          </Link>
        </div>

        {/* Authentication Actions */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {!isPending && user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    className="flex w-fit items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">
                      {user.name || "Profile"}
                    </span>
                  </Button>
                }
              />

              <PopoverContent align="end" className="bg-white">
                <PopoverHeader>
                  <PopoverTitle>
                    {user.name || "My Account"}
                  </PopoverTitle>

                  <PopoverDescription>
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>

                <Button
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          ) : !isPending ? (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-cyan-600"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                Sign Up
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-2 border-t border-gray-100 bg-white px-4 pt-2 pb-4 md:hidden">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-cyan-600 hover:bg-gray-50"
          >
            Home
          </Link>

          <Link
            href="/all-destinations"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Destinations
          </Link>

          <Link
            href="/my-booking"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            My Bookings
          </Link>

          {user ? (
            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                await handleLogout();
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-gray-50"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
