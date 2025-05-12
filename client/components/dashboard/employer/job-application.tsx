"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    MoreHorizontal,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyApplications } from "@/components/empty-states/empty-applications"
import { useQuery } from "@tanstack/react-query"
import { get_job_applications } from "@/lib/apis/jobs"
import EmployerJobsLoading from "@/app/(employer)/employer/my-jobs/loading"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"
import { getStatusVariant } from "@/lib/utils"
import { baseURLPhoto } from "@/lib/axios"

export default function EmployerApplicationsPage({ id }: { id: string }) {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)

    const { isLoading, data } = useQuery<JobApplicationResponse>({
        queryKey: ['get_job_applications'],
        queryFn: () => get_job_applications({ page: page + 1, limit, id }),
        enabled: id ? true : false
    })

    const allApplications = data?.applicants ?? []
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredApplications =
        statusFilter === "all"
            ? allApplications
            : allApplications.filter((app) => app.application_status.toLowerCase() === statusFilter)

    const hasApplications = filteredApplications.length > 0
    console.log("data", data)


    const columns: ColumnDef<JobApplication>[] = [
        {
            accessorKey: "name",
            header: "Applicant",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={baseURLPhoto(row.original?.avatar)}
                            alt={row.original?.first_name}
                        />
                        <AvatarFallback>{row.original?.first_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.original?.first_name} {row.original?.last_name}</div>
                        <div className="text-sm text-muted-foreground lowercase">{row.original?.email}</div>
                    </div>
                </div>
            )
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
            cell: ({ row }) => moment(row.original?.applied_at).format("MMM Do YY"),
        },
        {
            accessorKey: "match",
            header: "Match",
            cell: ({ row }) => '85%',
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    if (isLoading) return <EmployerJobsLoading />

    return (

        <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Applications</h2>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setStatusFilter}>
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                            <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {hasApplications ? (
                    <DataTable
                        columns={columns}
                        data={filteredApplications ?? []}
                        page={page}
                        limit={limit}
                        totalRows={data?.total || 0}
                        searchKey='name'
                        searchPlaceholder="Search by applicant name..."
                        onPaginationChange={(newPage, newLimit) => {
                            setPage(newPage);
                            setLimit(newLimit);
                        }}
                    />
                ) : (
                    <EmptyApplications />
                )}
            </div>
        </main>
    )
}

