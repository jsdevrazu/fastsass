"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"


interface AddExperienceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (experience: Omit<ExperienceEntity, "id">) => void
  editingExperience: ExperienceEntity | null
}

export function AddExperienceModal({ open, onOpenChange, onSave, editingExperience }: AddExperienceModalProps) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPosition, setCurrentPosition] = useState(false)
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      title,
      company_name: company,
      start_date: startDate,
      end_date: (currentPosition ? null : endDate) ?? '',
      currently_work: currentPosition,
      job_description: description,
    })

    setTitle("")
    setCompany("")
    setStartDate("")
    setEndDate("")
    setCurrentPosition(false)
    setDescription("")

    onOpenChange(false)
  }

  useEffect(() =>{
    if(editingExperience){
      setTitle(editingExperience.title)
      setCompany(editingExperience.company_name)
      setStartDate(editingExperience.start_date)
      setEndDate(editingExperience.end_date)
      setCurrentPosition(editingExperience.currently_work)
      setDescription(editingExperience.job_description)
    }
  }, [editingExperience])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
            <DialogDescription>
              Add details about your work experience to showcase your professional background.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Frontend Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g. Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="month"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={currentPosition}
                  required={!currentPosition}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={currentPosition}
                onCheckedChange={(checked) => setCurrentPosition(checked === true)}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
