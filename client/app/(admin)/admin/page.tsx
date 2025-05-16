"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronDown,
  Download,
  FileText,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Briefcase className="h-5 w-5" />
            <span>FastSass Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "jobs" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("jobs")}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </Button>
            <Button
              variant={activeTab === "applications" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("applications")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Applications
            </Button>
            <Button
              variant={activeTab === "companies" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("companies")}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Companies
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button variant="outline" className="w-full">
            <Link href="/">Back to Site</Link>
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="sm">
            <span className="sr-only md:not-sr-only md:inline-block">Admin</span>
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="md:hidden mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">+12 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">432</div>
                    <p className="text-xs text-muted-foreground">+22% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Companies</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">+5 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,345</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>Recently posted jobs across all companies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Posted</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentJobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>
                              <Badge variant={job.status === "Active" ? "default" : "outline"}>{job.status}</Badge>
                            </TableCell>
                            <TableCell>{job.postedAt}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Job</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest job applications received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Job</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentApplications.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell className="font-medium">{application.applicant}</TableCell>
                            <TableCell>{application.job}</TableCell>
                            <TableCell>{application.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Jobs Management</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Job
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search jobs..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allJobsAdmin.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.applications}</TableCell>
                          <TableCell>
                            <Badge variant={job.status === "Active" ? "default" : "outline"}>{job.status}</Badge>
                          </TableCell>
                          <TableCell>{job.postedAt}</TableCell>
                          <TableCell>{job.expires}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Job</DropdownMenuItem>
                                <DropdownMenuItem>View Applications</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="applications" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.applicant}</TableCell>
                          <TableCell>{application.job}</TableCell>
                          <TableCell>{application.company}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(application.status)}>{application.status}</Badge>
                          </TableCell>
                          <TableCell>{application.date}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Resume</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete Application</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Helper function to get badge variant based on application status
function getStatusVariant(status: string) {
  switch (status) {
    case "Reviewed":
      return "default"
    case "Pending":
      return "outline"
    case "Interviewed":
      return "secondary"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const recentJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    status: "Active",
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems",
    status: "Active",
    postedAt: "3 days ago",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeStudio",
    status: "Active",
    postedAt: "1 week ago",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    status: "Inactive",
    postedAt: "5 days ago",
  },
]

const recentApplications = [
  {
    id: "1",
    applicant: "John Smith",
    job: "Senior Frontend Developer",
    date: "Today",
  },
  {
    id: "2",
    applicant: "Sarah Johnson",
    job: "UX/UI Designer",
    date: "Yesterday",
  },
  {
    id: "3",
    applicant: "Michael Brown",
    job: "Backend Engineer",
    date: "2 days ago",
  },
  {
    id: "4",
    applicant: "Emily Davis",
    job: "Product Manager",
    date: "3 days ago",
  },
]

const allJobsAdmin = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    applications: 24,
    status: "Active",
    postedAt: "May 15, 2023",
    expires: "Jun 15, 2023",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems",
    applications: 18,
    status: "Active",
    postedAt: "May 14, 2023",
    expires: "Jun 14, 2023",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeStudio",
    applications: 32,
    status: "Active",
    postedAt: "May 10, 2023",
    expires: "Jun 10, 2023",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    applications: 12,
    status: "Inactive",
    postedAt: "May 8, 2023",
    expires: "Jun 8, 2023",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "ProductLabs",
    applications: 28,
    status: "Active",
    postedAt: "May 5, 2023",
    expires: "Jun 5, 2023",
  },
]

const allApplications = [
  {
    id: "1",
    applicant: "John Smith",
    job: "Senior Frontend Developer",
    company: "TechCorp",
    status: "Reviewed",
    date: "May 16, 2023",
  },
  {
    id: "2",
    applicant: "Sarah Johnson",
    job: "UX/UI Designer",
    company: "CreativeStudio",
    status: "Interviewed",
    date: "May 15, 2023",
  },
  {
    id: "3",
    applicant: "Michael Brown",
    job: "Backend Engineer",
    company: "DataSystems",
    status: "Pending",
    date: "May 14, 2023",
  },
  {
    id: "4",
    applicant: "Emily Davis",
    job: "Product Manager",
    company: "ProductLabs",
    status: "Rejected",
    date: "May 13, 2023",
  },
  {
    id: "5",
    applicant: "David Wilson",
    job: "DevOps Engineer",
    company: "CloudTech",
    status: "Pending",
    date: "May 12, 2023",
  },
]
