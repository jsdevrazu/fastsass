"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart3,
    Briefcase,
    FileText,
    MoreHorizontal,
    Users,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getStatusVariant } from "@/lib/utils"
import { useQueries, UseQueryResult } from "@tanstack/react-query"
import moment from "moment"
import { employer_active_jobs, get_employer_stats, recent_application } from "@/lib/apis/jobs"
import JobSeekerDashboardLoading from "@/components/dashboard/seeker/dashboard-loading"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { EmptyState } from "@/components/ui/empty-state"
import { format } from "date-fns";
import { useRouter } from "next/navigation"
import Link from "next/link"
import { baseURLPhoto } from "@/lib/axios"


export default function EmployerDashboard() {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [shouldFetch, setShouldFetch] = useState(false);
    const router = useRouter()

    const queries = useQueries({
        queries: [
            {
                queryKey: ["employer_stats"],
                queryFn: get_employer_stats,
                enabled: shouldFetch,
            },
            {
                queryKey: ["recent_application", page, limit],
                queryFn: () => recent_application({ page: page + 1, limit, days: 10 }),
                enabled: shouldFetch,
            },
            {
                queryKey: ["seeker-dashboard-stats", page, limit],
                queryFn: () => employer_active_jobs({ page: page + 1, limit }),
                enabled: shouldFetch,
            },
        ],
    });

    const [
        { data: stats, isLoading: isApplicationsLoading },
        { data: applications, isLoading: isRecommendedJobsLoading },
        { data: activeJobs, isLoading: isStatsLoading }
    ] = queries as [
        UseQueryResult<EmployerStats>,
        UseQueryResult<RecentApplication>,
        UseQueryResult<ActiveJobs>
    ];

    const handleDownload = (name: string, url: string) => {
        const resumeUrl = baseURLPhoto(url);
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.setAttribute("download", `${name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };


    const columns: ColumnDef<ApplicantsEntity>[] = [
        {
            accessorKey: "name",
            header: "Applicant",
            cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`
        },
        {
            accessorKey: "job_title",
            header: "Job",
            cell: ({ row }) => row.original.job_title,
        },
        {
            accessorKey: "application_status",
            header: "Application Status",
            cell: ({ row }) => <Badge variant={getStatusVariant(row.original.application_status)}>{row.original.application_status}</Badge>,
        },
        {
            accessorKey: "created_at",
            header: "Applied",
            cell: ({ row }) => moment(row.original?.created_at).format("MMM Do YY"),
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/employer/apps/${row.original?.user_id}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(`${row.original.first_name?.toLowerCase()}_${row.original.last_name?.toLowerCase()}`, row.original.resume)}>Download Resume</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const activeDataJobs = activeJobs?.jobs ?? []

    useEffect(() => {
    setShouldFetch(true);
    }, []);

    if (isApplicationsLoading || isRecommendedJobsLoading || isStatsLoading) {
        return <JobSeekerDashboardLoading />
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col">
                <main className="flex-1 overflow-auto">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.active_jobs}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.total_application}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Candidates Interviewed</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.interviewed}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Job Views</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats?.jobs_view}</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                                <CardDescription>Latest applications for your job postings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columns}
                                    data={applications?.applicants ?? []}
                                    page={page}
                                    limit={limit}
                                    totalRows={applications?.applicants?.length || 0}
                                    searchKey='name'
                                    enableSearch={false}
                                    onPaginationChange={(newPage, newLimit) => {
                                        setPage(newPage);
                                        setLimit(newLimit);
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Your Active Jobs</CardTitle>
                                <CardDescription>Currently active job postings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activeDataJobs?.length > 0 ? activeDataJobs?.map((job) => (
                                        <div key={job._id} className="space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-medium">{job.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>{job.location}</span>
                                                        <span>•</span>
                                                        <span>{job.job_type}</span>
                                                    </div>
                                                </div>
                                                <Badge>{job.total_applications} apps</Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>Posted {moment(job?.created_at).startOf('day').fromNow()}</span>
                                                <span>•</span>
                                                <span>Expires in {format(job?.application_dead_line, "MM/dd/yyyy")}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/jobs/${job?.slug}`}>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/employer/edit-job/${job?.slug}`}>
                                                    <Button size="sm" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    )) : <EmptyState
                                        icon={Briefcase}
                                        title="No active jobs available"
                                        description="There are currently no acive job listings available. Please check back later or create an alert to be notified when new jobs are posted."
                                    />}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

