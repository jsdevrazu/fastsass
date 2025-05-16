"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { interview_invite } from "@/lib/apis/employer"

interface ScheduleInterviewModalProps {
  isOpen: boolean
  onClose: () => void
  applicantName: string
  jobTitle: string
  id: string
}

export function ScheduleInterviewModal({ isOpen, onClose, applicantName, jobTitle, id }: ScheduleInterviewModalProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [interviewType, setInterviewType] = useState("video")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")


  const { mutate, isPending } = useMutation({
    mutationFn: interview_invite,
    onSuccess: (_, variables) => {
      toast.success("Interview scheduled", {
        description: `Interview with ${applicantName} scheduled for ${format(variables.date, "PPP")} at ${time}`,
      })
      onClose()
      resetForm()
    },
    onError: (error) =>{
      toast.error(error.message)
    }
  })

  const handleSubmit = () => {
    if (!date || !time || !notes || !interviewType) {
      toast.error("Missing information", {
        description: "Please select both date and time for the interview",
      })
      return
    }

    const payload = {
      name: applicantName,
      time,
      date: date.toLocaleDateString(),
      interview_type: interviewType,
      notes,
      id,
      meet_link: location
    }

    mutate(payload)

  }

  const resetForm = () => {
    setDate(undefined)
    setTime("")
    setInterviewType("video")
    setLocation("")
    setNotes("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Schedule an interview with {applicantName} for the {jobTitle} position.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interview-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="interview-date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interview-time">Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="interview-time" className="w-full">
                  <SelectValue placeholder="Select time">{time ? time : "Select time"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview-type">Interview Type</Label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger id="interview-type">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview-location">
              {interviewType === "video" ? "Meeting Link" : interviewType === "phone" ? "Phone Number" : "Location"}
            </Label>
            <Input
              id="interview-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={
                interviewType === "video"
                  ? "Paste meeting link here"
                  : interviewType === "phone"
                    ? "Enter phone number"
                    : "Enter address"
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview-notes">Notes</Label>
            <Textarea
              id="interview-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information about the interview"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Scheduling..." : "Schedule Interview"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
