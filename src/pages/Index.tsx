import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import ConceptSection from "@/components/ConceptSection";
import GallerySection from "@/components/GallerySection";
import GuestlistForm from "@/components/GuestlistForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
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
