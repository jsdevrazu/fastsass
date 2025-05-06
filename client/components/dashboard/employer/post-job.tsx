"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import TextEditor from "@/components/text-editor"
import { zodResolver } from "@hookform/resolvers/zod"
import { useController, useFieldArray, useForm } from "react-hook-form"
import { JobFormData, jobSchema } from "@/validation/job.validation"
import ErrorMessage from "@/components/error-message"
import { useMutation } from "@tanstack/react-query"
import { post_job } from "@/lib/apis/jobs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function PostJobPage() {

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
      apply_settings: 'email'
    }
  })

  const { fields, append, remove } = useFieldArray<JobFormData>({
    control,
    name: 'questions'
  })

  const apply_settings = watch('apply_settings');

  const { field } = useController({ name: 'body', control });


  const { isPending, mutate} = useMutation({
    mutationFn: post_job,
    onSuccess:() =>{
      toast.success("Job Post Successfully")
      router.push("/employer/my-jobs")
    },
    onError: (error) =>{
      toast.error(error.message)
    }
  })


  const onSubmit = (data: JobFormData) => {
    const payload ={
      ...data,
      skills: data.skills.split(",")
    }

    mutate(payload)
  }




  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="flex flex-col gap-8 md:flex-row">
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select onValueChange={(value) => setValue('job_type', value)}>
                      <SelectTrigger id="job-type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors?.job_type && <ErrorMessage message={errors.job_type?.message?.toString() ?? ''} />}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. San Francisco, CA or Remote" {...register("location")} error={errors.job_type?.message?.toString() ?? ''} />
                    {errors?.location && <ErrorMessage message={errors.location?.message?.toString() ?? ''} />}
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
                <div className="space-y-2">
                  <Label htmlFor="job-description">Meta Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the job responsibilities, requirements, and benefits..."
                    className="min-h-[200px]"
                    {...register("meta_description")}
                  />
                  {errors?.meta_description && <ErrorMessage message={errors.meta_description?.message?.toString() ?? ''} />}
                </div>
                <div className="space-y-2">
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
                  <RadioGroup onValueChange={(value: string) => setValue("apply_settings", value)} defaultValue="email">
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
                    onClick={() => append({ value: '' })}
                  >
                    + Add Another Question
                  </Button>
                </div>

              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? 'loading...': 'Post Job'}
              </Button>
            </form>
          </div>
          <div className="md:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Summary</CardTitle>
                <CardDescription>Review your job posting details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Standard Job Posting</p>
                  <p className="text-2xl font-bold">$299</p>
                  <p className="text-sm text-muted-foreground">30 days visibility</p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Featured in job search results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Included in job alert emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Access to applicant tracking system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Resume database access</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you need assistance with posting a job or have any questions, our support team is here to help.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
