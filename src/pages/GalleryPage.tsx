import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GuestlistForm from "@/components/GuestlistForm";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";
import img12 from "@/assets/12.jpg";
import img13 from "@/assets/13.jpg";
import img14 from "@/assets/14.jpg";
import img15 from "@/assets/15.jpg";
import img16 from "@/assets/16.jpg";
import img17 from "@/assets/17.jpg";
import img18 from "@/assets/18.jpg";
import img19 from "@/assets/19.jpg";
import img20 from "@/assets/20.jpg";
import img21 from "@/assets/21.jpg";
import img22 from "@/assets/22.jpg";
import img23 from "@/assets/23.jpg";
import img24 from "@/assets/24.jpg";
import img25 from "@/assets/25.jpg";
import img26 from "@/assets/26.jpg";
import img27 from "@/assets/27.jpg";
import img28 from "@/assets/28.jpg";
import img29 from "@/assets/29.jpg";
import img30 from "@/assets/30.jpg";
import img31 from "@/assets/31.jpg";
import img32 from "@/assets/32.jpg";
import img33 from "@/assets/33.jpg";
import img34 from "@/assets/34.jpg";
import img35 from "@/assets/35.jpg";
import img36 from "@/assets/36.jpg";
import img38 from "@/assets/38.jpg";
import img40 from "@/assets/40.jpg";
import img41 from "@/assets/41.jpg";
import vid1 from "@/assets/1.mp4";
import vid2 from "@/assets/2.mp4";
import vid3 from "@/assets/3.mp4";
import vid4 from "@/assets/4.mp4";
import vid5 from "@/assets/5.mp4";
import vid6 from "@/assets/6.mp4";
import vid7 from "@/assets/7.mp4";
import vid8 from "@/assets/8.mp4";
import vid9 from "@/assets/9.mp4";
import vid10 from "@/assets/10.mp4";
import vid11 from "@/assets/11.mp4";
import vid19 from "@/assets/19.mp4";
import vid20 from "@/assets/20.mp4";
import vid21 from "@/assets/21.mp4";
import vid22 from "@/assets/22.mp4";
import vid23 from "@/assets/23.mp4";
import webp1 from "@/assets/1.webp";
import webp2 from "@/assets/2.webp";
import img14png from "@/assets/14.png";
import img1png from "@/assets/1.png";
import img2png from "@/assets/2.png";
import img39png from "@/assets/39.png";

/* All 45 image assets: 11 + 11 + 11 + 12 per carousel (Gallery IV includes 1.png, 2.png, 39.png) */
const ALL_IMAGES = [
  { id: 1, label: "Gallery", image: img1 },
  { id: 2, label: "Gallery", image: img2 },
  { id: 3, label: "Gallery", image: img3 },
  { id: 4, label: "Gallery", image: img4 },
  { id: 5, label: "Gallery", image: img5 },
  { id: 6, label: "Gallery", image: img6 },
  { id: 7, label: "Gallery", image: img7 },
  { id: 8, label: "Gallery", image: img8 },
  { id: 9, label: "Gallery", image: img9 },
  { id: 10, label: "Gallery", image: img10 },
  { id: 11, label: "Gallery", image: img11 },
  { id: 12, label: "Gallery", image: img12 },
  { id: 13, label: "Gallery", image: img13 },
  { id: 14, label: "Gallery", image: img14 },
  { id: 15, label: "Gallery", image: img15 },
  { id: 16, label: "Gallery", image: img16 },
  { id: 17, label: "Gallery", image: img17 },
  { id: 18, label: "Gallery", image: img18 },
  { id: 19, label: "Gallery", image: img19 },
  { id: 20, label: "Gallery", image: img20 },
  { id: 21, label: "Gallery", image: img21 },
  { id: 22, label: "Gallery", image: img22 },
  { id: 23, label: "Gallery", image: img23 },
  { id: 24, label: "Gallery", image: img24 },
  { id: 25, label: "Gallery", image: img25 },
  { id: 26, label: "Gallery", image: img26 },
  { id: 27, label: "Gallery", image: img27 },
  { id: 28, label: "Gallery", image: img28 },
  { id: 29, label: "Gallery", image: img29 },
  { id: 30, label: "Gallery", image: img30 },
  { id: 31, label: "Gallery", image: img31 },
  { id: 32, label: "Gallery", image: img32 },
  { id: 33, label: "Gallery", image: img33 },
  { id: 34, label: "Gallery", image: img34 },
  { id: 35, label: "Gallery", image: img35 },
  { id: 36, label: "Gallery", image: img36 },
  { id: 37, label: "Gallery", image: img38 },
  { id: 38, label: "Gallery", image: img40 },
  { id: 39, label: "Gallery", image: img41 },
  { id: 40, label: "Gallery", image: webp1 },
  { id: 41, label: "Gallery", image: webp2 },
  { id: 42, label: "Gallery", image: img14png },
  { id: 43, label: "Gallery", image: img1png },
  { id: 44, label: "Gallery", image: img2png },
  { id: 45, label: "Gallery", image: img39png },
];

/* 11 images per carousel for first 3, 12 for Gallery IV (45 total) */
const CAROUSEL_1_ITEMS = ALL_IMAGES.slice(0, 11).map((item, i) => ({ ...item, slotIndex: i }));
const CAROUSEL_2_ITEMS = ALL_IMAGES.slice(11, 22).map((item, i) => ({ ...item, slotIndex: i }));
const CAROUSEL_3_ITEMS = ALL_IMAGES.slice(22, 33).map((item, i) => ({ ...item, slotIndex: i }));
const CAROUSEL_4_ITEMS = ALL_IMAGES.slice(33, 45).map((item, i) => ({ ...item, slotIndex: i }));

/* All 15 videos in one carousel (last, centered) */
const VIDEO_ITEMS = [
  { id: 1, label: "Video 1", video: vid1, poster: img1, slotIndex: 0 },
  { id: 2, label: "Video 2", video: vid2, poster: img2, slotIndex: 1 },
  { id: 3, label: "Video 3", video: vid3, poster: img3, slotIndex: 2 },
  { id: 4, label: "Video 4", video: vid4, poster: img4, slotIndex: 3 },
  { id: 5, label: "Video 5", video: vid5, poster: img5, slotIndex: 4 },
  { id: 6, label: "Video 6", video: vid6, poster: img6, slotIndex: 5 },
  { id: 7, label: "Video 7", video: vid7, poster: img7, slotIndex: 6 },
  { id: 8, label: "Video 8", video: vid8, poster: img8, slotIndex: 7 },
  { id: 9, label: "Video 9", video: vid9, poster: img9, slotIndex: 8 },
  { id: 10, label: "Video 10", video: vid10, poster: img10, slotIndex: 9 },
  { id: 11, label: "Video 11", video: vid11, poster: img11, slotIndex: 10 },
  { id: 12, label: "Video 19", video: vid19, poster: img19, slotIndex: 11 },
  { id: 13, label: "Video 20", video: vid20, poster: img20, slotIndex: 12 },
  { id: 14, label: "Video 21", video: vid21, poster: img21, slotIndex: 13 },
  { id: 15, label: "Video 22", video: vid22, poster: img22, slotIndex: 14 },
  { id: 16, label: "Video 23", video: vid23, poster: img23, slotIndex: 15 },
].map((item, i) => ({ ...item, slotIndex: i }));

const IMAGE_CAROUSELS = [
  { id: 0, title: "Gallery I", items: CAROUSEL_1_ITEMS, isVideo: false },
  { id: 1, title: "Gallery II", items: CAROUSEL_2_ITEMS, isVideo: false },
  { id: 2, title: "Gallery III", items: CAROUSEL_3_ITEMS, isVideo: false },
  { id: 3, title: "Gallery IV", items: CAROUSEL_4_ITEMS, isVideo: false },
] as const;

const VIDEO_CAROUSEL = { id: 4, title: "Videos", items: VIDEO_ITEMS, isVideo: true } as const;

const CAROUSELS = [...IMAGE_CAROUSELS, VIDEO_CAROUSEL];

const RADIUS_COMPACT = 180;

type LightboxState = { carouselId: number; index: number } | null;

const GalleryPage = () => {
  const [rotations, setRotations] = useState([0, 0, 0, 0, 0]);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [guestlistOpen, setGuestlistOpen] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const dragStart = useRef({ x: 0, carouselId: 0, rotation: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = dragging !== null;
  }, [dragging]);

  const rotate = useCallback((carouselId: number, delta: number) => {
    setRotations((r) => {
      const next = [...r];
      next[carouselId] = next[carouselId] + delta;
      return next;
    });
  }, []);

  const handleDragStart = (carouselId: number, clientX: number) => {
    setDragging(carouselId);
    dragStart.current = { x: clientX, carouselId, rotation: rotations[carouselId] };
  };

  const handleDragMove = (clientX: number) => {
    if (dragging === null) return;
    const { carouselId, rotation } = dragStart.current;
    const dx = clientX - dragStart.current.x;
    dragStart.current.x = clientX;
    setRotations((r) => {
      const next = [...r];
      next[carouselId] = rotation + dx * 0.5;
      return next;
    });
  };

  const handleDragEnd = () => setDragging(null);

  useEffect(() => {
    if (dragging === null) return;
    const onMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [dragging, rotations]);

  const onPointerDown = (carouselId: number) => (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if ("button" in e && e.button !== 0) return;
    handleDragStart(carouselId, clientX);
  };
  const onPointerMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };
  const onPointerUp = () => handleDragEnd();

  useEffect(() => {
    if (lightbox === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const items = CAROUSELS[lightbox.carouselId].items;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((prev) =>
          prev ? { ...prev, index: prev.index === 0 ? items.length - 1 : prev.index - 1 } : null
        );
      if (e.key === "ArrowRight")
        setLightbox((prev) =>
          prev ? { ...prev, index: prev.index === items.length - 1 ? 0 : prev.index + 1 } : null
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const openLightbox = (carouselId: number, index: number) => {
    if (dragging !== null) return;
    setLightbox({ carouselId, index });
  };

  return (
    <main className="min-h-screen bg-background">
      <Link
        to="/"
        className="fixed top-4 left-3 sm:top-6 sm:left-6 z-50 flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group animate-gallery-fade-in touch-manipulation py-2 pr-2"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform duration-300 shrink-0" />
        <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Back to home</span>
      </Link>

      <section className="relative min-h-screen py-8 sm:py-12 md:py-20 pb-16 sm:pb-20 md:pb-28 overflow-x-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40 pointer-events-none" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pt-8 sm:pt-10 md:pt-12">
          <div className="text-center mb-6 sm:mb-10 md:mb-14">
            <p className="text-primary tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-3">The Gallery</p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight px-2">
              Capturing the <span className="italic text-primary">Vibe</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm max-w-md mx-auto px-2">
              Four image collections · One video carousel · Drag or swipe · Tap to view
            </p>
            
          </div>

          {/* 4 image carousels: 11 + 11 + 11 + 9 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            {IMAGE_CAROUSELS.map((carousel) => (
              <div key={carousel.id} className="rounded-lg border border-border/50 bg-background/5 p-3 sm:p-4 md:p-6 min-w-0">
                <h2 className="text-center font-serif text-base sm:text-lg md:text-xl text-primary mb-3 sm:mb-4 tracking-wider">
                  {carousel.title}
                </h2>
                <div
                  className={`gallery-3d-stage-compact touch-none select-none ${dragging === carousel.id ? "cursor-grabbing" : "cursor-grab"}`}
                  onMouseDown={(e) => e.button === 0 && handleDragStart(carousel.id, e.clientX)}
                  onTouchStart={onPointerDown(carousel.id)}
                  onTouchMove={onPointerMove}
                  onTouchEnd={onPointerUp}
                  onTouchCancel={onPointerUp}
                >
                  <div
                    className="gallery-3d-ring-compact"
                    style={{ transform: `rotateY(${-rotations[carousel.id]}deg)` }}
                  >
                    {carousel.items.map((item: { id: number; label: string; slotIndex: number; image?: string; video?: string; poster?: string }, i: number) => {
                      const degPerItem = 360 / carousel.items.length;
                      const angle = i * degPerItem;
                      return (
                        <div
                          key={`${carousel.id}-${item.slotIndex}`}
                          className="gallery-3d-item-compact"
                          style={{
                            transform: `rotateY(${angle}deg) translateZ(${RADIUS_COMPACT}px)`,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => openLightbox(carousel.id, i)}
                            className="gallery-3d-card group w-full h-full"
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
                                <span className="font-serif italic text-cream text-xs tracking-wider">
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
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <button
                    type="button"
                    onClick={() => rotate(carousel.id, 360 / carousel.items.length)}
                    className="gallery-nav-btn w-9 h-9 sm:w-10 sm:h-10 touch-manipulation"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => rotate(carousel.id, -360 / carousel.items.length)}
                    className="gallery-nav-btn w-9 h-9 sm:w-10 sm:h-10 touch-manipulation"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Video carousel: last, centered */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <div className="w-full max-w-2xl rounded-lg border border-border/50 bg-background/5 p-3 sm:p-4 md:p-6">
              <h2 className="text-center font-serif text-base sm:text-lg md:text-xl text-primary mb-3 sm:mb-4 tracking-wider">
                {VIDEO_CAROUSEL.title}
              </h2>
              <div
                className={`gallery-3d-stage-compact touch-none select-none ${dragging === VIDEO_CAROUSEL.id ? "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={(e) => e.button === 0 && handleDragStart(VIDEO_CAROUSEL.id, e.clientX)}
                onTouchStart={onPointerDown(VIDEO_CAROUSEL.id)}
                onTouchMove={onPointerMove}
                onTouchEnd={onPointerUp}
                onTouchCancel={onPointerUp}
              >
                <div
                  className="gallery-3d-ring-compact"
                  style={{ transform: `rotateY(${-rotations[VIDEO_CAROUSEL.id]}deg)` }}
                >
                  {VIDEO_CAROUSEL.items.map((item: { id: number; label: string; slotIndex: number; video?: string; poster?: string }, i: number) => {
                    const degPerItem = 360 / VIDEO_CAROUSEL.items.length;
                    const angle = i * degPerItem;
                    return (
                      <div
                        key={`${VIDEO_CAROUSEL.id}-${item.slotIndex}`}
                        className="gallery-3d-item-compact"
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(${RADIUS_COMPACT}px)`,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(VIDEO_CAROUSEL.id, i)}
                          className="gallery-3d-card group w-full h-full"
                        >
                          <div className="gallery-3d-card-inner">
                            <img
                              src={item.poster}
                              alt={item.label}
                              className="gallery-3d-img object-cover"
                              draggable={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-12 h-12 rounded-full border-2 border-primary/80 flex items-center justify-center text-primary">
                                <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-primary ml-1" />
                              </div>
                            </div>
                            <div className="gallery-3d-frame" />
                            <div className="gallery-3d-overlay">
                              <span className="font-serif italic text-cream text-xs tracking-wider">
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
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button
                  type="button"
                  onClick={() => rotate(VIDEO_CAROUSEL.id, 360 / VIDEO_CAROUSEL.items.length)}
                  className="gallery-nav-btn w-9 h-9 sm:w-10 sm:h-10 touch-manipulation"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => rotate(VIDEO_CAROUSEL.id, -360 / VIDEO_CAROUSEL.items.length)}
                  className="gallery-nav-btn w-9 h-9 sm:w-10 sm:h-10 touch-manipulation"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center px-2">
              <Button
                onClick={() => setGuestlistOpen(true)}
                className="gallery-join-cta bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/40 hover:border-primary/70 tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-sm shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 touch-manipulation"
              >
                Join now
              </Button>
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

      {lightbox !== null && (() => {
        const { carouselId, index } = lightbox;
        const carousel = CAROUSELS[carouselId];
        const item = carousel.items[index];
        const isVideo = "video" in item && !!item.video;
        const len = carousel.items.length;
        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-gallery-fade-in"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={isVideo ? "Video lightbox" : "Image lightbox"}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-cream/90 hover:text-white transition-colors z-10 touch-manipulation"
              aria-label="Close"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox({ carouselId, index: index === 0 ? len - 1 : index - 1 });
              }}
              className="absolute left-1 sm:left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/50 bg-background/80 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox({ carouselId, index: index === len - 1 ? 0 : index + 1 });
              }}
              className="absolute right-1 sm:right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/50 bg-background/80 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <div
              className="relative max-w-5xl max-h-[80vh] sm:max-h-[85vh] w-full mx-12 sm:mx-14 md:mx-20 px-1"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo && "video" in item ? (
                <video
                  key={item.video}
                  src={item.video}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] sm:max-h-[85vh] w-auto max-w-full mx-auto rounded-sm shadow-2xl ring-1 ring-primary/30"
                />
              ) : (
                <img
                  src={(item as { image?: string }).image ?? ""}
                  alt={item.label}
                  className="max-h-[75vh] sm:max-h-[85vh] w-auto max-w-full object-contain mx-auto rounded-sm shadow-2xl ring-1 ring-primary/30"
                />
              )}
              <p className="text-center text-cream/90 font-serif italic mt-3 sm:mt-4 text-base sm:text-lg px-2">{item.label}</p>
              <p className="text-center text-muted-foreground text-xs sm:text-sm mt-1">
                {index + 1} / {len}
              </p>
            </div>
            
          </div>
        );
      })()}
    </main>
  );
};

export default GalleryPage;
