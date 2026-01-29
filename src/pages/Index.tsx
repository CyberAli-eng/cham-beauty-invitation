import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import ConceptSection from "@/components/ConceptSection";
import GallerySection from "@/components/GallerySection";
import GuestlistForm from "@/components/GuestlistForm";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#guestlist") {
      document.getElementById("guestlist")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <JourneySection />
      <ConceptSection />
      <GallerySection />
      <GuestlistForm />
      <Footer />
    </main>
  );
};

export default Index;
