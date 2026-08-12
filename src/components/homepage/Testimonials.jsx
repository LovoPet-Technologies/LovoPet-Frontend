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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild.clientWidth;
      const gap = 20;
      const scrollAmount =
        direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="overflow-hidden bg-[#FDF8F2] py-5 lg:py-5 xl:py-5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-14 xl:max-w-7xl xl:px-16">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center xl:max-w-3xl">
          <span className="rounded-full bg-[#5C2A73]/10 px-3.5 py-1.5 text-xs font-semibold text-[#5C2A73] lg:text-sm">
            TESTIMONIALS
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#5C2A73] lg:text-4xl xl:text-5xl">
            What Pet Parents
            <br />
            Say About LovoPet
          </h2>

          <p className="mt-2 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
            Hear from pet owners who have experienced convenient, reliable, and
            compassionate care through LovoPet.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative mt-5 lg:mt-5">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C2A73] shadow-md ring-1 ring-[#1E2A4A]/10 transition-all hover:scale-110 hover:bg-[#5C2A73] hover:text-white md:flex md:-left-4 lg:-left-6 lg:h-11 lg:w-11 xl:-left-8"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollContainerRef}
            className="hide-scrollbar flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[85vw] shrink-0 snap-center rounded-2xl border border-[#E5D8C9] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] lg:p-6 xl:p-7"
              >
                <Quote size={28} className="text-[#E86A33]" />

                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#E86A33] text-[#E86A33]"
                    />
                  ))}
                </div>

                <p className="mt-4 text-[15px] leading-6 text-gray-600 lg:leading-7">
                  "{testimonial.review}"
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5C2A73]/10 text-base font-bold text-[#5C2A73] lg:h-12 lg:w-12 lg:text-lg">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#5C2A73] lg:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500 lg:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#5C2A73] shadow-md ring-1 ring-[#1E2A4A]/10 transition-all hover:scale-110 hover:bg-[#5C2A73] hover:text-white md:flex md:-right-4 lg:-right-6 lg:h-11 lg:w-11 xl:-right-8"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-4 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`,
        }}
      />
    </section>
  );
}

export default Testimonials;
