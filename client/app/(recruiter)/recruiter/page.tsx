import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, Briefcase, Clock, BarChart3, CheckCircle2 } from "lucide-react"
import Link from "next/link"

import RecruitmentMetrics from "@/components/dashboard/recruiter/recruitment-metrics"
import CandidatePipeline from "@/components/dashboard/recruiter/candidate-pipeline"
import RecentApplications from "@/components/dashboard/recruiter/recent-applications"

export default function RecruiterDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="default" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
              <span>3 new jobs this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
              <span>18 new candidates this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interviews Scheduled</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
              <span>8 interviews today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time-to-Hire (avg)</p>
                <p className="text-2xl font-bold">18 days</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
              <span>2 days faster than last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recruitment Metrics */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recruitment Metrics</CardTitle>
          <CardDescription>Key performance indicators for your recruitment process</CardDescription>
        </CardHeader>
        <CardContent>
          <RecruitmentMetrics />
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="applications">Recent Applications</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Candidate Pipeline</CardTitle>
                  <CardDescription>Track candidates through each stage of the hiring process</CardDescription>
                </div>
                <Link href="/dashboard/recruiter/candidates">
                  <Button variant="outline">View All Candidates</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <CandidatePipeline />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest applications received across all job postings</CardDescription>
                </div>
                <Button variant="outline">View All Applications</Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecentApplications />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks & Reminders</CardTitle>
              <CardDescription>Upcoming tasks and reminders for your recruitment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Review Frontend Developer applications</p>
                      <p className="text-sm text-muted-foreground">Due today</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Mark Complete
                  </Button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Schedule interviews for UX Designer shortlist</p>
                      <p className="text-sm text-muted-foreground">Due tomorrow</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Mark Complete
                  </Button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Briefcase className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Draft job description for Product Manager</p>
                      <p className="text-sm text-muted-foreground">Due in 2 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Mark Complete
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Follow up with Marketing candidates</p>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Mark Complete
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
