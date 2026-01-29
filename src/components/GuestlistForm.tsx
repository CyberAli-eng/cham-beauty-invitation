import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  instagramHandles: z.string().trim().min(1, "Instagram handle(s) required").max(200),
  instagramFollowers: z
    .string()
    .trim()
    .min(1, "Instagram followers count is required")
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, "Enter a valid number"),
  snapchatHandle: z.string().trim().min(1, "Snapchat handle is required").max(50),
  youtubeChannel: z.string().trim().max(100),
  residenceAddress: z
    .string()
    .trim()
    .min(10, "Please enter your complete residence address (at least 10 characters)")
    .max(500),
  niche: z.string().min(1, "Please select your niche"),
  whatsapp: z.string().trim().min(10, "Valid WhatsApp number required").max(15),
  comfortableSpeakingOnCamera: z
    .boolean()
    .refine((val) => val === true, "Please confirm you are comfortable speaking on camera"),
  okayWithRoamingQuestion: z
    .boolean()
    .refine((val) => val === true, "Please confirm you are okay with roaming questions"),
});

const GuestlistForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    instagramHandles: "",
    instagramFollowers: "",
    snapchatHandle: "",
    youtubeChannel: "",
    residenceAddress: "",
    niche: "",
    whatsapp: "",
    comfortableSpeakingOnCamera: false,
    okayWithRoamingQuestion: false,
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

        {/* What we expect from you */}
        <div
          className={`mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="rounded-lg border border-border bg-secondary/20 p-6 md:p-8">
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
              What we expect from you
            </h3>
            <p className="text-muted-foreground text-sm mb-5">
              If selected, you’ll be asked to contribute the following:
            </p>
            <ol className="space-y-3 text-foreground text-sm md:text-base list-decimal list-inside">
              <li>At least one short video Q&A</li>
              <li>3–4 Snapchat posts</li>
              <li>2–3 Instagram stories</li>
              <li>Tag to Cham’s personal accounts</li>
              <li>Tag to Velomora</li>
              <li>Tag to cham.beauty</li>
            </ol>
          </div>
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
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm">{errors.fullName}</p>
                  )}
                </div>

                {/* Instagram Handle(s) */}
                <div className="space-y-2">
                  <Label htmlFor="instagramHandles" className="text-foreground">
                    Instagram Handle(s)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </span>
                    <Input
                      id="instagramHandles"
                      placeholder="handle1, handle2 (if multiple)"
                      value={formData.instagramHandles}
                      onChange={(e) =>
                        setFormData({ ...formData, instagramHandles: e.target.value })
                      }
                      className="pl-8 bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>
                  {errors.instagramHandles && (
                    <p className="text-destructive text-sm">{errors.instagramHandles}</p>
                  )}
                </div>

                {/* Instagram Followers */}
                <div className="space-y-2">
                  <Label htmlFor="instagramFollowers" className="text-foreground">
                    Instagram Followers
                  </Label>
                  <Input
                    id="instagramFollowers"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50000"
                    value={formData.instagramFollowers}
                    onChange={(e) =>
                      setFormData({ ...formData, instagramFollowers: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.instagramFollowers && (
                    <p className="text-destructive text-sm">{errors.instagramFollowers}</p>
                  )}
                </div>

                {/* Snapchat Handle */}
                <div className="space-y-2">
                  <Label htmlFor="snapchatHandle" className="text-foreground">
                    Snapchat Handle
                  </Label>
                  <Input
                    id="snapchatHandle"
                    placeholder="Your Snapchat username"
                    value={formData.snapchatHandle}
                    onChange={(e) =>
                      setFormData({ ...formData, snapchatHandle: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.snapchatHandle && (
                    <p className="text-destructive text-sm">{errors.snapchatHandle}</p>
                  )}
                </div>

                {/* YouTube Channel (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="youtubeChannel" className="text-foreground">
                    YouTube Channel <span className="text-muted-foreground font-normal">(if any)</span>
                  </Label>
                  <Input
                    id="youtubeChannel"
                    placeholder="Channel name or URL (optional)"
                    value={formData.youtubeChannel}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeChannel: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {errors.youtubeChannel && (
                    <p className="text-destructive text-sm">{errors.youtubeChannel}</p>
                  )}
                </div>

                {/* Residence Complete Address */}
                <div className="space-y-2">
                  <Label htmlFor="residenceAddress" className="text-foreground">
                    Residence – Complete Address
                  </Label>
                  <Textarea
                    id="residenceAddress"
                    placeholder="Street, city, state/region, postal code, country"
                    value={formData.residenceAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, residenceAddress: e.target.value })
                    }
                    rows={4}
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                  {errors.residenceAddress && (
                    <p className="text-destructive text-sm">{errors.residenceAddress}</p>
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
                      {niches.map((n) => (
                        <SelectItem key={n} value={n.toLowerCase()}>
                          {n}
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

                {/* Professional checklist */}
                <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="text-sm font-medium text-foreground">
                    Professional checklist
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="comfortableSpeakingOnCamera"
                        checked={formData.comfortableSpeakingOnCamera}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            comfortableSpeakingOnCamera: checked === true,
                          })
                        }
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor="comfortableSpeakingOnCamera"
                        className="cursor-pointer text-sm font-normal text-foreground leading-snug"
                      >
                        Are you comfortable speaking on camera?
                      </Label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="okayWithRoamingQuestion"
                        checked={formData.okayWithRoamingQuestion}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            okayWithRoamingQuestion: checked === true,
                          })
                        }
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor="okayWithRoamingQuestion"
                        className="cursor-pointer text-sm font-normal text-foreground leading-snug"
                      >
                        Are you okay with roaming questions?
                      </Label>
                    </div>
                  </div>
                  {(errors.comfortableSpeakingOnCamera || errors.okayWithRoamingQuestion) && (
                    <p className="text-destructive text-sm">
                      {errors.comfortableSpeakingOnCamera ?? errors.okayWithRoamingQuestion}
                    </p>
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