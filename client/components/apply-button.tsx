"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuthStore } from "@/store/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ApplyButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  job: JobsEntity
}

export function ApplyButton({ className, variant = "default", size = "default", job }: ApplyButtonProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const { user } = useAuthStore()
  const router = useRouter()

  const handleApplyClick = () => {
    if (!user) {
      setShowLoginDialog(true)
    }
  }

  const handleApply = () => {
    if (user?.role === 'job_seeker') {
      router.push(`/jobs/${job?.slug}/apply`)
    } else {
      toast.warning("Your role is not eligible for this job")
    }
  }

  return (
    <>
      {
        job?.apply_settings === 'application_form' ? user ? (
          <Button className={className} variant={variant} size={size} onClick={handleApply}>
            Apply Now
          </Button>
        ) : (
          <>
            <Button className={className} variant={variant} size={size} onClick={handleApplyClick}>
              Apply Now
            </Button>
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login Required</DialogTitle>
                  <DialogDescription>
                    You need to be logged in to apply for this job. Please login or create an account to continue.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/register">Create Account</Link>
                  </Button>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href={`/login?redirect=/jobs/${job?._id}/apply`}>Login</Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : job?.apply_settings === 'email' ? <Button className={className} variant={variant} size={size} asChild>
          <Link href={`mailto:${job?.application_email}`}>Apply Now</Link>
        </Button> : <Button className={className} variant={variant} size={size} asChild>
          <Link href={job?.application_link} target="_blank">Apply Now</Link>
        </Button>
      }
    </>
  )
}
