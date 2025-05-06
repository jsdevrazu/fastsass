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
  new_password: z.string().min(1, "Password is required"),
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



export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;