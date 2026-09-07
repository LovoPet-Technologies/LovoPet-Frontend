// pages/HomePage.jsx
import Hero from "../components/homepage/Hero";
import Services from "../components/homepage/Services";
import ShopPreview from "../components/homepage/ShopPreview";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";

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
    </>
  );
}

export default HomePage;
