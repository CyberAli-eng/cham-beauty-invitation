import { useEffect, useRef, useState } from "react";
import { Users, Camera, Sparkles } from "lucide-react";

const concepts = [
  {
    icon: Users,
    title: "Exclusive Networking",
    description:
      "Connect with top tier creators, brands, and industry leaders in an intimate setting curated for meaningful collaborations.",
  },
  {
    icon: Camera,
    title: "Content-Ready Zones",
    description:
      "Every corner is designed with aesthetics in mind, perfect backdrops crafted for viral reels and stunning content creation.",
  },
  {
    icon: Sparkles,
    title: "Zero Cost",
    description:
      "VIP access without the price tag. Our events are completely free for selected creators, because talent shouldn't pay to shine.",
  },
];

const ConceptSection = () => {
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
      id="concept"
      className="py-24 md:py-32 px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">
            The Concept
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            What Makes Us <span className="italic text-primary">Different</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {concepts.map((concept, index) => (
            <div
              key={concept.title}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative p-8 md:p-10 bg-card border border-border rounded-sm transition-all duration-500 hover:border-primary/50 hover:bg-secondary/50">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-primary/30 rounded-full transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
                    <concept.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-serif mb-4 text-foreground">
                  {concept.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {concept.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/20 rounded-tr-sm transition-all duration-300 group-hover:border-primary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
