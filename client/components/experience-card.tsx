"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

interface ExperienceCardProps {
  experience: ExperienceEntity
  onEdit: (data: ExperienceEntity) => void
  onDelete: (id: string) => void
}

export function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date)
  }

  const startDate = formatDate(experience?.start_date)
  const endDate = experience?.currently_work ? "Present" : formatDate(experience?.end_date)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="border-l-4 border-primary p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{experience.title}</h3>
              <p className="text-muted-foreground">{experience.company_name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {startDate} - {endDate}
                </Badge>
                {experience.currently_work && <Badge className="text-xs">Current</Badge>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type='button' variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(experience)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(experience?.id)}
                type='button'
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          {experience?.job_description && (
            <div className="mt-3 text-sm">
              <p className="whitespace-pre-line">{experience?.job_description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
