import { EmptyState } from "@/components/ui/empty-state"
import { Users } from "lucide-react"

export function EmptyCandidates() {
  return (
    <EmptyState
      icon={Users}
      title="No candidates found"
      description="There are no candidates matching your current filters. Try adjusting your search criteria or browse all candidates."
      actionLabel="Clear filters"
      actionLink="/dashboard/employer/candidates"
      secondaryActionLabel="Post a job"
      secondaryActionLink="/post-job"
    />
  )
}
