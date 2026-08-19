import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Pill,
  ShoppingBag,
  Sparkles,
  PawPrint,
} from "lucide-react";

const slides = [
  {
    id: "consultation",
    icon: Stethoscope,
    tag: "Talk to a vet today",
    title: "Online Vet Consultation",
    highlight: "Consultation",
    description:
      "Connect with licensed veterinarians from home for dogs, cats, birds, farm animals, and exotics diagnoses, prescriptions, and follow-ups without the waiting room.",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Book a consultation",
    ctaPath: "/services/consultation",
  },
  {
    id: "pharmacy",
    icon: Pill,
    tag: "Prescriptions, delivered",
    title: "Animal Pharmacy",
    highlight: "Pharmacy",
    description:
      "Order vet-verified medication, supplements, and parasite prevention for any animal in your care from livestock to household pets, refills tracked and dispatched fast.",
    image:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Visit the pharmacy",
    ctaPath: "/services/pharmacy",
  },
  {
    id: "petshop",
    icon: ShoppingBag,
    tag: "Everything they need",
    title: "Pet & Animal Shop",
    highlight: "Shop",
    description:
      "Food, bedding, enclosures, grooming tools, and toys for pets, working animals, and everything in between curated by our care team, not just algorithms.",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Shop now",
    ctaPath: "/shop",
  },
  {
    id: "ai-assistant",
    icon: Sparkles,
    tag: "In beta",
    title: "AI Health Assistant",
    highlight: "Health Assistant",
    description:
      "Describe a symptom and get an instant triage for any species know when it's fine to wait and when it's time to see a vet, backed by real clinical guidelines.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Try the assistant",
    ctaPath: "/services/ai-assistant",
  },
  {
    id: "adoption",
    icon: PawPrint,
    tag: "Find a companion",
    title: "Pet Adoption",
    highlight: "Adoption",
    description:
      "Browse verified shelters and rescues for dogs, cats, and other animals waiting for a home. Every listing includes health records and temperament notes.",
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1600&auto=format&fit=crop",
    ctaLabel: "Start adopting",
    ctaPath: "/adoption",
  },
];

const AUTOPLAY_MS = 6000;

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return undefined;

    timerRef.current = setInterval(() => {
      setActive((prevIndex) => (prevIndex + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [paused]);

  const slide = slides[active];
  const Icon = slide.icon;
  const titlePrefix = slide.title.replace(slide.highlight, "").trim();

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[560px] w-full sm:h-[620px] lg:h-[720px]">
        {/* Background images, cross-fading */}
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Blend overlays: darken for text legibility + brand tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[#5C2A73]/10 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
              <Icon size={16} className="text-[#F4A96B]" />
              {slide.tag}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {titlePrefix && (
                <>
                  {titlePrefix}
                  <br />
                </>
              )}
              <span className="text-[#F4A96B]">{slide.highlight}</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base lg:text-lg">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(slide.ctaPath)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A33] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#5C2A73] sm:text-base"
              >
                {slide.ctaLabel}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 sm:text-base"
              >
                Explore all services
              </button>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous service"
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next service"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots + slide labels */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[#E86A33]"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
