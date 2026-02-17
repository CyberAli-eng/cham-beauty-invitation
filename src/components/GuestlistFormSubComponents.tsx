import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
    onSuccess?: () => void;
}

export const SuccessState = ({ onSuccess }: SuccessStateProps) => (
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
);

export const ExpectationsCard = () => (
    <div className="rounded-lg border border-border bg-secondary/20 p-4 sm:p-6 md:p-8 w-full min-w-0">
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
);
