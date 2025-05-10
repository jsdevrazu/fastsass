"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/store"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const Header = () => {

    const { user } = useAuthStore()
    const router = useRouter()
    const { setTheme } = useTheme()


    return (
        <header className="border-b">
            <div className="app_container flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Logo />
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
                        Find Jobs
                    </Link>
                    <Link href="/companies" className="text-sm font-medium hover:underline underline-offset-4">
                        Companies
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
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
                    {
                        user ? <Button onClick={() => router.push(user?.role === 'job_seeker' ? '/seeker/dashboard' : user?.role === 'employer' ? '/employer' : '/admin')}>
                            Dashboard
                        </Button> : <>
                            <Link href="/register">
                                <Button variant="outline" size="sm">
                                    Register
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="sm">Sign In</Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header