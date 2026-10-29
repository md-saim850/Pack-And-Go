import CallToAction from "@/components/Home/CallToAction";
import FeaturedDestinations from "@/components/Home/FeaturedDestinations";
import Hero from "@/components/Home/Hero";
import TravelerReviews from "@/components/Home/TravelerReviews";
import WhyChooseUs from "@/components/Home/WhyChooseUs";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <TravelerReviews />
      <CallToAction />
    </main>
  );
}