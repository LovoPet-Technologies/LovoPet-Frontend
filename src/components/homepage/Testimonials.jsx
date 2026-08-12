import { useRef } from "react";
import { Quote, Star, ChevronRight, ChevronLeft } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Pet Parent",
    review:
      "Booking a consultation was incredibly simple. The veterinarian answered all my concerns and gave excellent advice for my dog's recovery.",
  },
  {
    id: 2,
    name: "Michael Carter",
    role: "Cat Owner",
    review:
      "The platform is intuitive, and having veterinary guidance together with pet products makes caring for my cat much easier.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Animal Lover",
    review:
      "LovoPet provides a seamless experience. From AI guidance to connecting with professionals, everything feels thoughtfully designed.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Dog Owner",
    review:
      "Fast, reliable, and genuinely caring service. My puppy's vaccination schedule has never been easier to track and manage.",
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Pet Parent",
    review:
      "I love how the AI assistant flags potential issues early. It gave me real peace of mind before my vet visit confirmed everything.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Rabbit Owner",
    review:
      "Finding specialized care for an exotic pet used to be a nightmare. LovoPet connected me with the right vet in minutes.",
  },
];

function Testimonials() {
  const scrollContainerRef = useRef(null);

  // Calculates the exact width of a card + gap to slide perfectly
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild.clientWidth;
      const gap = 24; // 24px corresponds to gap-6 in Tailwind
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
      
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#FDF8F2] py-24">
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#5C2A73]/10 px-4 py-2 text-sm font-semibold text-[#5C2A73]">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-[#5C2A73] md:text-5xl">
            What Pet Parents
            <br />
            Say About LovoPet
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from pet owners who have experienced convenient, reliable, and
            compassionate care through LovoPet.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative mt-16">
          {/* Desktop Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C2A73] shadow-md ring-1 ring-[#1E2A4A]/10 transition-all hover:scale-110 hover:bg-[#5C2A73] hover:text-white md:flex xl:-left-12"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                // Mobile: 85vw width | Tablet: 2 visible | Desktop: 3 visible
                className="w-[85vw] shrink-0 snap-center rounded-3xl border border-[#E5D8C9] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {/* Quote Icon */}
                <Quote size={36} className="text-[#E86A33]" />

                {/* Stars */}
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#E86A33] text-[#E86A33]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="mt-6 leading-8 text-gray-600">
                  "{testimonial.review}"
                </p>

                {/* User Info */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5C2A73]/10 text-xl font-bold text-[#5C2A73]">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-bold text-[#5C2A73]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C2A73] shadow-md ring-1 ring-[#1E2A4A]/10 transition-all hover:scale-110 hover:bg-[#5C2A73] hover:text-white md:flex xl:-right-12"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Arrows (Visible only on smaller screens) */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* CSS to hide the scrollbar across all browsers */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />
    </section>
  );
}

export default Testimonials;