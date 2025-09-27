import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import DomainsRoles from "@/components/home/DomainsRoles";
import TemplateCarousel from "@/components/home/TemplateCarousel";
import AIFeatures from "@/components/home/AIFeatures";
import SuperResumes from "@/components/home/SuperResumes";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <DomainsRoles />
        <TemplateCarousel />
        <AIFeatures />
        <SuperResumes />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
