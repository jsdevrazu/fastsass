"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface AddSkillModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (skill: Omit<SkillsEntity, "id">) => void
  editingSkill?: SkillsEntity | null
}

export function AddSkillModal({ open, onOpenChange, onSave, editingSkill }: AddSkillModalProps) {
  const [name, setName] = useState(editingSkill?.name || "")
  const [proficiency, setProficiency] = useState<SkillsEntity['level']>(editingSkill?.level || "intermediate")

  React.useEffect(() => {
    if (open) {
      setName(editingSkill?.name || "")
      setProficiency(editingSkill?.level || "intermediate")
    }
  }, [open, editingSkill])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      name,
      level: proficiency,
    })

    setName("")
    setProficiency("intermediate")

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editingSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Update your skill and proficiency level."
                : "Add a new skill to showcase your expertise."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skill-name">Skill Name</Label>
              <Input
                id="skill-name"
                placeholder="e.g. React, JavaScript, Project Management"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select value={proficiency} onValueChange={(value) => setProficiency(value as SkillsEntity['level'])}>
                <SelectTrigger id="proficiency">
                  <SelectValue placeholder="Select your proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingSkill ? "Update Skill" : "Add Skill"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
