// HeroBanner.jsx
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Sample ad banners for full-width background
const HERO_BANNERS = [
  {
    id: 1,
    tag: "Special Offer",
    badgeColor: "#E0603A",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    tag: "Mega Deal",
    badgeColor: "#5C2A73",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    tag: "Vet Approved",
    badgeColor: "#2D6A4F",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1920&q=80",
  },
];

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1440 60"
      className="relative z-10 w-full block"
      preserveAspectRatio="none"
      style={{ height: 28 }}
    >
      <path
        d="M0,32 C240,64 480,0 720,20 C960,40 1200,8 1440,28 L1440,60 L0,60 Z"
        fill="#748757"
        fillOpacity="0.16"
      />
      <path
        d="M0,44 C260,20 520,56 780,36 C1040,16 1260,48 1440,40 L1440,60 L0,60 Z"
        fill="#3B1843"
        fillOpacity="0.10"
      />
    </svg>
  );
}

export default function HeroBanner({ title, subtitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide background every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  return (
    <section className="group relative overflow-hidden bg-[#FBF6EF] flex flex-col">
      {/* BACKGROUND SLIDER TRACK */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {HERO_BANNERS.map((banner) => (
            <div key={banner.id} className="relative min-w-full h-full">
              <img
                src={banner.image}
                alt="Pet Banner"
                className="h-full w-full object-cover object-right"
              />
            </div>
          ))}
        </div>

        {/* GRADIENT OVERLAY (Guarantees text readability on left side) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBF6EF] via-[#FBF6EF]/90 via-55% to-transparent" />
        {/* Extra bottom-up overlay on mobile so text is readable even when image is behind it top-to-bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6EF] via-[#FBF6EF]/40 via-30% to-transparent md:hidden" />
      </div>

      {/* HERO CONTENT — vertically centered, independent of section height */}
      <div className="relative z-10 flex min-h-[380px] sm:min-h-[420px] md:min-h-[460px] w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
            {/* Tag */}
            <span
              className="mb-4 inline-block rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] sm:mb-5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.14em]"
              style={{
                background: "#FBEAE3",
                color: "#B94B2A",
              }}
            >
              Everything for your pet
            </span>

            {/* Dynamic Title */}
            <h1
              className="mb-4 text-[1.85rem] font-bold leading-[1.12] sm:mb-5 sm:text-[2.3rem] sm:leading-[1.08] md:text-5xl lg:text-[3.8rem] pt-15"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                color: "#3B1843",
              }}
            >
              {title || "Pet Shop"}
            </h1>

            {/* Dynamic Subtitle */}
            <p className="mb-7 text-sm font-medium leading-6 text-zinc-700 sm:mb-8 sm:text-base sm:leading-7 md:text-lg">
              {subtitle ||
                "Everything your pet needs, from food and toys to everyday essentials."}
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <a
                href="#products"
                className="inline-flex w-full items-center justify-center rounded-full px-7 py-3 font-semibold text-white shadow-[0_10px_24px_-8px_rgba(224,96,58,0.55)] transition-all duration-200 hover:-translate-y-0.5 sm:w-auto sm:py-3.5"
                style={{ background: "#E0603A" }}
              >
                Shop now
              </a>

              <a
                href="/vet"
                className="inline-flex w-full items-center justify-center rounded-full border-2 px-7 py-3 font-semibold transition-all duration-200 hover:bg-white sm:w-auto sm:py-3.5"
                style={{
                  borderColor: "#3B1843",
                  color: "#3B1843",
                }}
              >
                Book a vet visit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROLS — always visible on touch/mobile, hover-reveal on desktop */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 backdrop-blur-sm transition-opacity duration-200 sm:left-4 md:opacity-0 md:group-hover:opacity-100 hover:bg-white"
      >
        <FaChevronLeft size={16} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 backdrop-blur-sm transition-opacity duration-200 sm:right-4 md:opacity-0 md:group-hover:opacity-100 hover:bg-white"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Pagination Indicators — small centered row on mobile, bottom-right on desktop */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 md:bottom-12 md:right-12 md:left-auto md:translate-x-0">
        {HERO_BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 sm:h-2.5 ${
              currentIndex === index
                ? "w-6 bg-[#E0603A] sm:w-8"
                : "w-2 bg-[#3B1843]/30 hover:bg-[#3B1843]/60 sm:w-2.5"
            }`}
          />
        ))}
      </div>

      {/* Decorative Bottom Wave */}
      <WaveDivider />
    </section>
  );
}
