"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { apply_job, generate_cover_letter } from "@/lib/apis/jobs"
import { toast } from "sonner"
import { generateApplicationSchema } from "@/validation/job.validation"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "@/components/error-message"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const REQUIRED_FIELDS: (keyof User)[] = [
    'resume',
    'first_name',
    'last_name',
    'phone_number',
    'email',
    'location',
    'linkedin_profile',
    'github_profile',
    'website'
]


export default function JobApplicationPage({ job }: { job: JobsEntity }) {

    const { user } = useAuthStore()
    const router = useRouter()
    const questions = job?.questions || []

    const schema = useMemo(() => generateApplicationSchema(questions), [questions])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: apply_job,
        onSuccess: () => {
            toast.success("Job Apply Successfully")
            router.push('/seeker/dashboard')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    
    const { mutate: mnFun, isPending: loading } = useMutation({
        mutationFn: generate_cover_letter,
        onSuccess: (data) => {
            setValue("cover_letter", data?.cover_letter)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const onSubmit = (data: any) => {
        const missingFields = REQUIRED_FIELDS.filter(field => !user?.[field as keyof User])


        if (missingFields.length > 0) {
            toast.error('Please complete your profile before applying to jobs.', {
                action: {
                    label: 'Profile',
                    onClick: () => router.push('/seeker/profile')
                }
            })
            return
        }

        const payload = {
            id: job._id,
            data: {
                first_name: user?.first_name ?? '',
                last_name: user?.last_name ?? '',
                email: user?.email ?? '',
                phone_number: user?.phone_number ?? '',
                location: user?.location ?? '',
                resume: user?.resume ?? '',
                cover_letter: data?.cover_letter,
                linkedin_profile: user?.linkedin_profile ?? '',
                github_profile: user?.github_profile ?? '',
                portfolio: user?.website ?? '',
                company_name: job?.company?.name,
                experience: data?.experience,
                questions_answer: questions.map((question, index) => ({
                    question,
                    answer: data[`question_${index}`]
                }))
            }
        }

        mutate(payload)
    }

    const handleGenerate = () =>{
        const payload = {
            full_name: `${user?.first_name} ${user?.first_name}`,
            position: job?.title,
            company_name: job?.company?.name,
            skills: job?.skills,
            experience: job?.experience_level ?? "mid"
        }
        mnFun(payload)
    }


    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <div className="app_container md:py-8">
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">Apply for Job</h1>
                                <p className="text-muted-foreground">
                                    You are applying for <span className="font-medium">{job.title}</span> at{" "}
                                    <span className="font-medium">{job.company?.name}</span>
                                </p>
                            </div>
                            <Separator />
                            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Additional Information</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <Label htmlFor="cover-letter">Cover Letter</Label>
                                            <Button type="button" disabled={loading} onClick={handleGenerate}>
                                                {loading ? 'Generating...' : 'Generate Ai Covert Letter'}
                                            </Button>
                                        </div>
                                        <Textarea
                                            id="cover-letter"
                                            placeholder="Introduce yourself and explain why you're a good fit for this position..."
                                            className="min-h-[200px]"
                                            {...register("cover_letter")}
                                        />
                                        {errors.cover_letter && <ErrorMessage message={errors.cover_letter.message?.toString() ?? ''} />}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover-letter">How many experience do you have?</Label>
                                    <Select defaultValue="1+ Years" onValueChange={(value) => setValue('experience', value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1+ Years">1+ Years</SelectItem>
                                            <SelectItem value="2+ Years">2+ Years</SelectItem>
                                            <SelectItem value="3+ Years">3+ Years</SelectItem>
                                            <SelectItem value="5+ Years">5+ Years</SelectItem>
                                            <SelectItem value="6+ Years">6+ Years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.experience && <ErrorMessage message={errors.experience.message?.toString() ?? ''} />}
                                </div>
                                {job?.questions?.length > 0 && <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Questions</h2>
                                    {questions.map((q, index) => (
                                        <div className="space-y-2" key={index}>
                                            <Label htmlFor={`question_${index}`} className="capitalize">
                                                {q}
                                            </Label>
                                            <Input
                                                id={`question_${index}`}
                                                placeholder="Your answer"
                                                {...register(`question_${index}`)}
                                            />
                                            {errors[`question_${index}`] && (
                                                <ErrorMessage message={errors[`question_${index}`]?.message?.toString() ?? ''} />
                                            )}
                                        </div>
                                    ))}
                                </div>}
                                <Button disabled={isPending} type="submit" className="w-full">
                                    {isPending ? 'loading...' : 'Submit Application'}
                                </Button>
                            </form>
                        </div>
                        <div className="md:w-80 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Application Tips</CardTitle>
                                    <CardDescription>How to stand out from other applicants</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Tailor your resume</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Customize your resume to highlight relevant skills and experience for this specific position.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Write a compelling cover letter</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Explain why you're interested in this role and how your experience makes you a great fit.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Highlight achievements</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Focus on specific accomplishments rather than just listing job duties.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
