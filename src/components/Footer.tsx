import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <p className="text-primary tracking-[0.4em] text-sm uppercase">
            Cham Events
          </p>

          {/* Tagline */}
          <blockquote className="max-w-md">
            <p className="text-xl md:text-2xl font-serif italic text-foreground">
              "Resilience is the best accessory you can wear."
            </p>
          </blockquote>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Follow us on Instagram"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-full transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
                <Instagram className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Connect on LinkedIn"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-full transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
                <Linkedin className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50 w-full">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Cham Events. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
