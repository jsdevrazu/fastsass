"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ResetPasswordFormData, resetPasswordSchema } from "@/validation/auth.validation"
import { useMutation } from "@tanstack/react-query"
import { reset_password } from "@/lib/apis/auth"


export default function OTPVerificationPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [serverError, setServerError] = useState("")

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: reset_password,
        onSuccess: () => {
            setIsSuccess(true)
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        },
        onError: (error) => {
            setServerError(error?.message)
        }
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        mutate({ otp: data.otp, new_password: data.password })
    }

    if (isSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-green-600">সফলভাবে সম্পন্ন হয়েছে!</CardTitle>
                        <CardDescription>আপনার পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <p className="text-center text-gray-600">আপনি কয়েক সেকেন্ডের মধ্যে লগইন পেজে রিডাইরেক্ট হবেন</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">পাসওয়ার্ড রিসেট করুন</CardTitle>
                    <CardDescription>আপনার ইমেইলে পাঠানো ৬ ডিজিটের OTP কোড এবং নতুন পাসওয়ার্ড দিন</CardDescription>
                </CardHeader>

                {serverError && (
                    <CardContent className="pt-0 pb-0 mb-4">
                        <Alert variant="destructive">
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    </CardContent>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>OTP কোড</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={4} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>নতুন পাসওয়ার্ড</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={showPassword ? "text" : "password"} className="pr-10" {...field} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={showConfirmPassword ? "text" : "password"} className="pr-10" {...field} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "loading..." : "Reset Password"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
