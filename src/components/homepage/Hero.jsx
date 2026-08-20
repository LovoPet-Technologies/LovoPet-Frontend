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
    tag: "Livestock, Farm & Pets",
    title: "Online Vet Consultation",
    highlight: "Consultation",
    description:
      "Connect with licensed veterinarians for cows, horses, pets, birds, and exotics. Get remote diagnoses, prescriptions, and expert care advice from home.",
    // Brighter, clear daylight farm & livestock scene
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Book a consultation",
    ctaPath: "/services/consultation",
  },
  {
    id: "pharmacy",
    icon: Pill,
    tag: "All Species Prescriptions",
    title: "Animal Pharmacy",
    highlight: "Pharmacy",
    description:
      "Order vet-verified medication, supplements, and vaccines for cattle, poultry, and household pets with fast and reliable delivery.",
    // Bright image: Clean, well-lit pharmacy and clinical setup
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Visit the pharmacy",
    ctaPath: "/services/pharmacy",
  },
  {
    id: "petshop",
    icon: ShoppingBag,
    tag: "Pet & Farm Supplies",
    title: "Pet & Animal Shop",
    highlight: "Shop",
    description:
      "Quality feed, grooming tools, enclosures, and essentials for farm livestock, birds, and domestic pets curated by experts.",
    // Bright image: Vibrant, daylight shot of dogs and general animal care
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Shop now",
    ctaPath: "/shop",
  },
  {
    id: "ai-assistant",
    icon: Sparkles,
    tag: "Birds, Exotics & More",
    title: "AI Health Assistant",
    highlight: "Health Assistant",
    description:
      "Describe symptoms for any animal—from parrots and reptiles to dogs and cattle—and receive instant clinical triage advice.",
    // Full, uncropped, bright bird photo in natural light
    image:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1920&h=1080&auto=format&fit=crop",
    ctaLabel: "Try the assistant",
    ctaPath: "/services/ai-assistant",
  },
  {
    id: "adoption",
    icon: PawPrint,
    tag: "Rescue & Sanctuary",
    title: "Animal Adoption",
    highlight: "Adoption",
    description:
      "Browse verified rescues and shelters for dogs, cats, farm animals, and rescued livestock looking for a safe home.",
    // Bright image: Friendly farm/sanctuary animal in bright sunlight
    image:
      "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?q=80&w=1920&h=1080&auto=format&fit=crop",
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
        {/* Background images */}
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

        {/* Subtle left-side dark gradient only where text sits to maintain overall image brightness */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
              <Icon size={16} className="text-[#F4A96B]" />
              {slide.tag}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
              {titlePrefix && (
                <>
                  {titlePrefix}
                  <br />
                </>
              )}
              <span className="text-[#F4A96B]">{slide.highlight}</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white sm:mt-6 sm:text-base lg:text-lg drop-shadow">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(slide.ctaPath)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A33] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#5C2A73] sm:text-base"
              >
                {slide.ctaLabel}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-black/20 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-gray-900 sm:text-base"
              >
                Explore all services
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[#E86A33]"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
