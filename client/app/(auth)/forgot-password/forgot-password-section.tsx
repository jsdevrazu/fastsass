"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from '@tanstack/react-query'
import { forgot_password } from '@/lib/apis/auth'
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/validation/auth.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/error-message'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const ForgotPasswordForm = () => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });


    const { isPending, mutate } = useMutation({
        mutationFn: forgot_password,
        onSuccess: () =>{
            toast.success("Otp Resend Successfully")
            router.push("/reset-password")
        },
        onError: (error) =>{
            toast.error(error?.message)
        }
    })

    const onSubmit = (data: ForgotPasswordFormData) => {
        mutate(data.email)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register('email')} error={errors?.email?.message ?? ''} />
                {errors?.email && <ErrorMessage message={errors?.email?.message ?? ''} />}
            </div>
            <Button disabled={isPending} className="w-full mt-3" type="submit">
                {isPending ? 'loading...': 'Send reset link'}
            </Button>
        </form>
    )
}

export default ForgotPasswordForm