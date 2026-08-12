import Hero from "../components/homepage/Hero";
import Services from "../components/homepage/Services";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import Footer from "../components/homepage/Footer";

function HomePage() {
  return (
    <>
      <main className="bg-[#FDF8F2]">
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="scroll-mt-16">
          <Services />
        </section>

        <section id="why-choose-us" className="scroll-mt-16">
          <WhyChooseUs />
        </section>

        <section id="how-it-works" className="scroll-mt-16">
          <HowItWorks />
        </section>

        <section id="testimonials" className="scroll-mt-16">
          <Testimonials />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
