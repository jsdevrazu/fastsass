"use client"

import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { invite_sent } from "@/lib/apis/employer"
import { useAuthStore } from "@/store/store"
import ErrorMessage from "../error-message"
import { Label } from "@/components/ui/label"

const inviteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["employer_owner", "recruiter", "hiring_manager"], {
    required_error: "Please select a role",
  }),
  message: z.string().optional(),
})

type InviteFormValues = z.infer<typeof inviteFormSchema>

const defaultValues: Partial<InviteFormValues> = {
  message: "I'd like to invite you to join our team on FastSass. You'll be able to collaborate on job postings, review applications, and manage candidates.",
}

interface InviteTeamMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteTeamMemberModal({ open, onOpenChange }: InviteTeamMemberModalProps) {

  const { reset, handleSubmit, control, formState: { errors }, } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues,
  })

  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: invite_sent,
    onSuccess: (data, variable) => {
      queryClient.setQueryData(['get_invites'], (oldData: UsersResponse) => {
        if (!oldData || !Array.isArray(oldData.users)) {
          return {
            message: "success",
            users: [data.user],
          };
        }

        return {
          ...oldData,
          users: [...oldData.users, data.user],
        };
      })
      toast.success("Invitation sent", {
        description: `An invitation has been sent to ${variable.email}`,
      })
      reset(defaultValues)
      onOpenChange(false)
    },
    onError: (error) => {
      toast.error("Error", {
        description: error?.message || "There was an error sending the invitation. Please try again.",
      })
    }
  })

  async function onSubmit(data: InviteFormValues) {
    const payload = {
      full_name: data.name,
      team_name: user?.comapny?.name ?? '',
      email: data.email,
      role: data.role,
      invite_message: data.message
    }
    mutate(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Invite a new team member to collaborate on job postings, applications, and candidate management.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input id="name" placeholder="John Doe" value={field.value} onChange={field.onChange} error={errors?.name?.message ?? ''} />
                {errors.name && (
                  <ErrorMessage message={errors?.name?.message ?? ''} />
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="email@gmail.com" value={field.value} onChange={field.onChange} error={errors?.name?.message ?? ''} />
                {errors.name && (
                  <ErrorMessage message={errors?.name?.message ?? ''} />
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id='role' error={errors?.role?.message ?? ''}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employer_owner">
                      <div className="flex items-start flex-col py-2">
                        <span>Admin</span>
                        <span className="text-xs text-muted-foreground">
                          Full access to all features and settings
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="recruiter">
                      <div className="flex items-start flex-col py-2">
                        <span>Recruiter</span>
                        <span className="text-xs text-muted-foreground">Can post jobs and manage applications</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hiring_manager">
                      <div className="flex items-start flex-col py-2">
                        <span>Hiring Manager</span>
                        <span className="text-xs text-muted-foreground">
                          Can review applications and provide feedback
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {
                  errors?.role && <ErrorMessage message={errors?.role?.message ?? ''} />
                }

              </div>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="message">Invitation Message (Optional)</Label>
                <Textarea id="message" placeholder="Write a personal message..." className="min-h-[100px]" value={field.value} onChange={field.onChange} />
                {
                  errors.message && <ErrorMessage message={errors?.message?.message ?? ''} />
                }
              </div>
            )}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
