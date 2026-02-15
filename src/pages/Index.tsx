import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingSection } from "@/components/BookingSection";
import { LiveChat } from "@/components/LiveChat";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FloatingTechElements } from "@/components/FloatingTechElements";
import { BackToTop } from "@/components/BackToTop";
import { CookieConsent } from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingTechElements />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TechStackSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BookingSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <LiveChat />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};

export default Index;
