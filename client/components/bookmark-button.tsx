"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { save_bookmark } from "@/lib/apis/jobs"
import { useAuthStore } from "@/store/store"

interface BookmarkButtonProps {
    jobId: string
    jobTitle: string
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
    isBookmarked?: boolean
}

export function BookmarkButton({
    jobId,
    jobTitle,
    variant = "outline",
    size = "icon",
    className,
    isBookmarked: save_job
}: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(save_job)
    const { user } = useAuthStore()

    const { mutate } = useMutation({
        mutationFn: save_bookmark,
        onSuccess: () => {
            if (isBookmarked) {
                setIsBookmarked(false)

                toast.success("Job removed from bookmarks", {
                    description: `"${jobTitle}" has been removed from your saved jobs.`
                })
            } else {
                setIsBookmarked(true)
                toast.success("Job bookmarked", {
                    description: `"${jobTitle}" has been added to your saved jobs.`,
                })
            }
        },
        onError: (error) =>{
            toast.error(error?.message)
        }
    })

    useEffect(() => {
        setIsBookmarked(false)
    }, [jobId])

    const toggleBookmark = () => {
        if(user){
            mutate(jobId)
        } else {
            toast.error("Please login first!")
        }
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleBookmark()
            }}
            className={cn("transition-all duration-200", className)}
            aria-label={isBookmarked ? "Remove from saved jobs" : "Save job"}
            title={isBookmarked ? "Remove from saved jobs" : "Save job"}
        >
            {isBookmarked ? (
                <BookmarkCheck className="h-[1.2rem] w-[1.2rem] text-primary" />
            ) : (
                <Bookmark className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    )
}
