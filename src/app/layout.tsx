import type { Metadata } from "next";
import { Josefin_Sans, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sayeeem Ahmed — Full-Stack Web Developer",
  description:
    "Portfolio of Sayeeem Ahmed, a full-stack web developer building modern, responsive web applications with Next.js, React, Node.js, Express.js, and MongoDB.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark", "h-full", "antialiased", josefinSans.className, "font-sans", geist.variable)}
    >
      <head>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
