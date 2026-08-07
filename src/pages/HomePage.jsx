import Hero from "../components/homepage/Hero";
import Services from "../components/homepage/Services";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import CTASection from "../components/homepage/CTASection";
import Footer from "../components/homepage/Footer";

function HomePage() {
  return (
    <>
      <main className="bg-[#FDF8F2]">
        <Hero />

        <Services />

        <WhyChooseUs />

        <HowItWorks />

        <Testimonials />

        <CTASection />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
