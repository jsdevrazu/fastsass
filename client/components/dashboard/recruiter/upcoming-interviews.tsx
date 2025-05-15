import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Video, MapPin, FileText } from "lucide-react"

export default function UpcomingInterviews() {
  // This would typically fetch data from an API
  // For now, we'll use static data

  const interviews = [
    {
      id: 1,
      candidate: {
        name: "Emily Rodriguez",
        role: "Senior UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Today",
      time: "10:30 AM - 11:30 AM",
      type: "Video Call",
      location: "Zoom Meeting",
      interviewers: ["John D.", "Sarah M."],
      status: "upcoming",
    },
    {
      id: 2,
      candidate: {
        name: "Michael Chen",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call",
      location: "Google Meet",
      interviewers: ["Alex P.", "You"],
      status: "upcoming",
    },
    {
      id: 3,
      candidate: {
        name: "Jessica Taylor",
        role: "Product Manager",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Tomorrow",
      time: "11:00 AM - 12:30 PM",
      type: "In Person",
      location: "Conference Room 3B",
      interviewers: ["You", "David L.", "Maria G."],
      status: "upcoming",
    },
    {
      id: 4,
      candidate: {
        name: "Robert Kim",
        role: "Marketing Specialist",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Tomorrow",
      time: "3:30 PM - 4:30 PM",
      type: "Video Call",
      location: "Microsoft Teams",
      interviewers: ["You", "Lisa T."],
      status: "upcoming",
    },
    {
      id: 5,
      candidate: {
        name: "Priya Patel",
        role: "Data Analyst",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 15, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Video Call",
      location: "Zoom Meeting",
      interviewers: ["You", "James W."],
      status: "upcoming",
    },
  ]

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <Card key={interview.id} className="hover:border-primary/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={interview.candidate.avatar || "/placeholder.svg"} alt={interview.candidate.name} />
                  <AvatarFallback>{interview.candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{interview.candidate.name}</p>
                  <p className="text-sm text-muted-foreground">{interview.candidate.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={interview.date === "Today" ? "default" : "outline"}>{interview.date}</Badge>
                <Button variant="outline" size="sm">
                  Prepare
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{interview.time}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {interview.type === "Video Call" ? (
                  <Video className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{interview.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>With: {interview.interviewers.join(", ")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Resume & Notes</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              {interview.date === "Today" && <Button size="sm">Join Interview</Button>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
