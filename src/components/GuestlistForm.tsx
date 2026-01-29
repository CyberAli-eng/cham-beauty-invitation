import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const niches = [
  "Fashion",
  "Beauty",
  "Tech",
  "Lifestyle",
  "Travel",
  "Food",
  "Fitness",
  "Entertainment",
  "Business",
  "Other",
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  instagram: z.string().trim().min(1, "Instagram handle is required").max(50),
  niche: z.string().min(1, "Please select your niche"),
  whatsapp: z.string().trim().min(10, "Valid WhatsApp number required").max(15),
});

const GuestlistForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    niche: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="guestlist"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">
            The Guestlist
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
            Join the <span className="italic text-primary">Elite Circle</span>
          </h2>
          <p className="text-muted-foreground">
            Limited spots available. Only selected creators receive an invite.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="glass rounded-lg p-8 md:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Instagram */}
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-foreground">
                    Instagram Handle
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="instagram"
                      placeholder="yourhandle"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                      className="pl-8 bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>
                  {errors.instagram && (
                    <p className="text-destructive text-sm">{errors.instagram}</p>
                  )}
                </div>

                {/* Niche */}
                <div className="space-y-2">
                  <Label htmlFor="niche" className="text-foreground">
                    Your Niche
                  </Label>
                  <Select
                    value={formData.niche}
                    onValueChange={(value) =>
                      setFormData({ ...formData, niche: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select your niche" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche.toLowerCase()}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.niche && (
                    <p className="text-destructive text-sm">{errors.niche}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-foreground">
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsapp"
                    placeholder="+91 9876543210"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.whatsapp && (
                    <p className="text-destructive text-sm">{errors.whatsapp}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base tracking-wider uppercase font-medium transition-all duration-300 hover:scale-[1.02]"
                >
                  Join the Elite Circle
                </Button>

                <p className="text-center text-muted-foreground text-sm">
                  By submitting, you agree to receive updates about our exclusive
                  events.
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-foreground">
                  You're on the List!
                </h3>
                <p className="text-muted-foreground mb-6">
                  We've received your application. If selected, you'll receive an
                  exclusive invite via WhatsApp.
                </p>
                <p className="text-primary font-serif italic">
                  "See you at the next soirée"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestlistForm;