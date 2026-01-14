import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LiveChat } from "@/components/LiveChat";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FloatingTechElements } from "@/components/FloatingTechElements";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingTechElements />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
