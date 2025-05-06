"use client"

import { Button } from "@/components/ui/button"
import {
    Download,
    MoreHorizontal
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getStatusVariant } from "@/lib/utils"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { recent_application } from "@/lib/apis/jobs"
import EmployerJobsLoading from "@/app/(employer)/employer/my-jobs/loading"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import moment from "moment"

const MyJobsApplication = () => {


    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)

    const { isLoading, data } = useQuery<RecentApplication>({
        queryKey: ['recent_application'],
        queryFn: () => recent_application({ page: page + 1, limit, days: 365 }),
    })

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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Resume</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const applications = data?.applicants ?? []

    if (isLoading) return <EmployerJobsLoading />



    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={applications ?? []}
                page={page}
                limit={limit}
                totalRows={applications?.length || 0}
                searchKey='name'
                searchPlaceholder="Search by applicant name..."
                onPaginationChange={(newPage, newLimit) => {
                    setPage(newPage);
                    setLimit(newLimit);
                }}
            />
        </>
    )
}

export default MyJobsApplication
