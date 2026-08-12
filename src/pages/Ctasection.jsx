// src/components/home/CTASection.jsx
import { FaLinkedin } from "react-icons/fa";

const founders = [
  {
    name: "Saheli Ghosh Roy",
    role: "CEO & Founder",
    image: "/founder.jpeg",
    linkedin: "https://www.linkedin.com/in/saheli-ghosh-roy-b4a881381/",
    bio: "Leads product and vision building the platform that connects pets, vets, rescuers, and communities under one roof.",
  },
  {
    name: "Soumili Das",
    role: "Co-Founder",
    image: "/cofounder.png",
    linkedin: "https://www.linkedin.com/in/soumilidas01/",
    bio: "Drives operations and partnerships turning the mission of accessible animal care into a working, growing platform.",
  },
];

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#FDF8F2] py-20">
      {/* soft background accents to match the banner */}
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#5C2A73]/8 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E86A33]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-[#E86A33]">
          Leadership
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-[#1E2A4A] sm:text-4xl">
          Meet our founders
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#1E2A4A]/70">
          The passionate team behind LovoPet's mission to revolutionize animal
          care and bring everything your animal needs onto one platform.
        </p>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-[#1E2A4A]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#5C2A73]/10"
            >
              {/* top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#5C2A73] to-[#E86A33] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#E86A33] to-[#5C2A73] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40" />
                <img
                  src={founder.image}
                  alt={`Portrait of ${founder.name}`}
                  className="relative h-32 w-32 rounded-full object-cover ring-4 ring-[#FDF8F2] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
              </div>

              <h4 className="mt-6 text-2xl font-bold text-[#1E2A4A]">
                {founder.name}
              </h4>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#E86A33]">
                {founder.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#1E2A4A]/65">
                {founder.bio}
              </p>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${founder.name} on LinkedIn`}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1E2A4A]/10 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#5C2A73] transition-all duration-300 hover:border-[#5C2A73] hover:bg-[#5C2A73] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C2A73]/40"
              >
                <FaLinkedin size={18} />
                Connect
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
