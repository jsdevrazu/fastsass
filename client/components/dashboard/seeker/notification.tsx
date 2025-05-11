import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmailFormValues, emailNotificationSchema } from "@/validation/auth.validation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { update_notification } from "@/lib/apis/notification"
import { toast } from "sonner"
import { useEffect } from "react"
import { useAuthStore } from "@/store/store"

export default function NotificationJobSeekerPage() {

    const { user } = useAuthStore()
    const { handleSubmit, control, setValue } = useForm<EmailFormValues>({
        resolver: zodResolver(emailNotificationSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: update_notification,
        onSuccess: () => {
            toast.success("Settings Update Success")
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })

    const onSubmit = (data: EmailFormValues) => {
        const payload = {
            notification_feature: {
                ...data
            }
        }
        mutate(payload);
    };

    useEffect(() => {
        setValue('application_update', user?.notification_feature?.application_update ?? false)
        setValue('interview_invitation', user?.notification_feature?.interview_invitation ?? false)
        setValue('job_alert', user?.notification_feature?.job_alert ?? false)
        setValue('job_alert_frequency', user?.notification_feature?.job_alert_frequency ?? 'realtime')
        setValue('job_recomandation', user?.notification_feature?.job_recomandation ?? false)
        setValue('marketing_communication', user?.notification_feature?.marketing_communication ?? false)
        setValue('recomandation_frequency', user?.notification_feature?.recomandation_frequency ?? 'daily')
    }, [user])


    return (
        <>



            <Card>
                <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Manage the emails you receive from us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Job Recommendations</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about jobs that match your profile and preferences
                                    </p>
                                </div>
                                <Controller
                                    name="job_recomandation"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Application Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails when there are updates to your job applications
                                    </p>
                                </div>
                                <Controller
                                    name="application_update"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Interview Invitations</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails when employers invite you to interviews
                                    </p>
                                </div>
                                <Controller
                                    name="interview_invitation"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Job Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive daily or weekly emails with new jobs that match your saved searches
                                    </p>
                                </div>
                                <Controller
                                    name="job_alert"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Communications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about new features, tips, and promotions
                                    </p>
                                </div>
                                <Controller
                                    name="marketing_communication"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="job-alerts-frequency">Job Alerts Frequency</Label>
                            <Controller
                                name='job_alert_frequency'
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="job-alerts-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="realtime">Real-time</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recommendations-frequency">Recommendations Frequency</Label>
                            <Controller
                                name='recomandation_frequency'
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="recommendations-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <Button disabled={isPending} type="submit" className="mt-4">
                            {isPending ? 'Updating...' : 'Update Email Notification'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </>
    )
}