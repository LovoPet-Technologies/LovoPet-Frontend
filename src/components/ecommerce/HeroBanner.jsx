// HeroBanner.jsx
import React from "react";

function PawBackdrop() {
  const paw = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
      <g fill='#3B1843' fill-opacity='0.045'>
        <ellipse cx='40' cy='48' rx='11' ry='9'/>
        <ellipse cx='24' cy='32' rx='5' ry='6'/>
        <ellipse cx='36' cy='24' rx='5' ry='6'/>
        <ellipse cx='48' cy='24' rx='5' ry='6'/>
        <ellipse cx='58' cy='32' rx='5' ry='6'/>
      </g>
    </svg>`,
  );
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${paw}")`,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1440 60"
      className="w-full block"
      preserveAspectRatio="none"
      style={{ height: 36 }}
    >
      <path
        d="M0,32 C 240,64 480,0 720,20 C 960,40 1200,8 1440,28 L1440,60 L0,60 Z"
        fill="#748757"
        fillOpacity="0.16"
      />
      <path
        d="M0,44 C 260,20 520,56 780,36 C 1040,16 1260,48 1440,40 L1440,60 L0,60 Z"
        fill="#3B1843"
        fillOpacity="0.10"
      />
    </svg>
  );
}

export default function HeroBanner({ title, subtitle }) {
  return (
    <div className="relative overflow-hidden bg-[#FBF6EF]">
      <PawBackdrop />
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, #F2D9C4 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, #DCE3CA 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-20 md:pb-14 text-center">
        <span
          className="inline-block text-xs font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-5"
          style={{ background: "#FBEAE3", color: "#B94B2A" }}
        >
          Connecting pets, vets & communities
        </span>

        <h1
          className="text-[2.1rem] leading-[1.1] sm:text-5xl md:text-[3.4rem] font-bold mb-4"
          style={{ fontFamily: "'Baloo 2', sans-serif", color: "#3B1843" }}
        >
          {title || "AI-powered animal care,"}
          <br />
          <span style={{ color: "#E0603A" }}>better together.</span>
        </h1>

        <p className="text-zinc-600 text-base md:text-lg max-w-xl mx-auto mb-8 font-medium">
          {subtitle ||
            "Everything your pet needs — vet visits, medicine, food and toys, curated in one place."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="#products"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_10px_24px_-8px_rgba(224,96,58,0.55)] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#E0603A" }}
          >
            Shop now
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full border-2 transition-colors duration-200 hover:bg-white"
            style={{ borderColor: "#3B1843", color: "#3B1843" }}
          >
            Book a vet visit
          </a>
        </div>
      </div>

      <WaveDivider />
    </div>
  );
}
