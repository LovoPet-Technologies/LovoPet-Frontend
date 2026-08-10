import { useState } from "react";
import { Quote, Star, ChevronDown, ChevronUp } from "lucide-react";

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

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

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

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-3xl border border-[#E5D8C9] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote */}
              <Quote size={36} className="text-[#E86A33]" />

              {/* Stars */}
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
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
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5C2A73]/10 text-xl font-bold text-[#5C2A73]">
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

        {/* Toggle button */}
        <div className="mt-14 flex justify-center">
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
    </section>
  );
}

export default Testimonials;
