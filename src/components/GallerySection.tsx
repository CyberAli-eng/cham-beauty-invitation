import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";

const galleryItems = [
  { id: 1, aspect: "aspect-[3/4]", label: "Gallery", image: img1 },
  { id: 2, aspect: "aspect-square", label: "Gallery", image: img2 },
  { id: 3, aspect: "aspect-[4/3]", label: "Gallery", image: img3 },
  { id: 4, aspect: "aspect-[4/3]", label: "Gallery", image: img4 },
  { id: 5, aspect: "aspect-square", label: "Gallery", image: img5 },
  // { id: 6, aspect: "aspect-[3/4]", label: "Gallery", image: img6 },
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

        {/* Masonry Grid + See more card */}
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
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-cream font-serif italic text-lg tracking-wider bg-background/60 px-4 py-2 backdrop-blur-sm">
                    {item.label}
                  </p>
                </div>
                <div className="absolute inset-2 border border-primary/0 transition-all duration-500 group-hover:border-primary/50 rounded-sm" />
              </div>
            </div>
          ))}
          {/* See more card - links to dedicated Gallery page */}
          <div
            className={`break-inside-avoid mb-4 md:mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: `${galleryItems.length * 100}ms` }}
          >
            <Link
              to="/gallery"
              className="aspect-[3/4] relative flex flex-col items-center justify-center rounded-sm overflow-hidden group border border-primary/30 bg-secondary/50 hover:bg-secondary/70 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              <ArrowRight className="w-12 h-12 text-primary mb-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="font-serif italic text-primary text-lg md:text-xl tracking-wider relative z-10">
                See more
              </span>
              <span className="text-muted-foreground text-sm mt-2 relative z-10">
                Full gallery
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
