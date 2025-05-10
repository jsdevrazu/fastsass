import { HelpCircle } from "lucide-react";

export function FaqItem({ question, answer }: FaqItemProps) {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium flex items-start gap-2 mb-2">
                <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{question}</span>
            </h3>
            <p className="text-muted-foreground ml-7">{answer}</p>
        </div>
    )
}
