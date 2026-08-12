import { ShieldCheck, Clock3, Bot, HeartHandshake } from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Trusted Veterinary Experts",
    description:
      "Consult experienced and verified veterinarians committed to providing reliable care for your pets.",
  },
  {
    id: 2,
    icon: Clock3,
    title: "Care When You Need It",
    description:
      "Access pet healthcare services anytime with a seamless and convenient digital experience.",
  },
  {
    id: 3,
    icon: Bot,
    title: "AI-Powered Assistance",
    description:
      "Receive intelligent guidance, health insights, and personalized recommendations for your pets.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Everything in One Platform",
    description:
      "From consultations to shopping and adoption, manage your pet's needs from a single place.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-[#FDF8F2] py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#5C2A73]/10 px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-[#5C2A73]">
            WHY LOVOPET
          </span>

          <h2 className="mt-5 text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Why Pet Parents
            <br />
            Choose LovoPet
          </h2>

          <p className="mt-4 text-base lg:text-lg leading-7 lg:leading-8 text-gray-600">
            We combine trusted veterinary expertise, intelligent technology, and
            a complete ecosystem of pet care services to deliver a seamless
            experience for every pet parent.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 grid gap-6 lg:gap-6 xl:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-[#E5D8C9] bg-white p-6 lg:p-6 xl:p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E86A33]/40 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 lg:h-13 lg:w-13 xl:h-16 xl:w-16 items-center justify-center rounded-xl lg:rounded-2xl bg-[#5C2A73]/10 transition-all duration-300 group-hover:bg-[#E86A33]">
                  <Icon
                    size={24}
                    className="text-[#5C2A73] transition-colors duration-300 group-hover:text-white xl:hidden"
                  />
                  <Icon
                    size={28}
                    className="hidden text-[#5C2A73] transition-colors duration-300 group-hover:text-white xl:block"
                  />
                </div>

                <h3 className="mt-4 lg:mt-5 text-base lg:text-lg xl:text-xl font-bold text-[#5C2A73]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-[15px] leading-6 lg:leading-7 text-gray-600">
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

export default WhyChooseUs;
