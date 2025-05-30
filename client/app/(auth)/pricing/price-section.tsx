"use client"
import { OverlayLock } from "@/components/overlay-lock"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { create_payment_link } from "@/lib/apis/payment"
import { useAuthStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



const PriceSection = () => {

    const router = useRouter()
    const { user } = useAuthStore()

    const { isPending, mutate } = useMutation({
        mutationFn: create_payment_link,
        onSuccess: (data) => {
            window.location.href = data?.checkout_url
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handlePayment = (price_id: string) => {

        if (!user) {
            toast.warning("Before payment you need to login")
            router.push('/login?redirect=pricing')
        } else {
            mutate({ email: user?.email ?? '', price_id })
        }
    }


    return (
        <>
        <OverlayLock visible={isPending} />
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3 md:gap-8">
            <Card className="flex flex-col">
                <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-2xl">Basic</CardTitle>
                    <CardDescription>Perfect for small businesses</CardDescription>
                    <div className="mt-4">
                        <span className="text-4xl font-bold">5000 BDT</span>
                        <span className="text-muted-foreground"> /month</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span>5 job postings per month</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => handlePayment(process.env.NEXT_PUBLIC_BASIC ?? '')} disabled={isPending} className="w-full">
                        {isPending ? 'loading...' : 'Get Started'}
                    </Button>
                </CardFooter>
            </Card>
            <Card className="flex flex-col border-primary">
                <CardHeader className="flex flex-col space-y-1.5">
                    <div className="mx-auto -mt-6 mb-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                        Popular
                    </div>
                    <CardTitle className="text-2xl">Professional</CardTitle>
                    <CardDescription>For growing companies</CardDescription>
                    <div className="mt-4">
                        <span className="text-4xl font-bold">15000 BDT</span>
                        <span className="text-muted-foreground"> /month</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span>15 job postings per month</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => handlePayment(process.env.NEXT_PUBLIC_PROFESTIONAL ?? '')} disabled={isPending} className="w-full">
                        {isPending ? 'loading...' : 'Get Started'}
                    </Button>
                </CardFooter>
            </Card>
            <Card className="flex flex-col">
                <CardHeader className="flex flex-col space-y-1.5">
                    <CardTitle className="text-2xl">Enterprise</CardTitle>
                    <CardDescription>For large organizations</CardDescription>
                    <div className="mt-4">
                        <span className="text-4xl font-bold">30000 BDT</span>
                        <span className="text-muted-foreground"> /month</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span>50 job postings per month</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => handlePayment(process.env.NEXT_PUBLIC_PREMIUM ?? '')} disabled={isPending} className="w-full">
                        {isPending ? 'loading...' : 'Get Started'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
        </>
    )
}

export default PriceSection