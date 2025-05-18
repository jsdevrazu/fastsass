"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import DashboardSidebar from "@/components/dashboard/seeker/sidebar"
import SeekerDashboardHeader from "@/components/dashboard/seeker/header"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full flex h-full">
            <div className="lg:hidden absolute top-2 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <DashboardSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            <aside className="hidden lg:block lg:w-64  border-r bg-muted/40 h-full fixed">
                <DashboardSidebar />
            </aside>


            <main className="ml-0 lg:ml-64 flex-1">
                <SeekerDashboardHeader />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
