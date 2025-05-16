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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { send_message } from "@/lib/apis/employer"

interface SendMessageModalProps {
  isOpen: boolean
  onClose: () => void
  applicantName: string
  applicantEmail: string
  id:string
}

export function SendMessageModal({ isOpen, id, onClose, applicantName, applicantEmail }: SendMessageModalProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [template, setTemplate] = useState("")

  const { mutate, isPending } = useMutation({
    mutationFn: send_message,
    onSuccess: () => {
     toast.success("Message sent",{
        description: `Your message has been sent to ${applicantName}`,
      })
      resetForm()
      onClose()
    },
    onError: (error) =>{
      toast.error(error.message)
    }
  })

  const handleTemplateChange = (value: string) => {
    setTemplate(value)

    switch (value) {
      case "interview-request":
        setSubject("Interview Request: Next Steps for Your Application")
        setMessage(
          `Dear ${applicantName},\n\nThank you for applying for the position. We would like to schedule an interview with you to discuss your application further.\n\nPlease let us know your availability for the coming week.\n\nBest regards,\nThe Hiring Team`,
        )
        break
      case "additional-info":
        setSubject("Additional Information Needed for Your Application")
        setMessage(
          `Dear ${applicantName},\n\nThank you for your application. We need some additional information to proceed with your application.\n\nCould you please provide the following:\n- Portfolio or work samples\n- References\n- Availability for start date\n\nBest regards,\nThe Hiring Team`,
        )
        break
      case "rejection":
        setSubject("Update on Your Application")
        setMessage(
          `Dear ${applicantName},\n\nThank you for your interest in our company and for taking the time to apply.\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications better match our current needs.\n\nWe appreciate your interest in our company and wish you the best in your job search.\n\nBest regards,\nThe Hiring Team`,
        )
        break
      default:
        break
    }
  }

  const handleSubmit = () => {
    if (!subject || !message) {
      toast.error("Missing information",{
        description: "Please enter both subject and message",
      })
      return
    }
    const payload = {
      subject,
      message,
      type: template === 'rejection' ? 'Rejected': template,
      id
    }
    mutate(payload)

  
  }

  const resetForm = () => {
    setSubject("")
    setMessage("")
    setTemplate("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>
            Send a message to {applicantName} ({applicantEmail})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message-template">Message Template (Optional)</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger id="message-template">
                <SelectValue placeholder="Select a template or write custom message" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interview-request">Interview Request</SelectItem>
                <SelectItem value="additional-info">Request Additional Information</SelectItem>
                <SelectItem value="rejection">Rejection Notice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-subject">Subject</Label>
            <Input
              id="message-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-content">Message</Label>
            <Textarea
              id="message-content"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here"
              className="min-h-[200px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
