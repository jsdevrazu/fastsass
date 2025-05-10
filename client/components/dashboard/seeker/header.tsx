"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/store"
import { baseURLPhoto } from "@/lib/axios"

const SeekerDashboardHeader = () => {

    const { user } = useAuthStore()

    return (
        <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Button variant="outline" size="icon" className="md:hidden">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex justify-end items-center gap-2">
                <Avatar>
                    <AvatarImage className=" object-cover" src={`${baseURLPhoto(user?.avatar ?? '')}?height=32&width=32`} alt="User" />
                    <AvatarFallback>
                        {user?.first_name?.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
            </div>
        </header>
    )
}

export default SeekerDashboardHeader