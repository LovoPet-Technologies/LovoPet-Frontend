// components/homepage/Services.jsx
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services, barColors } from "./homepageData";
import SectionNav from "./SectionNav";

const quickLinks = [
  { label: "Book a Vet", path: "/vet", imageIndex: 0, color: "#5C2A73" },
  {
    label: "Order Medicines",
    path: "/animal-pharmacy",
    imageIndex: 1,
    color: "#E86A33",
  },
  {
    label: "Shop Essentials",
    path: "/pet-shop",
    imageIndex: 2,
    color: "#8B9A5B",
  },
];

function Services() {
  const navigate = useNavigate();

  return (
    <section id="services" className="scroll-mt-16 bg-[#F8F3EC] pt-16 lg:pt-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-6">
        <div className="mx-auto max-w-2xl xl:max-w-3xl text-center">
          <span className="rounded-full bg-[#E86A33]/10 px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-[#E86A33]">
            EXPLORE ALL SERVICES
          </span>

          <h2 className="mt-5 text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1E2A4A]">
            Every Kind of Care,
            <br />
            All in One Place
          </h2>

          <p className="mt-4 text-base lg:text-lg leading-7 lg:leading-8 text-gray-600">
            LovoPet brings together vet care, medicine, shopping, AI triage, and
            adoption for cats and dogs, and for cows, birds, and every other
            animal in your life.
          </p>
        </div>

        {/* Quick links to your live pages */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {quickLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="group overflow-hidden rounded-xl border border-[#E5D8C9] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-16 w-full overflow-hidden sm:h-24">
                <img
                  src={services[item.imageIndex].image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className="px-2 py-2 text-center text-[11px] font-bold text-white sm:text-sm"
                style={{ backgroundColor: item.color }}
              >
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {/* Full service grid: photo + colored bar (Supertails-style) */}
        <div className="mt-12 grid gap-6 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const barColor = barColors[index % barColors.length];
            return (
              <div
                key={service.id}
                className="group overflow-hidden rounded-2xl border border-[#E5D8C9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-40 w-full overflow-hidden sm:h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ backgroundColor: barColor }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div
                  className="px-5 py-3 text-base font-bold text-white sm:text-lg"
                  style={{ backgroundColor: barColor }}
                >
                  {service.shortTitle}
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-gray-600">
                    {service.cardDescription}
                  </p>
                  <button
                    onClick={() => navigate(service.ctaPath)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                    style={{ color: barColor }}
                  >
                    {service.ctaLabel}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SectionNav nextId="shop" label="Shop" />
    </section>
  );
}

export default Services;
