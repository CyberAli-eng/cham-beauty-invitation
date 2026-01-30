import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToGuestlist = () => {
    if (location.pathname === "/") {
      document.getElementById("guestlist")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#guestlist";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || location.pathname !== "/"
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="text-primary tracking-[0.25em] text-sm font-medium uppercase hover:opacity-80 transition-opacity"
        >
          {/* Cham Events */}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "tracking-wider uppercase text-xs font-medium",
              location.pathname === "/gallery"
                ? "text-primary bg-primary/10"
                : "text-foreground hover:text-primary hover:bg-primary/10"
            )}
            asChild
          >
            <Link to="/gallery">Gallery</Link>
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs font-medium"
            onClick={scrollToGuestlist}
          >
            Request Invite
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
