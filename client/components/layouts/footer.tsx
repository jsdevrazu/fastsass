import Link from "next/link"
import Logo from "@/components/logo"

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="app_container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
                <div className="flex flex-col gap-2">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        <Logo />
                    </Link>
                    <p className="text-sm text-muted-foreground">Find your dream job or the perfect candidate.</p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">For Job Seekers</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/jobs" className="text-sm hover:underline">
                                Browse Jobs
                            </Link>
                            <Link href="/companies" className="text-sm hover:underline">
                                Companies
                            </Link>
                            <Link href="/resources/job-seekers" className="text-sm hover:underline">
                                Resources
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">For Employers</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/employer/post-job" className="text-sm hover:underline">
                                Post a Job
                            </Link>
                            <Link href="/pricing" className="text-sm hover:underline">
                                Pricing
                            </Link>
                            <Link href="/resources/employers" className="text-sm hover:underline">
                                Resources
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Company</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/about" className="text-sm hover:underline">
                                About
                            </Link>
                            <Link href="/contact" className="text-sm hover:underline">
                                Contact
                            </Link>
                            <Link href="/privacy" className="text-sm hover:underline">
                                Privacy
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="border-t">
                <div className="app_container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-8">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} JobPortal. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:underline">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer