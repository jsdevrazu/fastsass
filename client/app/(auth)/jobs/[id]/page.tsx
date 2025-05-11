import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, Calendar, Clock, DollarSign, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ApplyButton } from "@/components/apply-button"
import moment from "moment"
import { ShareJobButton } from "@/components/share-job-button"
import { Metadata } from "next"
import { format } from 'date-fns'
import { BookmarkButton } from "@/components/bookmark-button"

type Props = {
  params: { slug: string };
};

async function getJobBySlug(id:string){
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}/detail`)
  const { job } = await data.json() as SingleJobsResponse
  return job
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);

  return {
    title: job?.title || "Job Details",
    description: job?.meta_description?.slice(0, 150) || "Details of the job",
  };
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
 const { id } = await params;
 const job = await getJobBySlug(id)
 await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/update-view/${id}`)
 

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="app_container md:py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/jobs">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to jobs</span>
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">Back to jobs</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{job?.company?.name}</h2>
                    <p className="text-sm text-muted-foreground">{job?.company?.company_description}</p>
                  </div>
                </div>
                 <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <BookmarkButton isBookmarked={job?.isBookmarked} jobId={job?._id} jobTitle={job.title} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job?.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{job?.job_type}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{job?.min_salary} - {job?.max_salary}</span>
                  </div>
                  <Badge variant={job?.job_type === "Full-time" ? "default" : "outline"}>{job?.job_type}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <div className="job_description" dangerouslySetInnerHTML={{
                  __html: job?.body
                }} />
              </div>
            </div>
            <div className="md:w-80 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this job</CardTitle>
                  <CardDescription>Submit your application now</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Posted {moment(job?.created_at ).startOf('day').fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Applications close in {format(job?.application_dead_line, "MM/dd/yyyy")}</span>
                  </div>
                  <ApplyButton job={job} className="w-full" />
                  <ShareJobButton jobId={id} jobTitle={job.title} companyName={job.company?.name} className="w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job?.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>About {job?.company?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{job?.company?.company_description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/companies/${job?.company?._id}`}>View Company Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}