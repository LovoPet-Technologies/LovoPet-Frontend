import { useState, useRef } from "react";
import { Quote, Star, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";

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
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);

  // We slice up to 4 items initially so the 4th item exists in the DOM for tablet mode
  // On pure mobile (scroll view), we'll just show all of them if the user swipes, but 
  // keeping the slice logic ensures the desktop/tablet grid remains perfect.
  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 4);

  // Helper for optional mobile scroll buttons (if you want arrows on mobile)
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#FDF8F2] py-24">
      <div className="mx-auto max-w-7xl px-6">
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

        {/* Cards Container */}
        {/* 
            MOBILE: flex, overflow-x-auto, snap-x for smooth scrolling. 
            TABLET/DESKTOP: switches back to grid. 
        */}
        <div className="relative mt-16">
          <div 
            ref={scrollContainerRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 md:grid md:gap-8 md:overflow-visible md:pb-0 md:grid-cols-2 xl:grid-cols-3 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* On mobile, we map over ALL testimonials so they can scroll through them. 
                On md+ screens, we map over visibleTestimonials based on the Show More button. */}
            {(typeof window !== 'undefined' && window.innerWidth < 768 ? testimonials : visibleTestimonials).map((testimonial, index) => (
              <div
                key={testimonial.id}
                // Mobile: w-[85vw] forces the cards to be almost full width but lets the next one peek out. snap-center locks it in.
                // Tablet/Desktop: w-auto clears the fixed width and grid takes over.
                className={`w-[85vw] shrink-0 snap-center rounded-3xl border border-[#E5D8C9] bg-white p-8 shadow-sm transition-all duration-300 md:w-auto md:shrink md:hover:-translate-y-2 md:hover:shadow-xl ${
                  !showAll && index === 3 ? "hidden md:block xl:hidden" : ""
                }`}
              >
                {/* Quote */}
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

                {/* Review */}
                <p className="mt-6 leading-8 text-gray-600">
                  "{testimonial.review}"
                </p>

                {/* User */}
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

          {/* Optional Mobile Scroll Arrows (Hidden on md+) */}
          <div className="mt-4 flex justify-center gap-4 md:hidden">
             <button 
                onClick={() => scroll("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
             </button>
             <button 
                onClick={() => scroll("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5C2A73]/10 text-[#5C2A73] transition-colors hover:bg-[#5C2A73]/20"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* Toggle button (Hidden on pure mobile because they can just scroll through them all) */}
        <div className="mt-14 hidden justify-center md:flex">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2 rounded-full bg-[#5C2A73] px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A2260] hover:shadow-lg"
          >
            {showAll ? "Show Less" : "Show More Reviews"}
            {showAll ? (
              <ChevronUp
                size={20}
                className="transition-transform duration-300"
              />
            ) : (
              <ChevronDown
                size={20}
                className="transition-transform duration-300"
              />
            )}
          </button>
        </div>
      </div>
      
      {/* CSS to hide the scrollbar specifically for webkit browsers on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

export default Testimonials;