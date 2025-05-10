"use client"
import { Button } from "@/components/ui/button"
import {
    Download,
    MoreHorizontal
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyCandidates } from "@/components/empty-states/empty-candidates"
import { useQuery } from "@tanstack/react-query"
import { get_candidates } from "@/lib/apis/jobs"
import { useState } from "react"
import EmployerJobsLoading from "@/app/(employer)/employer/my-jobs/loading"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { baseURLPhoto } from "@/lib/axios"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"

const Candidates = () => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)


    const { isLoading, data } = useQuery({
        queryKey: ['get_candidates'],
        queryFn: () => get_candidates({ page: page + 1, limit })
    })


    const columns: ColumnDef<Candidates>[] = [
        {
            accessorKey: "title",
            header: "Job",
            cell: ({ row }) => row.original.job_title
        },
        {
            accessorKey: "user",
            header: "Candidate",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={`${baseURLPhoto(row.original?.avatar)}?height=32&width=32&text=${row.original.avatar.charAt(0)}`}
                            alt={row.original.first_name}
                        />
                        <AvatarFallback>{row.original.first_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.original.first_name} {row.original.last_name}</div>
                        <div className="text-sm lowercase text-muted-foreground">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "skills",
            header: "Skills",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                {row.original.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            ),
        },
        {
            accessorKey: "experience",
            header: "Experience",
            cell: ({ row }) => row.original.experience
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => row.original.location
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Badge variant={getCandidateStatusVariant(row.original.application_status)} className="text-xs">
            {row.original.application_status}
          </Badge>
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Download Resume</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add to Shortlist</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ];

    const applications = data?.applicants ?? []

    if (isLoading) return <EmployerJobsLoading />


    return (
        <>
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Talent Pool</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Candidates</SelectItem>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="interviewed">Interviewed</SelectItem>
                                    <SelectItem value="offered">Offered</SelectItem>
                                    <SelectItem value="hired">Hired</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="all-skills">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Skills" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-skills">All Skills</SelectItem>
                                    <SelectItem value="react">React</SelectItem>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="node">Node.js</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Select defaultValue="match">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="match">Best Match</SelectItem>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                    <SelectItem value="experience">Experience</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {applications?.length > 0 ? (
                        <DataTable
                            columns={columns}
                            data={applications ?? []}
                            page={page}
                            limit={limit}
                            totalRows={applications?.length || 0}
                            searchKey='title'
                            searchPlaceholder="Search by job title..."
                            onPaginationChange={(newPage, newLimit) => {
                                setPage(newPage);
                                setLimit(newLimit);
                            }}
                        />
                    ) : (
                        <EmptyCandidates />
                    )}
                </div>
            </main>
        </>
    )
}

export default Candidates



function getCandidateStatusVariant(status: string) {
    switch (status) {
        case "Shortlisted":
            return "default"
        case "Interviewed":
            return "secondary"
        case "Offered":
            return "default"
        case "Hired":
            return "default"
        case "Rejected":
            return "destructive"
        default:
            return "outline"
    }
}
