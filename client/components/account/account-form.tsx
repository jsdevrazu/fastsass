import type React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { ProfileFormValues, profileSchema } from "@/validation/auth.validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useAuthStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { update_current_user } from "@/lib/apis/auth"
import { toast } from "sonner"
import { baseURLPhoto } from "@/lib/axios"

const EmployerProfile = () => {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const { user } = useAuthStore()

    const { mutate, isPending } = useMutation({
        mutationFn: update_current_user,
        onSuccess: () => {
            toast.success("Profile Update Successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            avatar: "",
        },
    })

    useEffect(() => {
        if (user) {
            setPreview(user.avatar || null)
            setValue("first_name", user.first_name)
            setValue("last_name", user.last_name)
            setValue("email", user.email)
            setValue("avatar", user.avatar)
        }
    }, [user])

    const onSubmit = (data: ProfileFormValues) => {
        const formData = new FormData()
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("email", data.email)
        if (selectedFile) {
            formData.append("avatar", selectedFile)
        }
        mutate(formData)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            setValue("avatar", "")
        }
    }

    const removeAvatar = () => {
        setSelectedFile(null)
        setPreview(null)
        setValue("avatar", "")
        if (fileRef.current) fileRef.current.value = ""
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                    Update your account details and email preferences
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input id="first_name" {...register("first_name")} />
                        {errors.first_name && (
                            <p className="text-sm text-red-500">{errors.first_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input id="last_name" {...register("last_name")} />
                        {errors.last_name && (
                            <p className="text-sm text-red-500">{errors.last_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Upload Avatar</Label>
                        <Input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {preview && (
                        <div className="relative w-24 h-24">
                            <Image
                                src={(baseURLPhoto(preview))}
                                alt="Avatar Preview"
                                fill
                                className="rounded-full object-cover border"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={removeAvatar}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    )}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default EmployerProfile
