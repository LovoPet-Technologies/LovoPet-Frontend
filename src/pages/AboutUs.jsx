// src/pages/AboutUs.jsx
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { Heart, Sparkles, ShieldCheck, Users } from "lucide-react";

const founders = [
  {
    name: "Saheli Ghosh Roy",
    role: "CEO & Founder",
    image: "/founder.jpeg",
    linkedin: "https://www.linkedin.com/in/saheli-ghosh-roy-b4a881381/",
    bio: "Leads product and vision — building the platform that connects pets, vets, rescuers, and communities under one roof.",
  },
  {
    name: "Soumili Das",
    role: "Co-Founder",
    image: "/cofounder.png",
    linkedin: "https://www.linkedin.com/in/soumilidas01/",
    bio: "Drives operations and partnerships — turning the mission of accessible animal care into a working, growing platform.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Care first",
    description:
      "Every feature we ship starts with one question: does this make an animal's life better.",
  },
  {
    icon: Sparkles,
    title: "AI, responsibly",
    description:
      "Our AI Health Assistant supports vets and owners — it never replaces a real diagnosis.",
  },
  {
    icon: ShieldCheck,
    title: "Verified, always",
    description:
      "Vets, pharmacies, and shelters on LovoPet are checked and credentialed before they go live.",
  },
  {
    icon: Users,
    title: "One community",
    description:
      "Pet owners, farm caretakers, rescuers, and clinics — connected on a single, simple platform.",
  },
];

const stats = [
  { value: "48k+", label: "Animals Cared For" },
  { value: "180+", label: "Certified Vets" },
  { value: "4.9/5", label: "Owner Rating" },
  { value: "12+", label: "Partner Shelters" },
];

function AboutUs() {
  return (
    <div className="bg-[#FDF8F2]">
      {/* HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F2] via-[#FBF0E4] to-[#F3E4D8] pb-20 pt-14">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#5C2A73]/8 blur-3xl" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#E86A33]/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#6B7A4F]/20 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <img
              src="/brandname.png"
              alt="LovoPet"
              className="h-8 object-contain"
            />
          </div>

          <span className="text-sm font-bold uppercase tracking-widest text-[#E86A33]">
            Our Story
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#1E2A4A] sm:text-5xl">
            AI-Powered Animal Care,
            <br />
            <span className="text-[#E86A33]">Better Together.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#1E2A4A]/70 sm:text-lg">
            Connecting pets, veterinarians, rescuers &amp; communities — because
            complete animal care shouldn&apos;t live across a dozen different
            apps.
          </p>
        </div>
      </header>

      {/* STATS STRIP */}
      <section className="relative -mt-10 px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-[1.75rem] bg-white p-6 shadow-xl shadow-[#5C2A73]/5 ring-1 ring-[#1E2A4A]/5 sm:grid-cols-4 sm:p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <h3 className="text-2xl font-extrabold text-[#5C2A73] sm:text-3xl">
                {s.value}
              </h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#1E2A4A]/50 sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-[#E86A33]">
          Why LovoPet
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-[#1E2A4A] sm:text-4xl">
          Every animal deserves complete care
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#1E2A4A]/70">
          From household pets to farm and exotic animals, LovoPet brings online
          vet consultations, a verified pharmacy, adoption listings, and an AI
          health assistant onto one platform — so care never falls through the
          cracks.
        </p>
      </section>

      {/* VALUES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#E86A33]">
              What We Stand For
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1E2A4A] sm:text-4xl">
              Our values
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-[1.5rem] border border-[#1E2A4A]/5 bg-[#FDF8F2] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#5C2A73]/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73]">
                    <Icon size={20} />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-[#1E2A4A]">
                    {v.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#1E2A4A]/65">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#E86A33]">
            Leadership
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#1E2A4A] sm:text-4xl">
            Meet our founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#1E2A4A]/70">
            The passionate team behind LovoPet&apos;s mission to revolutionize
            animal care and bring everything your animal needs onto one
            platform.
          </p>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group flex flex-col items-center rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-[#1E2A4A]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#5C2A73]/5"
              >
                <div className="relative">
                  <img
                    src={founder.image}
                    alt={`Portrait of ${founder.name}`}
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-[#FDF8F2] transition-transform duration-500 group-hover:scale-105"
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

                <div className="mt-6 flex items-center gap-3">
                  {/* FIX: Added the missing '<a ' here */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with ${founder.name} on LinkedIn`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#1E2A4A]/10 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#5C2A73] transition-all duration-300 hover:border-[#5C2A73] hover:bg-[#5C2A73] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5C2A73]/40"
                  >
                    <FaLinkedin size={18} />
                    Connect
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5C2A73] to-[#3E1B4F] py-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E86A33]/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Join the LovoPet community
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Whether you&apos;re a pet owner, a vet, or a rescuer — there&apos;s
            a place for you on the platform.
          </p>
          <button className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A33] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#5C2A73]">
            Get started free
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
