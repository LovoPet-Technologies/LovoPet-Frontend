// components/homepage/SectionNav.jsx
import { ChevronDown, ArrowUp } from "lucide-react";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SectionNav({
  nextId,
  label,
  isLast = false,
  variant = "light",
}) {
  const isDark = variant === "dark";

  if (isLast) {
    return (
      <div className="relative z-10 flex justify-center pb-12 pt-4">
        <button
          type="button"
          onClick={() => scrollToId("home")}
          aria-label="Back to top"
          className="group inline-flex items-center gap-2 rounded-full bg-[#5C2A73] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E86A33]"
        >
          <ArrowUp
            size={18}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
          Back to top
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative z-10 flex justify-center ${
        isDark ? "pb-6 pt-2" : "pb-10 pt-4"
      }`}
    >
      <button
        type="button"
        onClick={() => scrollToId(nextId)}
        aria-label={label ? `Go to ${label}` : "Next section"}
        className={`section-nav-bounce flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300 hover:scale-110 ${
          isDark
            ? "border-white/50 bg-white/15 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-[#5C2A73]"
            : "border-[#5C2A73]/15 bg-white text-[#5C2A73] hover:border-[#E86A33] hover:bg-[#E86A33] hover:text-white"
        }`}
      >
        <ChevronDown size={20} />
      </button>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes sectionNavBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(5px); }
            }
            .section-nav-bounce { animation: sectionNavBounce 2s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) {
              .section-nav-bounce { animation: none; }
            }
          `,
        }}
      />
    </div>
  );
}
