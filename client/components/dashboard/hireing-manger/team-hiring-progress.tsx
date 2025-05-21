import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface HiringProgressItemProps {
  position: string
  department: string
  progress: number
  candidates: number
  interviews: number
  offers: number
  daysOpen: number
  status: "on-track" | "at-risk" | "delayed"
}

const HiringProgressItem = ({
  position,
  department,
  progress,
  candidates,
  interviews,
  offers,
  daysOpen,
  status,
}: HiringProgressItemProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "on-track":
        return <Badge className="bg-green-500">On Track</Badge>
      case "at-risk":
        return <Badge className="bg-yellow-500">At Risk</Badge>
      case "delayed":
        return <Badge className="bg-red-500">Delayed</Badge>
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{position}</p>
          <p className="text-sm text-muted-foreground">{department}</p>
        </div>
        {getStatusBadge()}
      </div>

      <Progress value={progress} className="h-2" />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-medium">{candidates}</span>
            <span className="text-muted-foreground ml-1">candidates</span>
          </div>
          <div>
            <span className="font-medium">{interviews}</span>
            <span className="text-muted-foreground ml-1">interviews</span>
          </div>
          <div>
            <span className="font-medium">{offers}</span>
            <span className="text-muted-foreground ml-1">offers</span>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Open for </span>
          <span className="font-medium">{daysOpen} days</span>
        </div>
      </div>
    </div>
  )
}

export default function TeamHiringProgress() {
  return (
    <div className="space-y-6">
      <HiringProgressItem
        position="Senior Frontend Developer"
        department="Engineering"
        progress={75}
        candidates={48}
        interviews={12}
        offers={2}
        daysOpen={45}
        status="on-track"
      />
      <HiringProgressItem
        position="Product Manager"
        department="Product"
        progress={60}
        candidates={32}
        interviews={8}
        offers={1}
        daysOpen={30}
        status="on-track"
      />
      <HiringProgressItem
        position="UX Designer"
        department="Design"
        progress={40}
        candidates={24}
        interviews={6}
        offers={0}
        daysOpen={25}
        status="at-risk"
      />
      <HiringProgressItem
        position="Backend Developer"
        department="Engineering"
        progress={25}
        candidates={18}
        interviews={4}
        offers={0}
        daysOpen={15}
        status="on-track"
      />
      <HiringProgressItem
        position="Marketing Specialist"
        department="Marketing"
        progress={10}
        candidates={8}
        interviews={0}
        offers={0}
        daysOpen={10}
        status="delayed"
      />
    </div>
  )
}
