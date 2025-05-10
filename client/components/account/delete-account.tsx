import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { delete_me } from "@/lib/apis/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/store"

const DeleteAccount = () => {

    const router = useRouter()
    const { logout } = useAuthStore()


    const { isPending: loading, mutate: muFn } = useMutation({
        mutationFn: delete_me,
        onSuccess: () => {
            toast.success("Your Account Has been deleted")
            logout()
            router.push('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const deleteAccount = () => {
        muFn()
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all of your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                        <p className="text-sm">
                            Warning: Deleting your account is permanent and cannot be undone. All your data, including your
                            profile, applications, and saved jobs will be permanently removed.
                        </p>
                    </div>
                    <Button disabled={loading} onClick={deleteAccount} variant="destructive" type="button">
                        {loading ? 'loading..' : 'Delete Account'}
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default DeleteAccount