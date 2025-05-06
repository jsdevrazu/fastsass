"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, FileText, MapPin, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getStatusVariant } from "@/lib/utils"
import { useQueries, UseQueryResult } from "@tanstack/react-query"
import { get_recet_applications, get_recomanded_jobs, get_seeker_dashboard_stats } from "@/lib/apis/jobs"
import JobSeekerDashboardLoading from "@/components/dashboard/seeker/dashboard-loading"
import moment from "moment"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { EmptyState } from "@/components/ui/empty-state"

const Dashboard = () => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)

    const queries = useQueries({
        queries: [
            {
                queryKey: ["applications"],
                queryFn: () => get_recet_applications({ page: 1, limit: 10 }),
            },
            {
                queryKey: ["recommended-jobs"],
                queryFn: () => get_recomanded_jobs({ page: 1, limit: 10 }),
            },
            {
                queryKey: ["seeker-dashboard-stats"],
                queryFn: get_seeker_dashboard_stats,
            },
        ],
    });

    const [
        { data: applications, isLoading: isApplicationsLoading },
        { data: recommendedJobs, isLoading: isRecommendedJobsLoading },
        { data: dashboardStats, isLoading: isStatsLoading }
    ] = queries as [
        UseQueryResult<ApplicationResponse>,
        UseQueryResult<RecommedJobsResponse>,
        UseQueryResult<StatsResponse>
    ];

    const columns: ColumnDef<ApplicationsEntity>[] = [
        {
            accessorKey: "job_title",
            header: "Job Title",
            cell: ({ row }) => row.original.job?.title
        },
        {
            accessorKey: "company_name",
            header: "Company",
            cell: ({ row }) => row.original.company_name,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => row.original.job?.location
        },
        {
            accessorKey: "application_status",
            header: "Application Status",
            cell: ({ row }) => <Badge variant={getStatusVariant(row.original.application_status)}>{row.original.application_status}</Badge>,
        },
        {
            accessorKey: "created_at",
            header: "Applied",
            cell: ({ row }) => moment(row.original?.job?.created_at).format("MMM Do YY"),
        }
    ];

    const recommendedJobsData = recommendedJobs?.recommended_jobs ?? []

    if (isApplicationsLoading || isRecommendedJobsLoading || isStatsLoading) {
        return <JobSeekerDashboardLoading />
    }


    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Applications</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.application}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.interviewed}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.save_jobs}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.profile_views}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Your most recent job applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={applications?.applications ?? []}
                            page={page}
                            limit={limit}
                            totalRows={applications?.total || 0}
                            searchKey='job_title'
                            enableSearch={false}
                            onPaginationChange={(newPage, newLimit) => {
                                setPage(newPage);
                                setLimit(newLimit);
                            }}
                        />
                        <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/seeker/applications">
                                    View all applications
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recommended Jobs</CardTitle>
                        <CardDescription>Jobs that match your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recommendedJobsData?.length > 0 ? recommendedJobsData?.map((job) => (
                                <div key={job._id} className="space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">{job.title}</h3>
                                            <p className="text-sm text-muted-foreground">{job.company_name}</p>
                                        </div>
                                        <Badge variant="outline">{job.job_type}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={`/jobs/${job._id}`}>View</Link>
                                        </Button>
                                        <Button size="sm" asChild>
                                            <Link href={`/jobs/${job._id}/apply`}>Apply</Link>
                                        </Button>
                                    </div>
                                </div>
                            )) : <>

                                <EmptyState
                                    icon={Briefcase}
                                    title="No Recommended Jobs available For You"
                                    description="There are currently no job listings available. Please check back later or create an alert to be notified when new jobs are posted."
                                />

                            </>}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/jobs">Browse more jobs</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Dashboard