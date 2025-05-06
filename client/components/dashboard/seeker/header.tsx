"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/store"
import { baseURLPhoto } from "@/lib/axios"
import { Moon, Sun } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

const SeekerDashboardHeader = () => {

    const { setTheme} = useTheme()
    const { user } = useAuthStore()

    return (
        <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Button variant="outline" size="icon" className="md:hidden">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex justify-end items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Avatar>
                    <AvatarImage className=" object-cover" src={`${baseURLPhoto(user?.avatar ?? '')}?height=32&width=32`} alt="User" />
                    <AvatarFallback>
                        {user?.first_name.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
            </div>
        </header>
    )
}

export default SeekerDashboardHeader