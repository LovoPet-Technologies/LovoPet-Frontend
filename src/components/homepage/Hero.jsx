// components/homepage/Hero.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { services as slides } from "./homepageData";
import SectionNav from "./SectionNav";

const AUTOPLAY_MS = 6000;

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const handleTouchStart = (e) => {
    setPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) next();
    else if (distance < -50) prev();
    setTouchStart(0);
    setTouchEnd(0);
  };

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
      id="home"
      className="relative w-full overflow-hidden select-none bg-[#1E2A4A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[580px] w-full sm:h-[620px] lg:h-[680px]">
        {slides.map((s, i) => (
          <picture key={s.id}>
            <img
              src={s.image}
              alt={s.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{
                objectPosition:
                  window.innerWidth < 640
                    ? s.imagePositionMobile || s.imagePosition || "center"
                    : s.imagePosition || "center",
              }}
            />
          </picture>
        ))}

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-6 lg:px-10 pb-12 sm:pb-0">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
              <Icon size={15} className="text-[#F4A96B]" />
              {slide.tag}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
              {titlePrefix && (
                <>
                  {titlePrefix}
                  <br className="hidden sm:inline" />{" "}
                </>
              )}
              <span className="text-[#F4A96B]">{slide.highlight}</span>
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-100 sm:mt-6 sm:text-base lg:text-lg drop-shadow">
              {slide.description}
            </p>

            {/* Compact Mobile Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <button
                onClick={() => navigate(slide.ctaPath)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E86A33] px-4 py-2.5 text-[11px] font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#5C2A73] sm:px-7 sm:py-3.5 sm:text-base"
              >
                {slide.ctaLabel}
                <ArrowRight size={14} className="sm:hidden" />
                <ArrowRight size={18} className="hidden sm:block" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-16">
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

        <div className="absolute bottom-0 left-0 right-0">
          <SectionNav nextId="services" label="Services" variant="dark" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
