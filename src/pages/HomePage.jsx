// pages/HomePage.jsx
import Hero from "../components/homepage/Hero";
import Services from "../components/homepage/Services";
import ShopPreview from "../components/homepage/ShopPreview";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";
import Footer from "../components/homepage/Footer";

function HomePage() {
  return (
    <>
      <main className="bg-[#FDF8F2]">
        <Hero />
        <Services />
        <ShopPreview />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
      </main>
      <section id="contact" className="scroll-mt-16">
        <Footer />
      </section>
    </>
  );
}

export default HomePage;
