"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { get_saved_jobs } from "@/lib/apis/jobs"
import { useState } from "react"
import CardSkeleton from "@/components/dashboard/seeker/card-skeleton"
import { EmptyState } from "@/components/ui/empty-state"

const SavedJobs = () => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)



    const { isLoading, data } = useQuery<SavedJobResponse>({
        queryKey: ['get_saved_jobs'],
        queryFn: () => get_saved_jobs()
    })

    const jobs = data?.jobs ?? []

    if (isLoading) return <CardSkeleton />

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Saved Jobs</h2>
                <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                </Button>
            </div>
            {
                jobs?.length > 0 ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {jobs?.map((job) => (
                        <Card key={job._id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="capitalize">{job.saved_jobs.title}</CardTitle>
                                        <CardDescription className="capitalize">{job.saved_jobs.company_name}</CardDescription>
                                    </div>
                                    <Badge variant="outline">{job.saved_jobs.job_type}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.saved_jobs.location}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{job.saved_jobs.meta_description}</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/jobs/${job._id}`}>View</Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link href={`/jobs/${job._id}/apply`}>Apply</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div> : <EmptyState
                    icon={Briefcase}
                    title="No saved jobs available"
                    description="There are currently no job listings available. Please check back later or create an alert to be notified when new jobs are posted."
                    className="w-full"
                />
            }


        </>
    )
}

export default SavedJobs
