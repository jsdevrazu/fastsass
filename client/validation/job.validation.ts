import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  experience_level: z.string().min(1, "Experience level is required"),
  body: z.string().min(250, "Job body must be 250 character required"),
  min_salary: z.string().min(1, "Minimum salary must be non-negative"),
  max_salary: z.string().min(1, "Maximum salary must be non-negative"),
  location: z.string().min(1, "Location is required"),
  job_type: z.string().min(1, "Job type is required"),
  skills: z.string().min(1, "At least one skill is required"),
  questions: z.any().optional(),
  apply_settings: z.string().min(1, "This field is required"),
  application_email: z.string().optional(),
  application_link: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.apply_settings === 'email' && !data.application_email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Application email is required",
      path: ['application_email'],
    });
  }
  if (data.apply_settings === 'external_link' && !data.application_link) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Application link is required",
      path: ['application_link'],
    });
  }
});


export const generateApplicationSchema = (questions: string[] = []) => {
  const baseSchema = {
    cover_letter: z.string().min(10, "Cover letter at least 10 characters"),
    experience: z.string().min(1, "Experience is required"),
  }

  const questionSchema = questions.reduce((acc, question, idx) => {
    acc[`question_${idx}`] = z.string().min(1, "This question is required")
    return acc
  }, {} as Record<string, z.ZodTypeAny>)

  return z.object({
    ...baseSchema,
    ...questionSchema
  })
}



export type JobFormData = {
  title: string;
  body: string;
  min_salary: number;
  max_salary: number;
  location: string;
  experience_level: string;
  job_type: string;
  skills: string;
  apply_settings: string;
  questions?: any[];
  application_email?: string;
  application_link?: string;
};
