"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/validation/auth.validation"
import { FileUpload } from "@/components/file-upload"
import ErrorMessage from "@/components/error-message"
import { useMutation } from "@tanstack/react-query"
import { register_user } from "@/lib/apis/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import SocialMediaButtonLogin from "@/components/social-button"



const SignupForm = () => {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "job_seeker"
        },
    });

    const role = watch("role");

    const registerUser = useMutation({
        mutationFn: (payload: FormData) => register_user(payload),
        onSuccess: () => {
            router.push("/verify-email")
        },
        onError: (error) => {
            toast.error(error.message)
        },
    });

    const onSubmit = async (data: RegisterFormData) => {

        const formData = new FormData()
        formData.append("first_name", data.firstName)
        formData.append("last_name", data.lastName)
        formData.append("avatar", data.avatar)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("company_name", data.company_name ?? '')
        formData.append("role", role)

        registerUser.mutate(formData)

    }

    return (
        <>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label>I am a</Label>
                        <RadioGroup
                            onValueChange={(value) => setValue("role", value)}
                            defaultValue="job_seeker"
                            className="flex"
                        >
                            <div className="flex items-center space-x-2 mr-4">
                                <RadioGroupItem value="job_seeker" id="job_seeker" />
                                <Label htmlFor="job_seeker">Job Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="employer" id="employer" />
                                <Label htmlFor="employer">Employer</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input placeholder="John" id="firstName" {...register("firstName")} error={errors?.firstName?.message} />
                            {errors.firstName && <ErrorMessage message={errors?.firstName?.message ?? ''} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" {...register("lastName")} placeholder="Doe" error={errors?.lastName?.message} />
                            {errors.lastName && <ErrorMessage message={errors?.lastName?.message ?? ''} />}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="m@example.com" error={errors?.email?.message} />
                        {errors.email && <ErrorMessage message={errors?.email?.message ?? ''} />}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" {...register("password")} type="password" error={errors?.password?.message} />
                        {errors.password && <ErrorMessage message={errors?.password?.message ?? ''} />}
                    </div>
                    <div className="space-y-2 mb-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={errors?.confirmPassword?.message} />
                        {errors.confirmPassword && <ErrorMessage message={errors?.confirmPassword?.message ?? ''} />}
                    </div>
                    {role === "employer" && (
                        <div className="mt-4">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                                {...register("company_name")}
                                id="company_name"
                            />
                            {errors.company_name && (
                                <p className="text-red-500 text-sm">{errors.company_name.message}</p>
                            )}
                        </div>
                    )}
                    <FileUpload name="avatar" label="Upload Avatar" control={control} />
                    <Button disabled={registerUser.isPending} className="w-full mt-4" type="submit">
                        {registerUser.isPending ? 'Create user...' : 'Create account'}
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>
                <SocialMediaButtonLogin role={role} />
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </div>
            </CardFooter>
        </>
    )
}

export default SignupForm