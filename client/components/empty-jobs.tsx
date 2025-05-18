import { EmptyState } from "@/components/ui/empty-state"
import { Briefcase } from "lucide-react"


export function EmptyJobs() {

  return (
    <EmptyState
      icon={Briefcase}
      title="No jobs available"
      description="There are currently no job listings available. Please check back later or create an alert to be notified when new jobs are posted."
      secondaryActionLabel="Browse companies"
      secondaryActionLink="/companies"
    />
  )
}
