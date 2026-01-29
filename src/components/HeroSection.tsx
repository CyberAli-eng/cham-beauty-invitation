import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("guestlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-charcoal" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo/Brand */}
        <p className="text-primary tracking-[0.4em] text-sm md:text-base uppercase mb-8 animate-fade-up">
          Cham Events
        </p>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium leading-tight mb-6 animate-fade-up animation-delay-200">
          Turning Moments
          <br />
          <span className="italic text-primary">into Masterpieces</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light animate-fade-up animation-delay-400">
          Exclusive curated events for the creator community.
          <br className="hidden md:block" />
          <span className="text-foreground">Hosted by Cham Thai.</span>
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up animation-delay-600">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base tracking-wider uppercase font-medium transition-all duration-300 hover:scale-105"
          >
            Request Invite
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* Decorative border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
