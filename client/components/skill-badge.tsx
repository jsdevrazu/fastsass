"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, X } from "lucide-react"

interface SkillBadgeProps {
  skill: SkillsEntity
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function SkillBadge({ skill, onEdit, onDelete }: SkillBadgeProps) {
  const getProficiencyColor = (proficiency: SkillsEntity['level']) => {
    switch (proficiency) {
      case "beginner":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "intermediate":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "expert":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return ""
    }
  }

  return (
    <div className="group relative inline-flex items-center">
      <Badge
        variant="outline"
        className={`mr-1 px-3 py-1.5 text-sm font-medium ${getProficiencyColor(skill.level)}`}
      >
        {skill.name}
        <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">{skill.level}</span>
      </Badge>
      <div className="absolute -right-2 -top-2 hidden gap-1 group-hover:flex">
        <Button
          variant="secondary"
          size="icon"
          className="h-5 w-5 rounded-full shadow-sm"
          onClick={() => onEdit(skill.id)}
          type="button"
        >
          <Pencil className="h-3 w-3" />
          <span className="sr-only">Edit {skill.name}</span>
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-5 w-5 rounded-full shadow-sm"
          onClick={() => onDelete(skill.id)}
           type="button"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {skill.name}</span>
        </Button>
      </div>
    </div>
  )
}
