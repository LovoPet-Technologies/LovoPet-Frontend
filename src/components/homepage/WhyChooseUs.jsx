// components/homepage/WhyChooseUs.jsx
import { ShieldCheck, Clock3, Bot, HeartHandshake } from "lucide-react";
import { services } from "./homepageData";
import SectionNav from "./SectionNav";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Trusted Veterinary Experts",
    description:
      "Consult experienced, verified veterinarians committed to reliable care for every animal.",
    image: "https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg",
  },
  {
    id: 2,
    icon: Clock3,
    title: "Care When You Need It",
    description:
      "Access animal healthcare anytime through a seamless, always-on digital experience.",
    image:
      "https://images.pexels.com/photos/7121954/pexels-photo-7121954.jpeg?q=80&w=1920&h=1080&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: Bot,
    title: "AI-Powered Assistance",
    description:
      "Get intelligent guidance, health insights, and personalised recommendations in seconds.",
    image:
      "https://images.pexels.com/photos/8204323/pexels-photo-8204323.jpeg?q=80&w=1920&h=1080&auto=format&fit=crop",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Everything in One Platform",
    description:
      "From consultations to shopping and adoption, manage every animal's needs in one place.",
    image: "https://images.pexels.com/photos/35634849/pexels-photo-35634849.jpeg?q=80&w=1920&h=1080&auto=format&fit=crop",
  },
];

const badges = [
  "Verified Veterinarians",
  "Every Species Welcome",
  "AI-Assisted Triage",
  "Nationwide Delivery",
];

function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="scroll-mt-16 bg-[#FDF8F2] pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#5C2A73] to-[#E86A33] px-6 py-5 text-center shadow-md sm:gap-6">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#5C2A73]/10 px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-[#5C2A73]">
            WHY LOVOPET
          </span>
          <h2 className="mt-5 text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Why Choose LovoPet
          </h2>
          <p className="mt-2 text-base lg:text-lg leading-7 lg:leading-8 text-gray-600">
            Trusted veterinary expertise, intelligent technology, and a complete
            ecosystem of animal care services, built around every kind of
            companion.
          </p>
        </div>

        <div className="mt-10 grid gap-6 pb-4 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative h-64 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E86A33] text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SectionNav nextId="how-it-works" label="How It Works" />
    </section>
  );
}

export default WhyChooseUs;
