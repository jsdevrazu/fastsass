import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PrivacyFormValues, privacySchema } from "@/validation/auth.validation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { update_notification } from "@/lib/apis/notification"
import { toast } from "sonner"
import { useEffect } from "react"
import { useAuthStore } from "@/store/store"

export default function PrivacyJobSeekerPage() {

    const { user } = useAuthStore()
    const { handleSubmit, control, setValue } = useForm<PrivacyFormValues>({
        resolver: zodResolver(privacySchema)
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

    const onSubmit = (data: PrivacyFormValues) => {
        const payload = {
            privacy_feature: {
                ...data
            }
        }
        mutate(payload);
    };

    useEffect(() => {
        setValue('activity_feed', user?.privacy_feature?.activity_feed ?? false)
        setValue('contact_information', user?.privacy_feature?.contact_information ?? false)
        setValue('current_employer', user?.privacy_feature?.current_employer ?? false)
        setValue('profile_visibility', user?.privacy_feature?.profile_visibility ?? false)
    }, [user])


    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control who can see your profile and contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Profile Visibility</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Make your profile visible to employers and recruiters
                                    </p>
                                </div>
                                <Controller
                                    name='profile_visibility'
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Contact Information</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow employers to see your contact information
                                    </p>
                                </div>
                                <Controller
                                    name='contact_information'
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Current Employer</Label>
                                    <p className="text-sm text-muted-foreground">Hide your profile from your current employer</p>
                                </div>
                                <Controller
                                    name='current_employer'
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Activity Feed</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show your activity on your profile (applications, saved jobs, etc.)
                                    </p>
                                </div>
                                <Controller
                                    name='activity_feed'
                                    control={control}
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                        </div>
                        <Button disabled={isPending} type="submit" className="mt-4">
                            {isPending ? 'Updating...' : 'Update Privacy Settings'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}