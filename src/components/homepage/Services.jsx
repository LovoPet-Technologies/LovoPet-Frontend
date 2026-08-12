import {
  Stethoscope,
  Pill,
  ShoppingBag,
  HeartHandshake,
  Bot,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Stethoscope,
    title: "Online Vet Consultation",
    description:
      "Connect with experienced veterinarians anytime through secure online consultations.",
  },
  {
    id: 2,
    icon: Pill,
    title: "Animal Pharmacy",
    description:
      "Order genuine medicines and healthcare products for your pets with ease.",
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Pet Shop",
    description:
      "Explore premium food, toys, accessories, grooming essentials, and more.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Pet Adoption",
    description:
      "Give loving pets a forever home through trusted adoption partners.",
  },
  {
    id: 5,
    icon: Bot,
    title: "AI Health Assistant",
    description:
      "Get instant AI-powered guidance for common pet health concerns and care.",
  },
  {
    id: 6,
    icon: ShieldCheck,
    title: "Vaccination & Wellness",
    description:
      "Stay on schedule with vaccination reminders and preventive healthcare.",
  },
];

function Services() {
  return (
    <section className="bg-[#F8F3EC] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#E86A33]/10 px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-[#E86A33]">
            OUR SERVICES
          </span>

          <h2 className="mt-5 text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Everything Your Pet Needs,
            <br />
            All in One Place
          </h2>

          <p className="mt-4 text-base lg:text-lg leading-7 lg:leading-8 text-gray-600">
            LovoPet brings together trusted veterinary care, pet shopping,
            AI-powered assistance, adoption, and wellness services in one
            seamless platform.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 grid gap-6 lg:gap-6 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-[#E5D8C9] bg-white p-6 lg:p-6 xl:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E86A33]/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 lg:h-13 lg:w-13 xl:h-16 xl:w-16 items-center justify-center rounded-xl lg:rounded-2xl bg-[#5C2A73]/10 transition-all duration-300 group-hover:bg-[#E86A33]">
                  <Icon
                    size={24}
                    className="text-[#5C2A73] transition-colors duration-300 group-hover:text-white xl:hidden"
                  />
                  <Icon
                    size={28}
                    className="hidden text-[#5C2A73] transition-colors duration-300 group-hover:text-white xl:block"
                  />
                </div>

                <h3 className="mt-5 lg:mt-6 text-lg lg:text-xl xl:text-2xl font-bold text-[#5C2A73]">
                  {service.title}
                </h3>

                <p className="mt-3 text-[15px] leading-6 lg:leading-7 text-gray-600">
                  {service.description}
                </p>

                <button className="mt-6 inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-[#E86A33] transition-all duration-300 hover:gap-3">
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
