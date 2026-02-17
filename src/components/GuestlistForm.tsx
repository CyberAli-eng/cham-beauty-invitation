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
import { SuccessState, ExpectationsCard } from "./GuestlistFormSubComponents";

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

const VALID_NICHE_VALUES = new Set(niches.map((n) => n.toLowerCase()));

/** Name: no restrictive regex */
const NAME_REGEX = /.+/;
/** Instagram: @ optional */
const INSTAGRAM_HANDLE_REGEX = /.*/;
/** Snapchat: @ optional */
const SNAPCHAT_HANDLE_REGEX = /.*/;
/** WhatsApp: basic digit check but no length limit */
const WHATSAPP_REGEX = /^\+?[0-9\s-]+$/;
/** Address: allow anything */
const ADDRESS_REGEX = /.*/;
/** Niche other: allow anything */
const NICHE_OTHER_REGEX = /.*/;
/** YouTube: when provided, must be a YouTube channel/page URL */
const YOUTUBE_URL_REGEX = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+$/i;

const formSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name"),
    instagramHandles: z
      .string()
      .trim()
      .min(1, "Instagram handle(s) required"),
    instagramFollowers: z
      .string()
      .trim()
      .min(1, "Instagram followers count is required")
      .refine((val) => /^\d+$/.test(val), "Enter digits only"),
    snapchatHandle: z
      .string()
      .trim()
      .min(1, "Snapchat handle is required"),
    youtubeChannel: z
      .string()
      .trim()
      .refine((val) => !val || YOUTUBE_URL_REGEX.test(val), "Enter a valid YouTube channel URL"),
    residenceAddress: z
      .string()
      .trim()
      .min(1, "Residence address is required"),
    niche: z
      .string()
      .min(1, "Please select your niche")
      .refine((val) => VALID_NICHE_VALUES.has(val), "Please select a valid niche"),
    nicheOther: z.string().trim().optional(),
    whatsapp: z
      .string()
      .trim()
      .min(1, "Valid WhatsApp number required")
      .refine((val) => WHATSAPP_REGEX.test(val.replace(/\s/g, "")), "Enter a valid number"),
    comfortableSpeakingOnCamera: z
      .boolean()
      .refine((val) => val === true, "Please confirm you are comfortable speaking on camera"),
    okayWithRoamingQuestion: z
      .boolean()
      .refine((val) => val === true, "Please confirm you are okay with roaming questions"),
  })
  .superRefine((data, ctx) => {
    if (data.niche === "other" && !data.nicheOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["nicheOther"],
        message: "Please specify your niche",
      });
    }
    if (data.niche === "other" && !data.nicheOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["nicheOther"],
        message: "Please specify your niche",
      });
    }
  });

interface GuestlistFormProps {
  onSuccess?: () => void;
  /** When true, used inside a modal – less padding, no background effects */
  embedded?: boolean;
}

const GuestlistForm = ({ onSuccess, embedded = false }: GuestlistFormProps) => {
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
    nicheOther: "",
    whatsapp: "",
    comfortableSpeakingOnCamera: false,
    okayWithRoamingQuestion: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

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

    const payload = {
      fullName: formData.fullName.trim(),
      instagramHandles: formData.instagramHandles.trim(),
      instagramFollowers: formData.instagramFollowers.trim(),
      snapchatHandle: formData.snapchatHandle.trim(),
      youtubeChannel: (formData.youtubeChannel || "").trim(),
      residenceAddress: formData.residenceAddress.trim(),
      niche:
        formData.niche === "other"
          ? (formData.nicheOther?.trim() || "Other")
          : formData.niche,
      nicheOther: formData.niche === "other" ? (formData.nicheOther?.trim() || "") : "",
      whatsapp: formData.whatsapp.replace(/\s/g, "").trim(),
      comfortableSpeakingOnCamera: formData.comfortableSpeakingOnCamera,
      okayWithRoamingQuestion: formData.okayWithRoamingQuestion,
      submittedAt: new Date().toISOString(),
      website: formData.honeypot,
    };

    const gasUrl = import.meta.env.VITE_GAS_WEB_APP_URL;
    if (!gasUrl) {
      console.error("VITE_GAS_WEB_APP_URL is not defined in environment variables");
      setSubmitError(
        "Service is temporarily unavailable. Please try again later or contact support."
      );
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Use no-cors so request succeeds from browser; GAS doesn't send CORS headers.
      await fetch(gasUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showContent = embedded || isVisible;

  return (
    <section
      ref={sectionRef}
      id={embedded ? undefined : "guestlist"}
      className={
        embedded
          ? "py-6 px-4 relative w-full min-w-0"
          : "py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden w-full min-w-0"
      }
    >
      {!embedded && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10 w-full min-w-0">
        <div
          className={`text-center ${embedded ? "mb-6" : "mb-12"} transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">
            The Guestlist
          </p>
          <h2 className={`font-serif mb-4 ${embedded ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
            Join the <span className="italic text-primary">Elite Circle</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Limited spots available. Only selected creators receive an invite.
          </p>
        </div>

        {/* What we expect from you */}
        <div
          className={`${embedded ? "mb-6" : "mb-10"} transition-all duration-700 delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <ExpectationsCard />
        </div>

        {/* Form Card */}
        <div
          className={`transition-all duration-700 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="glass rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 w-full min-w-0">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 w-full min-w-0">
                {/* Honeypot: leave empty; bots often fill it */}
                <div
                  className="absolute -left-[9999px] h-0 overflow-hidden opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) =>
                      setFormData({ ...formData, honeypot: e.target.value })
                    }
                  />
                </div>

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
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, instagramFollowers: v });
                    }}
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

                {/* YouTube channel URL (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="youtubeChannel" className="text-foreground">
                    YouTube channel URL <span className="text-muted-foreground font-normal">(if any)</span>
                  </Label>
                  <Input
                    id="youtubeChannel"
                    placeholder="https://www.youtube.com/@yourchannel (optional)"
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
                      setFormData({
                        ...formData,
                        niche: value,
                        ...(value !== "other" ? { nicheOther: "" } : {}),
                      })
                    }
                  >
                    <SelectTrigger className="w-full bg-secondary/50 border-border focus:border-primary">
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
                  {formData.niche === "other" && (
                    <div className="pt-2">
                      <Label
                        htmlFor="nicheOther"
                        className="text-foreground text-sm"
                      >
                        Specify your niche
                      </Label>
                      <Input
                        id="nicheOther"
                        placeholder="e.g. Art, Music, Photography"
                        value={formData.nicheOther}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nicheOther: e.target.value,
                          })
                        }
                        className="mt-1.5 w-full bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                  )}
                  {errors.niche && (
                    <p className="text-destructive text-sm">{errors.niche}</p>
                  )}
                  {errors.nicheOther && (
                    <p className="text-destructive text-sm">
                      {errors.nicheOther}
                    </p>
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
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^\d+]/g, "");
                      setFormData({ ...formData, whatsapp: v });
                    }}
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

                {submitError && (
                  <p className="text-destructive text-sm text-center">
                    {submitError}
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base tracking-wider uppercase font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Submitting…" : "Join the Elite Circle"}
                </Button>

                <p className="text-center text-muted-foreground text-sm">
                  By submitting, you agree to receive updates about our exclusive
                  events.
                </p>
              </form>
            ) : (
              /* Success State */
              <SuccessState />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestlistForm;