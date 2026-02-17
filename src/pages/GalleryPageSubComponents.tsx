import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const GalleryHeader = () => (
    <div className="text-center mb-6 sm:mb-10 md:mb-14">
        <p className="text-primary tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-3">The Gallery</p>
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight px-2">
            Capturing the <span className="italic text-primary">Vibe</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm max-w-md mx-auto px-2">
            Four image collections · One video carousel · Drag or swipe · Tap to view
        </p>
    </div>
);

export const BackToHome = () => (
    <Link
        to="/"
        className="fixed top-4 left-3 sm:top-6 sm:left-6 z-50 flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group animate-gallery-fade-in touch-manipulation py-2 pr-2"
    >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform duration-300 shrink-0" />
        <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">Back to home</span>
    </Link>
);

interface CarouselItemProps {
    item: {
        id: number;
        label: string;
        image?: string;
        video?: string;
        poster?: string;
        slotIndex: number;
    };
    angle: number;
    radius: number;
    onOpen: () => void;
    isVideo: boolean;
}

export const CarouselItem = ({ item, angle, radius, onOpen, isVideo }: CarouselItemProps) => (
    <div
        className="gallery-3d-item-compact"
        style={{
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        }}
    >
        <button
            type="button"
            onClick={onOpen}
            className="gallery-3d-card group w-full h-full"
        >
            <div className="gallery-3d-card-inner">
                {isVideo ? (
                    <div className="w-full h-full relative">
                        <img
                            src={item.poster}
                            alt={item.label}
                            className="gallery-3d-img object-cover"
                            loading="lazy"
                            draggable={false}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-12 h-12 rounded-full border-2 border-primary/80 flex items-center justify-center text-primary">
                                <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-primary ml-1" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={item.image}
                        alt={item.label}
                        className="gallery-3d-img"
                        loading="lazy"
                        draggable={false}
                    />
                )}
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
