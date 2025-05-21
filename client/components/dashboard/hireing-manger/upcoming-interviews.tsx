import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Video, Phone, MapPin, FileText, Clock } from "lucide-react"

interface InterviewCardProps {
  name: string
  position: string
  time: string
  date: string
  type: "video" | "phone" | "in-person"
  avatar: string
  initials: string
}

const InterviewCard = ({ name, position, time, date, type, avatar, initials }: InterviewCardProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />
      case "phone":
        return <Phone className="h-4 w-4 text-green-500" />
      case "in-person":
        return <MapPin className="h-4 w-4 text-red-500" />
    }
  }

  const getTypeText = () => {
    switch (type) {
      case "video":
        return "Video Interview"
      case "phone":
        return "Phone Screen"
      case "in-person":
        return "In-Person Interview"
    }
  }

  return (
    <Card className="p-4 hover:bg-accent transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{time}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <Badge variant="outline" className="flex items-center gap-1">
          {getTypeIcon()}
          <span>{getTypeText()}</span>
        </Badge>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Resume
          </Button>
          <Button size="sm">Prepare</Button>
        </div>
      </div>
    </Card>
  )
}

export default function UpcomingInterviews() {
  return (
    <div className="space-y-4">
      <InterviewCard
        name="Jessica Martinez"
        position="Frontend Developer"
        time="10:00 AM"
        date="Today"
        type="video"
        avatar="/placeholder.svg?height=40&width=40"
        initials="JM"
      />
      <InterviewCard
        name="Robert Kim"
        position="DevOps Engineer"
        time="2:30 PM"
        date="Today"
        type="phone"
        avatar="/placeholder.svg?height=40&width=40"
        initials="RK"
      />
      <InterviewCard
        name="Emily Chen"
        position="Product Designer"
        time="11:15 AM"
        date="Tomorrow"
        type="in-person"
        avatar="/placeholder.svg?height=40&width=40"
        initials="EC"
      />
      <InterviewCard
        name="David Lee"
        position="Backend Developer"
        time="3:00 PM"
        date="Tomorrow"
        type="video"
        avatar="/placeholder.svg?height=40&width=40"
        initials="DL"
      />

      <div className="flex justify-center pt-2">
        <Button variant="outline">View All Interviews</Button>
      </div>
    </div>
  )
}
