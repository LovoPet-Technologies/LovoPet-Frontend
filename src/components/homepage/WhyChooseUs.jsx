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
    <section className="bg-[#FDF8F2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#5C2A73]/10 px-4 py-2 text-sm font-semibold text-[#5C2A73]">
            WHY LOVOPET
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-[#5C2A73] md:text-5xl">
            Why Pet Parents
            <br />
            Choose LovoPet
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine trusted veterinary expertise, intelligent technology, and
            a complete ecosystem of pet care services to deliver a seamless
            experience for every pet parent.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-3xl border border-[#E5D8C9] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#E86A33]/40 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5C2A73]/10 transition-all duration-300 group-hover:bg-[#E86A33]">
                  <Icon
                    size={30}
                    className="text-[#5C2A73] transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#5C2A73]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
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
