import { EmptyState } from "@/components/ui/empty-state"
import { FileText } from "lucide-react"

interface EmptyApplicationsProps {
  isEmployer?: boolean
}

export function EmptyApplications({ isEmployer }: EmptyApplicationsProps) {
  if (isEmployer) {
    return (
      <EmptyState
        icon={FileText}
        title="No applications yet"
        description="You haven't received any applications for your job postings yet. Share your job listings to attract more candidates."
        actionLabel="Share job listings"
        actionLink="/dashboard/employer/jobs"
        secondaryActionLabel="Post a new job"
        secondaryActionLink="/post-job"
      />
    )
  }

  return (
    <EmptyState
      icon={FileText}
      title="No applications yet"
      description="You haven't applied to any jobs yet. Start exploring job opportunities and submit your first application."
      actionLabel="Browse jobs"
      actionLink="/jobs"
      secondaryActionLabel="Complete your profile"
      secondaryActionLink="/dashboard/job-seeker/profile"
    />
  )
}
