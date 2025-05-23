"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { LoginFormData, loginSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/apis/auth"
import { useAuthStore } from "@/store/store"
import ErrorMessage from "@/components/error-message"
import { toast } from 'sonner'
import SocialMediaButtonLogin from "@/components/social-button"
import { Button } from "@/components/ui/button"



const LoginForm = () => {

    const router = useRouter()
    const [redirectFromQuery, setRedirectFromQuery] = useState<string | null>(null);
    const { setLogin } = useAuthStore()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            function callback() {
                toast.success("Login successful! Redirecting...")
                setLogin(data?.access_token, data?.refresh_token, data?.user);
                setErrorMessage(null);
            }


            const role = data.user?.role;

            let redirectTo = "/";

            if (redirectFromQuery) {
                redirectTo = redirectFromQuery;
            } else {
                switch (role) {
                    case "admin":
                        callback()
                        redirectTo = "/admin";
                        break;
                    case "employer":
                        callback()
                        redirectTo = "/employer";
                        break;
                    case "job_seeker":
                        callback()
                        redirectTo = "/seeker/dashboard";
                        break;
                    default:
                        redirectTo = "/dev";
                }
            }


            router.push(redirectTo);
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });

    const onSubmit = (data: LoginFormData) => {
        const input = {
            email: data.email,
            password: data.password,
        };
        login.mutate(input);
    };



    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get("redirect");
            setRedirectFromQuery(redirect);
        }
    }, []);

    return (
        <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        error={errors?.email?.message}
                        {...register("email")}
                    />
                    {errors.email && <ErrorMessage message={errors.email.message ?? ''} />}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        error={errors?.password?.message}
                        {...register("password")}
                    />
                    {errors.password && <ErrorMessage message={errors.password.message ?? ''} />}
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                        Remember me
                    </Label>
                </div>
                {errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )}
                <Button className="w-full" type="submit" disabled={login.isPending}>
                    {login.isPending ? "Logging in..." : "Login"}
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
            <SocialMediaButtonLogin />
        </CardContent>
    )
}

export default LoginForm