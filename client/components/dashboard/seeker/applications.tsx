"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TableLoader from "@/components/dashboard/seeker/table-loader"

import { getStatusVariant } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { get_applications } from "@/lib/apis/jobs"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"
import { DataTable } from "@/components/data-table"


const Applications = () => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)

    const { data, isLoading } = useQuery<ApplicationResponse>({
        queryKey: ['get_all_application'],
        queryFn: () => get_applications({ page: page + 1, limit })
    })

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
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Link href={`/${row.original._id}`}>
                    <Button variant="outline" size="sm">
                        View Job
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        isLoading ? <TableLoader /> : <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">My Applications</h2>
                <Button asChild>
                    <Link href="/jobs">Apply to More Jobs</Link>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.applications ?? []}
                page={page}
                limit={limit}
                totalRows={data?.total || 0}
                searchKey='job_title'
                onPaginationChange={(newPage, newLimit) => {
                    setPage(newPage);
                    setLimit(newLimit);
                }}
            />
        </>
    )
}

export default Applications