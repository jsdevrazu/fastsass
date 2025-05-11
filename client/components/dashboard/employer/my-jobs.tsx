"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Download,
    MoreHorizontal,
    Plus,
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
import { useMutation, useQuery } from "@tanstack/react-query"
import EmployerJobsLoading from "@/app/(employer)/employer/my-jobs/loading"
import { delete_job, get_my_jobs } from "@/lib/apis/jobs"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { getStatusVariant } from "@/lib/utils"
import moment from "moment"
import { DataTable } from "@/components/data-table"
import api from '@/lib/axios'
import ApiStrings from "@/lib/api_strings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { OverlayLock } from "@/components/overlay-lock"
import { useAuthStore } from "@/store/store"


const MyJobs = () => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [isFetching, setIsFetching] = useState(false)
    const router = useRouter()
    const { user } = useAuthStore()


    const { isLoading, data, refetch } = useQuery<MyJobsResponse>({
        queryKey: ['my-jobs'],
        queryFn: () => get_my_jobs({ page: page + 1, limit })
    })

    const jobs = data?.jobs ?? []


    const { mutate, isPending} = useMutation({
        mutationFn: delete_job,
        onSuccess: () =>{
            refetch()
            toast.success("Job Delete Successfully")
        },
        onError: (error) =>{
            toast.error(error.message)
        }
    })

    const handleDelete = (id:string) =>{
        if(user?.feature?.is_active){
            mutate(id)
        } else {
            toast.error("Only Premium Plan you delete this job post")
        }
    }


    const columns: ColumnDef<MyJobs>[] = [
        {
            accessorKey: "title",
            header: "Job Title",
            cell: ({ row }) => row.original.title
        },
        {
            accessorKey: "applications",
            header: "Applications",
            cell: ({ row }) => row.original.total_applications,
        },
        {
            accessorKey: "application_status",
            header: "Status",
            cell: ({ row }) => <Badge variant={getStatusVariant(row.original.status)}>{row.original.status}</Badge>,
        },
        {
            accessorKey: "created_at",
            header: "Posted",
            cell: ({ row }) => moment(row.original?.created_at).format("MMM Do YY"),
        },
        {
            accessorKey: "application_dead_line",
            header: "Expires",
            cell: ({ row }) => moment(row.original?.application_dead_line).format("MMM Do YY"),
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
                        <DropdownMenuItem onClick={() => router.push(`/jobs/${row.original.slug}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/employer/edit-job/${row.original.slug}`)}>Edit Job</DropdownMenuItem>
                        <DropdownMenuItem>View Applications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(row.original._id)} className="text-destructive">Delete Job</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const handleExport = async () => {
        setIsFetching(true)
        try {
            const response = await api.get(ApiStrings.JOBS_EXPORT, {
                responseType: 'blob',
            })
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url

            link.setAttribute('download', 'job_applications_report.xlsx')
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            toast.error("Export Fail")
        } finally {
            setIsFetching(false)
        }
    }


    if (isLoading) return <EmployerJobsLoading />

    return (
        <>
        <OverlayLock visible={isPending} />
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">My Jobs</h2>
                <Button asChild>
                    <Link href="/employer/post-job">
                        <Plus className="mr-2 h-4 w-4" />
                        Post a Job
                    </Link>
                </Button>
            </div>
            <div className="flex items-center justify-end gap-2 mb-4">
                <Button onClick={handleExport} disabled={isFetching} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    {isFetching ? 'Exporting...' : 'Export'}
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={jobs ?? []}
                page={page}
                limit={limit}
                totalRows={jobs?.length || 0}
                searchKey='title'
                searchPlaceholder='Search by job title'
                onPaginationChange={(newPage, newLimit) => {
                    setPage(newPage);
                    setLimit(newLimit);
                }}
            />
        </>
    )
}

export default MyJobs