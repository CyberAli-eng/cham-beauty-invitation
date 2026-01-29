import { useEffect, useRef, useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryItems = [
  { id: 1, aspect: "aspect-[3/4]", label: "Exclusive Launch", image: gallery1 },
  { id: 2, aspect: "aspect-square", label: "Creator Meetup", image: gallery2 },
  { id: 3, aspect: "aspect-[4/3]", label: "VIP Lounge", image: gallery3 },
  { id: 4, aspect: "aspect-[4/3]", label: "Networking Night", image: gallery4 },
  { id: 5, aspect: "aspect-square", label: "Brand Showcase", image: gallery5 },
  { id: 6, aspect: "aspect-[3/4]", label: "Fashion Forward", image: gallery6 },
];

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 md:py-32 px-6 relative bg-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">
            The Gallery
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            Capturing the <span className="italic text-primary">Vibe</span>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`break-inside-avoid mb-4 md:mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`${item.aspect} relative rounded-sm overflow-hidden group cursor-pointer`}
              >
                {/* Gallery Image */}
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/20" />

                {/* Label on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-cream font-serif italic text-lg tracking-wider bg-background/60 px-4 py-2 backdrop-blur-sm">
                    {item.label}
                  </p>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-2 border border-primary/0 transition-all duration-500 group-hover:border-primary/50 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;