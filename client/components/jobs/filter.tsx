"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ChevronDown, MapPin } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { get_all_jobs } from "@/lib/apis/jobs"
import { useEffect, useState } from "react"
import EmployerJobsLoading from "@/components/jobs/jobs-loading"
import locations from '@/dump/locations.json'
import { useDebounce } from "@/hooks/use-debounce"
import types from '@/dump/job_types.json'
import { EmptyJobs } from "../empty-jobs"
import moment from 'moment'


const JobsView = () => {

    const [page, setPage] = useState(0)
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [jobType, setJobType] = useState('')
    const [minSalary, setMinSalary] = useState(0)
    const [maxSalary, setMaxSalary] = useState(0)
    const debouncedTitle = useDebounce(title, 500);

    const router = useRouter();



    const { data: jobs, isLoading, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => get_all_jobs({ page: page + 1, title: debouncedTitle, location, job_type: jobType, min_salary: minSalary, max_salary: maxSalary, limit: 10 })
    })

    const total = jobs?.total ?? 0
    const limit = jobs?.limit ?? 0
    const jobs_data = jobs?.jobs?.length ?? 0

    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        refetch()
    }, [debouncedTitle, page, location, jobType, minSalary, maxSalary])


    if (isLoading) return <EmployerJobsLoading />


    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="search" placeholder="Search job title or keyword..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                    <Select onValueChange={(value) => setLocation(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            {
                                locations.map((jela) => (
                                    <SelectItem key={jela} value={jela}>{jela}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="sr-only">Filter</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>Narrow down your job search with filters.</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-6 py-6">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Job Type</h3>
                                    <Select
                                    onValueChange={(value) => setJobType(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                types.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Salary Range</h3>
                                    <Select
                                    onValueChange={(value) => {
                                        const [min, max] = value.split('-');
                                        setMinSalary(parseInt(min))
                                        setMaxSalary(max === '+' ? 9999999 : parseInt(max))
                                      }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-50k">$0 - $50,000</SelectItem>
                                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                            <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                                            <SelectItem value="150k+">$150,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <SheetTrigger asChild>
                                <Button>Apply Filters</Button>
                                </SheetTrigger>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing 1-10 of {jobs?.total} jobs</p>
                <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="relevant">Most Relevant</SelectItem>
                        <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
                        <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-6">
                {jobs_data > 0 ? jobs?.jobs?.map((job) => (
                    <Card onClick={() => router.push(`/jobs/${job.slug}`)} key={job._id} className="overflow-hidden cursor-pointer transition-all hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold capitalize">{job.company?.name}</h3>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{job.location}</span>
                                        </div>
                                        <Badge variant={job.job_type === "Full-time" ? "default" : "outline"}>{job.job_type}</Badge>
                                        <span className="text-sm">${job.min_salary} - ${job.max_salary}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{
                                        __html: job?.body?.slice(0, 150)
                                    }} />
                                    <div className="flex flex-wrap gap-2">
                                        {job?.skills?.map((skill) => (
                                            <Badge key={skill} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-sm text-muted-foreground">Posted:  {moment(job.created_at ).startOf('day').fromNow()}</span>

                                    <Link href={`/jobs/${job._id}/apply`}>
                                        <Button size="sm">
                                            Apply
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : <EmptyJobs />}
            </div>
            <div className="flex justify-center mt-6">
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 0}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    >
                        <ChevronDown className="h-4 w-4 rotate-90" />
                        <span className="sr-only">Previous</span>
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            variant={page === i ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPage(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default JobsView