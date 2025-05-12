"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import TextEditor from "@/components/text-editor"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useController, useFieldArray, useForm } from "react-hook-form"
import { JobFormData, jobSchema } from "@/validation/job.validation"
import ErrorMessage from "@/components/error-message"
import { useMutation } from "@tanstack/react-query"
import { post_job } from "@/lib/apis/jobs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/store"
import { useEffect } from "react"
import { OverlayLock } from "@/components/overlay-lock"
import Link from "next/link"
import jobsTypes from '@/dump/job_types.json'

export default function PostJobPage({ job }: { job: JobsEntity }) {

  const { user, setUser } = useAuthStore()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      apply_settings: 'application_form'
    }
  })

  const { fields, append, remove } = useFieldArray<JobFormData>({
    control,
    name: 'questions'
  })

  const apply_settings = watch('apply_settings');

  const { field } = useController({ name: 'body', control });


  const { isPending, mutate } = useMutation({
    mutationFn: post_job,
    onSuccess: () => {
      toast.success("Job Post Successfully")
      if (user) {
        setUser({
          ...user,
          _id: user._id ?? "",
          feature: {
            ...user.feature,
            used_job: (user.feature.used_job ?? 0) + 1
          }
        })
      }
      router.push("/employer/my-jobs")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const onSubmit = (data: JobFormData) => {
    const payload = {
      ...data,
      skills: data.skills.split(",")
    }
    mutate(payload)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [user])

  useEffect(() => {
    setValue('title', job?.title)
    setValue('job_type', job?.job_type)
    setValue('location', job?.location)
    setValue('experience_level', job?.experience_level)
    setValue('min_salary', job?.min_salary)
    setValue('max_salary', job?.max_salary)
    setValue('body', job?.body)
    setValue('application_link', job?.application_link)
    setValue('apply_settings', job?.apply_settings)
    setValue('application_email', job?.application_email)
    setValue('skills', job?.skills?.join(','))
    if(job?.questions?.length > 0){
      setValue('questions', job?.questions)
    }
  }, [job])

  return (
    <>
      <OverlayLock visible={user?.feature?.is_active !== true || user?.feature?.used_job === user?.feature?.max_job_post} isButtonVisible message="Please updagrade your plan" />
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col">
          <main className="flex-1 overflow-auto">
            <div className="flex flex-col gap-8 md:flex-row px-4">
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Post a Job</h1>
                  <p className="text-muted-foreground">Fill out the form below to post a new job listing.</p>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Job Details</h2>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" placeholder="e.g. Senior Frontend Developer" {...register("title")} error={errors.title?.message?.toString() ?? ''} />
                      {errors?.title && <ErrorMessage message={errors.title?.message?.toString() ?? ''} />}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="job-type">Job Type</Label>
                        <Controller
                          name='job_type'
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger error={errors.job_type?.message?.toString() ?? ''} id="job-type">
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                              <SelectContent>
                                {
                                  jobsTypes.map((item) => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {errors?.job_type && <ErrorMessage message={errors.job_type?.message?.toString() ?? ''} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Controller
                          name='location'
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger error={errors.location?.message?.toString() ?? ''} id="work-location">
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
                        {errors?.location && <ErrorMessage message={errors.location?.message?.toString() ?? ''} />}
                      </div>
                      <div className="mb-2 mt-2">
                        <Label htmlFor="experience-level">Experience Level</Label>
                        <Controller
                          name='experience_level'
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger error={errors.experience_level?.message?.toString() ?? ''} id="experience-level">
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
                        {errors?.experience_level && <ErrorMessage message={errors.experience_level?.message?.toString() ?? ''} />}

                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salary-min">Minimum Salary</Label>
                        <Input id="salary-min" type="number" placeholder="e.g. 80000" {...register("min_salary")} error={errors.min_salary?.message?.toString() ?? ''} />
                        {errors?.min_salary && <ErrorMessage message={errors.min_salary?.message?.toString() ?? ''} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary-max">Maximum Salary</Label>
                        <Input id="salary-max" type="number" placeholder="e.g. 120000" {...register("max_salary")} error={errors.max_salary?.message?.toString() ?? ''} />
                        {errors?.max_salary && <ErrorMessage message={errors.max_salary?.message?.toString() ?? ''} />}
                      </div>
                    </div>
                    <div className={errors.body?.message?.toString() ? 'error' : 'space-y-2'}>
                      <Label htmlFor="job-description">Job Description</Label>
                      <TextEditor
                        field={field}
                      />
                      {errors?.body && <ErrorMessage message={errors.body?.message?.toString() ?? ''} />}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="required-skills">Required Skills (comma separated)</Label>
                      <Input id="required-skills" placeholder="e.g. React, TypeScript, Node.js" {...register("skills")} error={errors.skills?.message?.toString() ?? ''} />
                      {errors?.skills && <ErrorMessage message={errors.skills?.message?.toString() ?? ''} />}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Application Settings</h2>
                    <div className="space-y-2">
                      <Label>How should candidates apply?</Label>
                      <RadioGroup onValueChange={(value: string) => setValue("apply_settings", value)} defaultValue="application_form">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="apply-email" />
                          <Label htmlFor="apply-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="external_link" id="apply-url" />
                          <Label htmlFor="apply-url">External URL</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="application_form" id="apply-form" />
                          <Label htmlFor="apply-form">Application Form</Label>
                        </div>
                      </RadioGroup>
                      {errors?.apply_settings && <ErrorMessage message={errors.apply_settings?.message?.toString() ?? ''} />}
                    </div>
                    {apply_settings === 'email' ? <div className="space-y-2">
                      <Label htmlFor="application-email">Application Email</Label>
                      <Input id="application-email" type="email" placeholder="e.g. jobs@company.com" {...register("application_email")} error={errors.application_email?.message?.toString() ?? ''} />
                      {errors?.application_email && <ErrorMessage message={errors.application_email?.message?.toString() ?? ''} />}

                    </div> : apply_settings === 'external_link' && <div className="space-y-2">
                      <Label htmlFor="application-external_link">Application Link</Label>
                      <Input id="application-external_link" type="text" placeholder="e.g. http://google.cob/full-stack" {...register("application_link")} error={errors.application_link?.message?.toString() ?? ''} />
                      {errors?.application_link && <ErrorMessage message={errors.application_link?.message?.toString() ?? ''} />}

                    </div>}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Screening Questions (Optional)</h2>

                      {fields.map((field, index) => (
                        <div className="space-y-2" key={field.id}>
                          <Label htmlFor={`questions.${index}`}>Question {index + 1}</Label>
                          <Input
                            id={`questions.${index}`}
                            {...register(`questions.${index}`)}
                            placeholder="e.g. How many years of experience do you have with React?"
                          />
                          <Button type="button" variant="ghost" onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => append('')}
                      >
                        + Add Another Question
                      </Button>
                    </div>

                  </div>
                  <Button disabled={isPending || !user?.feature?.is_active} type="submit" className="w-full">
                    {isPending ? 'loading...' : 'Post Job'}
                  </Button>
                </form>
              </div>
              <div className="md:w-80 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      If you need assistance with posting a job or have any questions, our support team is here to help.
                    </p>
                    <Link href='/contact'>
                      <Button variant="outline" className="w-full mt-4">
                        Contact Support
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
