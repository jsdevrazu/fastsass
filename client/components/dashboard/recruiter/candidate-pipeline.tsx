import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, Building } from "lucide-react"

export default function CandidatePipeline() {
  // This would typically fetch data from an API
  // For now, we'll use static data

  const stages = [
    {
      name: "Applied",
      count: 48,
      candidates: [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Frontend Developer",
          company: "Tech Solutions Inc.",
          applied: "2 days ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          name: "Maria Garcia",
          role: "UX Designer",
          company: "Creative Studios",
          applied: "3 days ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 3,
          name: "James Wilson",
          role: "Product Manager",
          company: "Innovate Corp",
          applied: "5 days ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      name: "Screening",
      count: 24,
      candidates: [
        {
          id: 4,
          name: "Sarah Miller",
          role: "Backend Developer",
          company: "Data Systems",
          applied: "1 week ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 5,
          name: "Robert Chen",
          role: "DevOps Engineer",
          company: "Cloud Solutions",
          applied: "1 week ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      name: "Interview",
      count: 12,
      candidates: [
        {
          id: 6,
          name: "Emily Davis",
          role: "Marketing Manager",
          company: "Brand Builders",
          applied: "2 weeks ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 7,
          name: "Michael Brown",
          role: "Sales Director",
          company: "Growth Partners",
          applied: "2 weeks ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      name: "Offer",
      count: 5,
      candidates: [
        {
          id: 8,
          name: "Jessica Taylor",
          role: "HR Manager",
          company: "People First",
          applied: "3 weeks ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      name: "Hired",
      count: 8,
      candidates: [
        {
          id: 9,
          name: "David Lee",
          role: "CTO",
          company: "Tech Innovations",
          applied: "1 month ago",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
  ]

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-[900px] pb-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{stage.name}</h3>
                <Badge variant="outline">{stage.count}</Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                +
              </Button>
            </div>

            <div className="space-y-3">
              {stage.candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{candidate.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Applied {candidate.applied}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {stage.candidates.length < stage.count && (
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground text-xs">
                  Show {stage.count - stage.candidates.length} more...
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
