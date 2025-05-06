"use client"

import { useState } from "react"
import { Copy, Facebook, Linkedin, Mail, Share2, PhoneIcon as WhatsApp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface ShareJobButtonProps {
    jobId: string
    jobTitle: string
    companyName: string
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

export function ShareJobButton({
    jobId,
    jobTitle,
    companyName,
    className,
    variant = "outline",
    size = "default",
}: ShareJobButtonProps) {
    const [isCopied, setIsCopied] = useState(false)

    const getJobUrl = () => {
        if (typeof window !== "undefined") {
            return `${window.location.origin}/jobs/${jobId}`
        }
        return `/jobs/${jobId}`
    }

    const getShareText = () => {
        return `Check out this job: ${jobTitle} at ${companyName}`
    }

    const copyToClipboard = async () => {
        const url = getJobUrl()

        try {
            await navigator.clipboard.writeText(url)
            setIsCopied(true)
            toast.success("Link copied!", {
                description: "Job link has been copied to clipboard",
            })

            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        } catch (err) {
            toast.error("Failed to copy", {
                description: "Could not copy the link to clipboard",
            })
        }
    }

    const shareNatively = async () => {
        const url = getJobUrl()
        const title = `${jobTitle} at ${companyName}`
        const text = getShareText()

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                })
                toast.success("Shared successfully!", {
                    description: "Job has been shared",
                })
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    toast.error("Share failed", {
                        description: "Could not share the job",
                    })
                }
            }
        } else {
            openShareDropdown()
        }
    }

    const shareVia = (platform: string) => {
        const url = encodeURIComponent(getJobUrl())
        const text = encodeURIComponent(getShareText())
        let shareUrl = ""

        console.log("text", text)

        switch (platform) {
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
                break
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
                break
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
                break
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${text}%20${url}`
                break
            case "email":
                shareUrl = `mailto:?subject=${encodeURIComponent(`Job Opportunity: ${jobTitle}`)}&body=${text}%20${url}`
                break
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank", "noopener,noreferrer")
            toast.success("Opening share window", {
                description: `Sharing via ${platform}`,
            })
        }
    }

    const openShareDropdown = () => {
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={className}
                    onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" &&
                            typeof window.navigator.share === "function" &&
                            window.isSecureContext) {
                            shareNatively();
                        } else {
                            toast.error("Sharing not supported on this device or context.");
                        }
                    }}
                >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Job
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => shareVia("linkedin")}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    <span>LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareVia("twitter")}>
                    <X className="mr-2 h-4 w-4" />
                    <span>Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareVia("facebook")}>
                    <Facebook className="mr-2 h-4 w-4" />
                    <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareVia("whatsapp")}>
                    <WhatsApp className="mr-2 h-4 w-4" />
                    <span>WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareVia("email")}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
