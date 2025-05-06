"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Users,
  BarChart3,
  Building2
} from "lucide-react"
import { useAuthStore } from "@/store/store"
import { toast } from 'sonner'
import { logout_api } from "@/lib/apis/auth"
import Logo from "@/components/logo"

const navItemsSeeker = [
  {
    title: "Dashboard",
    href: "/seeker/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Applications",
    href: "/seeker/applications",
    icon: FileText,
  },
  {
    title: "Saved Jobs",
    href: "/seeker/saved-jobs",
    icon: Briefcase,
  },
  {
    title: "Profile",
    href: "/seeker/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/seeker/settings",
    icon: Settings,
  },
]

const navItemsEmployer = [
  {
    title: "Dashboard",
    href: "/employer",
    icon: LayoutDashboard,
  },
  {
    title: "My Jobs",
    href: "/employer/my-jobs",
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: "/employer/applications",
    icon: FileText,
  },
  {
    title: "Candidates",
    href: "/employer/candidates",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/employer/analytics",
    icon: BarChart3,
  },
  {
    title: "Company Profile",
    href: "/employer/company-profile",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/employer/settings",
    icon: Settings,
  },
]

const SeekerDashboardSidebar = () => {
  const pathname = usePathname()
  const { logout, user } = useAuthStore()
  const router = useRouter()
  const navItems = user?.role === 'employer' ? navItemsEmployer : navItemsSeeker


  const handleLogout = async () => {
    toast.success("Logout Successfully")
    logout()
    await logout_api()
    router.push("/login")
  }

  return (
    <div className="hidden h-screen w-64 flex-col border-r bg-muted/40 md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button onClick={handleLogout} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default SeekerDashboardSidebar
