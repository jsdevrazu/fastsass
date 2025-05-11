"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import jobsTypes from '@/dump/job_types.json'
import industry from '@/dump/industry.json'
import { Controller, useForm } from "react-hook-form"
import { useAuthStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { update_notification } from "@/lib/apis/notification"
import { PreferFormValues, preferSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useEffect } from "react"

export default function JobPreferencesSetting() {

    const { user } = useAuthStore()
    const { handleSubmit, control, setValue } = useForm<PreferFormValues>({
        resolver: zodResolver(preferSchema)
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

    const onSubmit = (data: PreferFormValues) => {
        const payload = {
            prefer_settings: {
                ...data
            }
        }
        mutate(payload);
    };

    useEffect(() => {
        setValue('experience_level', user?.prefer_settings?.experience_level ?? 'mid')
        setValue('job_type', user?.prefer_settings?.job_type ?? 'Full-time')
        setValue('salary_range', user?.prefer_settings?.salary_range ?? '50k-75k')
        setValue('preferred_industry', user?.prefer_settings?.preferred_industry ?? 'Information Technology (IT)')
        setValue('work_location', user?.prefer_settings?.work_location ?? 'remote')
    }, [user])

    return (

        <Card>
            <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>Set your job preferences to get better recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2 mt-2">
                        <Label htmlFor="job-types">Job Types</Label>
                        <Controller
                            name='job_type'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="job-types">
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            jobsTypes?.map((item) => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="mb-2 mt-2">
                        <Label htmlFor="work-location">Work Location</Label>
                        <Controller
                            name='work_location'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="work-location">
                                        <SelectValue placeholder="Select work location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                        <SelectItem value="on-site">On-site</SelectItem>
                                        <SelectItem value="any">Any</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    </div>
                    <div className="mb-2 mt-2">
                        <Label htmlFor="salary-range">Desired Salary Range</Label>
                        <Controller
                            name='salary_range'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="salary-range">
                                        <SelectValue placeholder="Select salary range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                                        <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                                        <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                                        <SelectItem value="150k-200k">$150,000 - $200,000</SelectItem>
                                        <SelectItem value="200k+">$200,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />


                    </div>
                    <div className="mb-2 mt-2">
                        <Label htmlFor="experience-level">Experience Level</Label>
                        <Controller
                            name='experience_level'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="experience-level">
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="entry">Entry Level</SelectItem>
                                        <SelectItem value="mid">Mid Level</SelectItem>
                                        <SelectItem value="senior">Senior Level</SelectItem>
                                        <SelectItem value="executive">Executive Level</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    </div>
                    <div className="mb-2 mt-2">
                        <Label htmlFor="industry">Preferred Industry</Label>
                        <Controller
                            name='preferred_industry'
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="industry">
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            industry.map((item) => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    </div>
                    <Button disabled={isPending} type="submit" className="mt-4">
                        {isPending ? 'loading...' : 'Save Settings'}
                    </Button>
                </form>
            </CardContent>
        </Card>

    )
}