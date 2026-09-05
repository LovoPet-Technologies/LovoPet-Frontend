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
      <div className="relative h-[560px] w-full sm:h-[620px] lg:h-[680px]">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.title}
            style={{ objectPosition: s.imagePosition || "center" }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

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

        <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-16">
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