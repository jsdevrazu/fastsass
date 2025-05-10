import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"


export function WebinarCard({ title, date, time }: WebinarCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <Calendar className="h-10 w-10 text-primary flex-shrink-0" />
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {date} • {time}
        </p>
        <Button size="sm">Register Now</Button>
      </div>
    </div>
  )
}