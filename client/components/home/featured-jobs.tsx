"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin } from "lucide-react"
import { EmptyState } from "../ui/empty-state"

const FeaturedJobs = ({ jobs }: { jobs: JobsEntity[] }) => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="app_container">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">

                    {jobs?.length > 0 ? <>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Jobs</h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground">
                                Explore our latest job opportunities from top employers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                            {jobs?.map((job) => (
                                <Link href={`/jobs/${job?.slug}`} key={job._id}>
                                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                        <Briefcase className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold capitalize">{job.company?.name}</h3>
                                                    </div>
                                                </div>
                                                <Badge variant={job.job_type === "Full-time" ? "default" : "outline"}>{job.job_type}</Badge>
                                            </div>
                                            <h3 className="text-xl text-left font-bold mb-2">{job.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                <MapPin className="h-4 w-4" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="text-left mb-2" dangerouslySetInnerHTML={{
                                                __html: job?.body?.slice(0, 200)
                                            }} />
                                            <div className="flex flex-wrap gap-2">
                                                {job?.skills?.map((skill) => (
                                                    <Badge key={skill} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </> :
                        <EmptyState
                            icon={Briefcase}
                            title="No featured jobs available"
                            className="border-none h-40"
                            description="There are currently no job listings available. Please check back later."
                        />}
                    <Button variant="outline" asChild>
                        <Link href="/jobs">View All Jobs</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedJobs