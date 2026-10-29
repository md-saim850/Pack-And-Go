// components/WhyChooseUs.tsx
import { ShieldCheck, Map, Headset } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#F0F9FB] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight mb-4">
            Why Choose Wanderlust
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 md:p-10 flex flex-col items-start transition-shadow hover:shadow-md duration-300"
              >
                {/* Icon Container */}
                <div className="mb-6 text-[#00B4D8]">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-normal text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}