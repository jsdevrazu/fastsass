"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/store"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"

const Header = () => {

    const { user } = useAuthStore()
    const router = useRouter()

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