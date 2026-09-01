// components/homepage/HowItWorks.jsx
import { UserRoundPlus, SearchCheck, Stethoscope } from "lucide-react";
import { services } from "./homepageData";
import SectionNav from "./SectionNav";

const steps = [
  {
    id: 1,
    icon: UserRoundPlus,
    title: "Create Your Profile",
    description:
      "Sign up in a few clicks and set up a profile for every animal in your care.",
    image: services[4].image,
  },
  {
    id: 2,
    icon: SearchCheck,
    title: "Choose a Service",
    description:
      "Browse vet consultations, pharmacy, shopping, adoption, and AI-powered care.",
    image: services[2].image,
  },
  {
    id: 3,
    icon: Stethoscope,
    title: "Get Expert Care",
    description:
      "Book appointments, get professional guidance, and manage healthcare with confidence.",
    image: services[0].image,
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-[#F8F3EC] pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#E86A33]/10 px-3.5 py-1.5 text-[11px] lg:text-xs font-semibold uppercase tracking-widest text-[#E86A33]">
            How It Works
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Caring for Every Animal,
            <br />
            Made Simple
          </h2>
          <p className="mx-auto mt-4 max-w-xl lg:max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600">
            Start your journey with LovoPet in three simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 pb-4 lg:grid-cols-3 lg:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="group overflow-hidden rounded-2xl border border-[#E5D8C9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1E2A4A]/40" />
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#E86A33] text-base font-bold text-white shadow-md">
                    {step.id}
                  </div>
                  <div className="absolute bottom-4 right-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#5C2A73] shadow-md">
                    <Icon size={22} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#5C2A73]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SectionNav nextId="testimonials" label="Testimonials" />
    </section>
  );
}

export default HowItWorks;
