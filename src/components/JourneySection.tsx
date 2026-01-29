import { useEffect, useRef, useState } from "react";

const JourneySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">
                The Journey
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                From Runway to
                <br />
                <span className="italic text-primary">Revolution</span>
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                In 2010, Cham Thai graced the runways of Assam, a young model with 
                dreams as vast as the Brahmaputra. The fashion world was her first 
                canvas, but destiny had grander plans.
              </p>
              <p>
                Moving to Delhi marked a transformation — from walking the ramp to 
                building empires. As a fashion entrepreneur, Cham discovered that 
                true luxury isn't just about what you wear, but the connections 
                you cultivate.
              </p>
              <p className="text-foreground font-medium">
                Today, Cham Events is the manifestation of that vision — creating 
                spaces where creators don't just network, they{" "}
                <span className="text-primary italic">thrive</span>.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-primary pl-6 py-2">
              <p className="text-xl font-serif italic text-foreground">
                "Resilience and Adaptation"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — The Cham Philosophy
              </p>
            </blockquote>
          </div>

          {/* Founder Image */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <img 
                src="/cham-thai.png"
                alt="Cham Thai - Founder & Visionary" 
                className="w-full h-full object-cover object-top"
              />
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-primary/30 rounded-sm pointer-events-none" />

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
              
              {/* Caption */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-primary tracking-[0.3em] text-xs uppercase">
                  Cham Thai
                </p>
                <p className="text-cream/80 text-sm mt-1 font-serif italic">
                  Founder & Visionary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
