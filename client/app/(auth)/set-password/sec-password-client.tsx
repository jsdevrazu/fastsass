"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import ErrorMessage from "@/components/error-message"
import { useMutation } from "@tanstack/react-query"
import { set_password } from "@/lib/apis/employer"
import Link from "next/link"

const passwordSchema = z
    .object({
        password: z.string().min(6, {
            message: "Password must be at least 6 characters",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type PasswordFormValues = z.infer<typeof passwordSchema>


export default function SetPasswordPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token") || ""
    const email = searchParams.get("email") || ""

    const [resetResult, setResetResult] = useState<{ success: boolean; message?: string } | null>(null)

    const { control, handleSubmit, formState: { errors } } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: set_password,
        onSuccess: () => {
            setResetResult({
                success: true,
                message: "Your password has been reset successfully. You can now log in with your new password.",
            })
        },
        onError: (error) => {
            setResetResult({
                success: false,
                message: error?.message || "An error occurred. Please try again later.",
            })
        }
    })

    async function onSubmit(data: PasswordFormValues) {
        if (!token || !email) {
            setResetResult({
                success: false,
                message: "Invalid reset link. Please request a new password reset.",
            })
            return
        }

        const payload = {
            email,
            token,
            password: data.password
        }
        mutate(payload)

    }

    if (!token || !email) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
                        <CardDescription>The password reset link is invalid or has expired.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Please request a new password reset link.</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Link href='/forgot-password'>
                            <Button className="w-full">
                                Request New Link
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    if (resetResult?.success) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Password Reset Successful</CardTitle>
                        <CardDescription>Your password has been updated successfully.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Success</AlertTitle>
                            <AlertDescription className="text-green-700">{resetResult.message}</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Link href='/login'>
                            <Button className="w-full">
                                Go to Login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Set New Password</CardTitle>
                    <CardDescription>Create a new password for your account: {email}</CardDescription>
                </CardHeader>
                <CardContent>
                    {resetResult?.success === false && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{resetResult.message}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="new_password">New Password</Label>
                                    <Input
                                        type='password'
                                        placeholder="Enter your new password"
                                        id="new_password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors?.password?.message ?? ''}
                                    />
                                    {errors?.password?.message && <ErrorMessage message={errors?.password?.message ?? ''} />}
                                </div>

                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <div className="space-y-2">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input
                                        type='password'
                                        placeholder="Confirm your new password"
                                        id="confirm_password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors?.confirmPassword?.message ?? ''}
                                    />
                                    {errors?.confirmPassword?.message && <ErrorMessage message={errors?.confirmPassword?.message ?? ''} />}
                                </div>

                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Setting Password..." : "Set Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
