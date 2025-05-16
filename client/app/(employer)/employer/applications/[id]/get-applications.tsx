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
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { get_applications_based_on_job, update_application_status } from "@/lib/apis/jobs"
import EmployerJobsLoading from "@/app/(employer)/employer/my-jobs/loading"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import moment from "moment"
import api, { baseURLPhoto } from '@/lib/axios'
import { toast } from "sonner"
import ApiStrings from "@/lib/api_strings"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyApplications } from "@/components/empty-states/empty-applications"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const MyJobsApplication = ({ id } :{ id: string}) => {


    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const router = useRouter()

    const { isLoading, data } = useQuery<JobResponseApplications>({
        queryKey: ['get_applications_based_on_job'],
        queryFn: () => get_applications_based_on_job({ page: page + 1, limit, id }),
    })

    const [statusFilter, setStatusFilter] = useState("all")
    const [applications, setApplications] = useState<JobApplicationsEntity[]>([]);

    const filteredApplications =
        statusFilter === "all"
            ? applications
            : applications.filter((app) => app.application_status.toLowerCase() === statusFilter)

    const hasApplications = filteredApplications.length > 0

    const { mutate } = useMutation({
        mutationFn: update_application_status,
        onSuccess: (_, variables) => {
            const { id, application_status } = variables;

            const updatedApplications = applications.map((app) => {
                if (app._id === id) {
                    return { ...app, application_status };
                }
                return app;
            });

            setApplications(updatedApplications);

            toast.success("Status updated", {
                description: `Application status changed to ${application_status}.`,
            });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    

    const handleDownload = (name: string, url: string) => {
        const resumeUrl = baseURLPhoto(url);
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.setAttribute("download", `${name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };


    const columns: ColumnDef<JobApplicationsEntity>[] = [
        {
            accessorKey: "name",
            header: "Applicant",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={baseURLPhoto(row.original.avatar)}
                            alt={row.original.first_name}
                        />
                        <AvatarFallback>{row.original.first_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.original.first_name} {row.original.last_name}</div>
                        <div className="text-sm text-muted-foreground lowercase">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "job_title",
            header: "Job",
            cell: ({ row }) => row.original.title,
        },
        {
            accessorKey: "application_status",
            header: "Application Status",
            cell: ({ row }) => <Badge variant={getStatusVariant(row.original.application_status)}>{row.original.application_status}</Badge>,
        },
        {
            accessorKey: "match",
            header: "Profile Match",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <div className="h-2 w-16 rounded-full bg-muted">
                        <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${row.original.match_percentage}%` }}
                        ></div>
                    </div>
                    <span className="ml-2 text-sm">{row.original.match_percentage}%</span>
                </div>
            ),
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
                        <DropdownMenuItem onClick={() => router.push(`/employer/apps/${row.original.user_id}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(`${row.original.first_name?.toLowerCase()}_${row.original.last_name?.toLowerCase()}`, row.original.resume)}>Download Resume</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => handleStatusChange(row.original._id, "Pending")}
                            disabled={row.original.application_status === "Pending"}
                        >
                            Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleStatusChange(row.original._id, "Reviewed")}
                            disabled={row.original.application_status === "Reviewed"}
                        >
                            Mark as Reviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleStatusChange(row.original._id, "Interviewed")}
                            disabled={row.original.application_status === "Interviewed"}
                        >
                            Mark as Interviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleStatusChange(row.original._id, "Rejected")}
                            disabled={row.original.application_status === "Rejected"}
                        >
                            Mark as Rejected
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const handleStatusChange = (id: string, newStatus: string) => {
        mutate({ id, application_status: newStatus });
    }

    useEffect(() => {
        if (data?.applications) {
            setApplications(data.applications);
        }
    }, [data?.applications]);


    if (isLoading) return <EmployerJobsLoading />



    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">{data?.title} Applications</h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
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
        </>
    )
}

export default MyJobsApplication
