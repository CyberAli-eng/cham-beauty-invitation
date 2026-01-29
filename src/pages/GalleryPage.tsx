import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GuestlistForm from "@/components/GuestlistForm";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const SOURCE_ITEMS = [
  { id: 1, label: "Exclusive Launch", image: gallery1 },
  { id: 2, label: "Creator Meetup", image: gallery2 },
  { id: 3, label: "VIP Lounge", image: gallery3 },
  { id: 4, label: "Networking Night", image: gallery4 },
  { id: 5, label: "Brand Showcase", image: gallery5 },
  { id: 6, label: "Fashion Forward", image: gallery6 },
];

const TOTAL_SLOTS = 20;
const galleryItems = Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
  ...SOURCE_ITEMS[i % SOURCE_ITEMS.length],
  slotIndex: i,
}));

const GALLERY_RADIUS = 320;
const DEG_PER_ITEM = 360 / TOTAL_SLOTS;

const GalleryPage = () => {
  const [rotation, setRotation] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [guestlistOpen, setGuestlistOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, rotation: 0 });
  const isDraggingRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const rotate = useCallback((delta: number) => {
    setRotation((r) => r + delta);
  }, []);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, rotation };
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.current.x;
    dragStart.current.x = clientX;
    setRotation((r) => r + dx * 0.5);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onUp = () => handleDragEnd();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, rotation]);

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if ("button" in e && e.button !== 0) return;
    handleDragStart(clientX);
  };
  const onPointerMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    handleDragMove(e.touches[0].clientX);
  };
  const onPointerUp = () => handleDragEnd();

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === galleryItems.length - 1 ? 0 : i + 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen bg-background">
      {/* Back to home – top left */}
      <Link
        to="/"
        className="fixed top-6 left-4 sm:left-6 z-50 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group animate-gallery-fade-in"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
        <span className="text-sm tracking-[0.2em] uppercase font-medium">Back to home</span>
      </Link>

      <section className="relative min-h-screen py-12 md:py-20 pb-20 md:pb-28 overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40 pointer-events-none" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary tracking-[0.35em] text-xs md:text-sm uppercase mb-3">
              The Gallery
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight">
              Capturing the <span className="italic text-primary">Vibe</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
              Drag to rotate · Click any image to view
            </p>
      

          <div className="gallery-3d-stage"
            onMouseDown={(e) => e.button === 0 && handleDragStart(e.clientX)}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
            onTouchCancel={onPointerUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              ref={carouselRef}
              className="gallery-3d-ring"
              style={{ transform: `rotateY(${-rotation}deg)` }}
            >
              {galleryItems.map((item, i) => {
                const angle = i * DEG_PER_ITEM;
                return (
                  <div
                    key={`${item.id}-${item.slotIndex}`}
                    className="gallery-3d-item"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${GALLERY_RADIUS}px)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!isDragging) setLightboxIndex(i);
                      }}
                      className="gallery-3d-card group"
                    >
                      <div className="gallery-3d-card-inner">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="gallery-3d-img"
                          draggable={false}
                        />
                        <div className="gallery-3d-frame" />
                        <div className="gallery-3d-overlay">
                          <span className="font-serif italic text-cream text-sm md:text-base tracking-wider">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              type="button"
              onClick={() => rotate(DEG_PER_ITEM)}
              className="gallery-nav-btn"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => rotate(-DEG_PER_ITEM)}
              className="gallery-nav-btn"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
              {/* Join now – primary CTA under title */}
              <div className="mt-8 md:mt-10 flex justify-center">
              <Button
                onClick={() => setGuestlistOpen(true)}
                className="gallery-join-cta bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/40 hover:border-primary/70 tracking-[0.25em] uppercase text-xs font-medium px-8 py-6 rounded-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Join now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={guestlistOpen} onOpenChange={setGuestlistOpen}>
        <DialogContent
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 gap-0 border-border bg-background"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <GuestlistForm embedded onSuccess={() => setGuestlistOpen(false)} />
        </DialogContent>
      </Dialog>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-gallery-fade-in"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 text-cream/90 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border border-primary/50 bg-background/80 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === galleryItems.length - 1 ? 0 : i + 1));
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border border-primary/50 bg-background/80 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-14 sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].image}
              alt={galleryItems[lightboxIndex].label}
              className="max-h-[85vh] w-auto object-contain mx-auto rounded-sm shadow-2xl ring-1 ring-primary/30"
            />
            <p className="text-center text-cream/90 font-serif italic mt-4 text-lg">
              {galleryItems[lightboxIndex].label}
            </p>
            <p className="text-center text-muted-foreground text-sm mt-1">
              {lightboxIndex + 1} / {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
