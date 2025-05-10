import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { change_password } from "@/lib/apis/auth"
import { ChangePasswordFormData, changePasswordSchema } from "@/validation/auth.validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/store"
import ErrorMessage from "@/components/error-message"


const ChangePassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const router = useRouter()
    const { logout } = useAuthStore()


    const { isPending, mutate } = useMutation({
        mutationFn: change_password,
        onSuccess: () => {
            toast.success("Password Update Successfully")
            logout()
            router.push('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChangePasswordHandler = (data: ChangePasswordFormData) => {

        const payload = {
            current_password: data.current_password,
            new_password: data.new_password
        }
        mutate(payload)
    }


    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                            <div className="absolute top-3 left-0 flex items-center pl-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input id="current-password" type="password" className="pl-10" {...register('current_password')} error={errors?.current_password?.message} />
                            {errors.current_password && <ErrorMessage message={errors.current_password.message ?? ''} />}

                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                            <div className="absolute top-3 left-0 flex items-center pl-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input id="new-password" type="password" className="pl-10" {...register('new_password')} error={errors?.new_password?.message} />
                            {errors.new_password && <ErrorMessage message={errors.new_password.message ?? ''} />}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                            <div className="absolute top-3 left-0 flex items-center pl-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input id="confirm-password" type="password" className="pl-10" {...register('confirm_password')} error={errors?.confirm_password?.message} />
                            {errors.confirm_password && <ErrorMessage message={errors.confirm_password.message ?? ''} />}
                        </div>
                    </div>
                    <Button onClick={handleSubmit(handleChangePasswordHandler)} disabled={isPending} type="submit">
                        {isPending ? 'loading...' : 'Update Password'}
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default ChangePassword