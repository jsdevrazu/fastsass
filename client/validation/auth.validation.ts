import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.string(),
  company_name: z.string().optional().or(z.literal("")),
  avatar: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "employer" && (!data.company_name || data.company_name.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company_name"],
        message: "Company name is required for employers",
      });
    }
  });

export const changePasswordSchema = z.object({
  current_password: z.string().min(6, "Password must be at least 6 characters"),
  new_password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
})

const optionalUrl = (fieldName: string) =>
  z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => val === '' || z.string().url().safeParse(val).success, {
      message: `Invalid ${fieldName} URL`,
    });

export const companySchema = z.object({
  name: z.string().optional(),
  website: optionalUrl("website"),
  logo: z
    .any()
    .optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  headquatar_location: z.string().optional(),
  company_description: z.string().optional(),
  mission_statement: z.string().optional(),
  core_value: z.string().optional(),
  benefit: z.string().optional(),
  linkedin: optionalUrl("LinkedIn"),
  twitter: optionalUrl("Twitter"),
  facebook: optionalUrl("Facebook"),
  instagram: optionalUrl("Instagram"),
  contact_email: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(val => val === '' || z.string().email().safeParse(val).success, {
      message: "Invalid email",
    }),
  phone_number: z.string().optional(),
})


export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
})



export const resetPasswordSchema = z
  .object({
    otp: z.string().length(4, { message: "Otp code must be 4 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const profileSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  avatar: z.any(),
})

export const setPasswordSchema = z.object({
  new_password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
})

export const emailNotificationSchema = z.object({
  job_recomandation: z.boolean().default(false),
  application_update: z.boolean().default(false),
  interview_invitation: z.boolean().default(false),
  job_alert: z.boolean().default(false),
  marketing_communication: z.boolean().default(false),
  job_alert_frequency: z.string().default('realtime'),
  recomandation_frequency: z.string().default('daily'),
});

export const privacySchema = z.object({
  profile_visibility: z.boolean().default(false),
  contact_information: z.boolean().default(false),
  current_employer: z.boolean().default(false),
  activity_feed: z.boolean().default(false),
});

export const preferSchema = z.object({
  job_type: z.string().default('Full-time'),
  work_location: z.string().default('remote'),
  salary_range: z.string().default('50k-75k'),
  experience_level: z.string().default('mid'),
  preferred_industry: z.string().default('Information Technology (IT)'),
});

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
export type PreferFormValues = z.infer<typeof preferSchema>;
export type PrivacyFormValues = z.infer<typeof privacySchema>;
export type EmailFormValues = z.infer<typeof emailNotificationSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;