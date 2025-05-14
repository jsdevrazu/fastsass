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
  Building2
} from "lucide-react"
import { useAuthStore } from "@/store/store"
import { toast } from 'sonner'
import { logout_api } from "@/lib/apis/auth"
import Logo from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { calculateRemainingDays } from "@/lib/utils/date-formater"

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
  const used_job = user?.feature?.used_job ?? 0
  const limit_job = user?.feature?.max_job_post ?? 0
  const jobPostUsagePercent = Math.round((used_job / limit_job) * 100)

  const getUsageColor = (percent: number) => {
    if (percent < 60) return "bg-green-500"
    if (percent < 85) return "bg-yellow-500"
    return "bg-red-500"
  }


  const handleLogout = async () => {
    logout()
    router.push("/login")
    toast.success("Logout Successfully")
    await logout_api()
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
            const Icon = item.icon;
            const isActive = pathname === item.href;
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
            );
          })}
        </nav>

        {user?.role === 'employer' && user?.feature && (
          <div className="mt-6 px-3">
            <div className="rounded-md border p-3 bg-background">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Usage Limits</h4>
                <Link href="/pricing">
                  <Badge variant="secondary" className="cursor-pointer">
                    Upgrade
                  </Badge>
                </Link>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Job Posts</span>
                        <span
                          className={cn(
                            "font-medium",
                            jobPostUsagePercent > 85
                              ? "text-red-500"
                              : jobPostUsagePercent > 60
                                ? "text-yellow-500"
                                : "text-green-500",
                          )}
                        >
                          {user?.feature?.used_job}/{user?.feature?.max_job_post}
                        </span>
                      </div>
                      <Progress
                        value={jobPostUsagePercent}
                        className="h-2"
                        indicatorClassName={getUsageColor(jobPostUsagePercent)}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You've used {jobPostUsagePercent}% of your job posting limit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="mt-2 text-xs text-muted-foreground">
                <p>Plan renews in {calculateRemainingDays(user?.feature?.next_billing_date)} days</p>
              </div>
            </div>
          </div>
        )}
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
