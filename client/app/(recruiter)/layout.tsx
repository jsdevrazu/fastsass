import SeekerDashboardHeader from "@/components/dashboard/seeker/header"
import SeekerDashboardSidebar from "@/components/dashboard/seeker/sidebar"

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden"> 
      <SeekerDashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <SeekerDashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6"> 
          {children}
        </main>
      </div>
    </div>
  )
}
