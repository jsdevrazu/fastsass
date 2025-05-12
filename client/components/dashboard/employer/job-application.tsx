"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    ArrowLeft,
    Calendar,
    Download,
    Github,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    ThumbsDown,
    ThumbsUp,
    Twitter,
} from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { ScheduleInterviewModal } from "@/components/modals/schedule-interview-modal"
import { SendMessageModal } from "@/components/modals/send-message-modal"
import { toast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { get_job_applications } from "@/lib/apis/jobs"
import ApplicationDetailsLoading from "@/app/(employer)/employer/apps/[id]/loading"
import moment from "moment"
import { baseURLPhoto } from "@/lib/axios"
import Link from "next/link"

export default function ApplicationDetailsPage({ id }: { id: string }) {

    const { isLoading, data } = useQuery<JobApplicationResponse>({
        queryKey: ['get_job_applications'],
        queryFn: () => get_job_applications(id),
        enabled: id ? true : false
    })

    const user_details = data?.applicants


    const router = useRouter()
    const [currentStatus, setCurrentStatus] = useState("Reviewed")
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [notes, setNotes] = useState("")
    const [isSubmittingNotes, setIsSubmittingNotes] = useState(false)

    const application = allApplications.find((app) => app.id === id) || allApplications[0]

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus)
        toast({
            title: "Status updated",
            description: `Application status changed to ${newStatus}`,
        })
    }

    if (isLoading) return <ApplicationDetailsLoading />

    return (
        <>
            <div className="mb-6">
                <Button
                    variant="ghost"
                    className="mb-2 flex h-8 items-center gap-1 px-2 text-muted-foreground"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Applications</span>
                </Button>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold">{user_details?.first_name} {user_details?.last_name}</h1>
                        <p className="text-muted-foreground">
                            Application for <span className="font-medium text-foreground">{user_details?.job_title}</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getStatusVariant(user_details?.application_status ?? '')} className="h-6 px-3 text-xs">
                            {currentStatus}
                        </Badge>
                        <p className="text-sm text-muted-foreground">Applied on {moment(user_details?.applied_at).format("MMM Do YY")}</p>

                        <div className="hidden md:flex md:gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-4 w-4" />
                                <span>Resume</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsInterviewModalOpen(true)}>
                                <Calendar className="h-4 w-4" />
                                <span>Schedule Interview</span>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsMessageModalOpen(true)}>
                                <MessageSquare className="h-4 w-4" />
                                <span>Message</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex gap-2 md:hidden">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Download className="h-4 w-4" />
                    <span>Resume</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setIsInterviewModalOpen(true)}>
                    <Calendar className="h-4 w-4" />
                    <span>Interview</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setIsMessageModalOpen(true)}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Applicant Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6 sm:flex-row">
                                <div className="flex flex-col items-center sm:w-1/3">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={baseURLPhoto(user_details?.avatar ?? '')} />
                                        <AvatarFallback className="text-3xl">{user_details?.first_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>

                                    <div className="mt-4 flex w-full flex-col gap-2">
                                        <Button variant="outline" size="sm" className="w-full gap-1">
                                            <Mail className="h-4 w-4" />
                                            <span>Email</span>
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full gap-1">
                                            <Phone className="h-4 w-4" />
                                            <span>Call</span>
                                        </Button>

                                        <div className="mt-2 flex justify-center gap-2">
                                            <Link href={user_details?.linkedin_profile ?? ''} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Linkedin className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={user_details?.github_profile ?? ''} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Github className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={user_details?.website ?? ''} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Globe className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:w-2/3">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                                            <p className="mt-1">{application.email}</p>
                                            <p className="mt-1">+1 (555) 123-4567</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                                            <div className="mt-1 flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                <span>San Francisco, CA</span>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">Available for relocation</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                                            <p className="mt-1">5+ years</p>
                                            <p className="mt-1 text-sm text-muted-foreground">Senior Developer at TechCorp (2020-Present)</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Education</h3>
                                            <p className="mt-1">B.S. Computer Science</p>
                                            <p className="mt-1 text-sm text-muted-foreground">University of California (2015-2019)</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">Skills</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <Badge variant="secondary">React</Badge>
                                            <Badge variant="secondary">TypeScript</Badge>
                                            <Badge variant="secondary">Node.js</Badge>
                                            <Badge variant="secondary">GraphQL</Badge>
                                            <Badge variant="secondary">AWS</Badge>
                                            <Badge variant="secondary">Docker</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="resume" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="resume">Resume</TabsTrigger>
                            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                        </TabsList>
                        <TabsContent value="resume" className="mt-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Resume</CardTitle>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Download className="h-4 w-4" />
                                            <span>Download</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ResumePreview applicantName={application.applicant} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="cover-letter" className="mt-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Cover Letter</CardTitle>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Download className="h-4 w-4" />
                                            <span>Download</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none dark:prose-invert">
                                        <p>Dear Hiring Manager,</p>
                                        <p>
                                            I am writing to express my interest in the {application.job} position at your company. With over 5
                                            years of experience in software development and a strong background in the technologies mentioned
                                            in the job description, I believe I would be an excellent fit for your team.
                                        </p>
                                        <p>
                                            In my current role as a Senior Developer at TechCorp, I have led the development of several key
                                            projects that have significantly improved our product offerings and customer satisfaction. I have
                                            extensive experience with React, TypeScript, and Node.js, which I understand are primary
                                            technologies used in your stack.
                                        </p>
                                        <p>
                                            I am particularly excited about the opportunity to work on innovative solutions and contribute to
                                            your company's growth. My collaborative approach to problem-solving and my commitment to writing
                                            clean, maintainable code would make me a valuable addition to your development team.
                                        </p>
                                        <p>
                                            Thank you for considering my application. I look forward to the possibility of discussing how my
                                            skills and experience align with your needs.
                                        </p>
                                        <p>
                                            Sincerely,
                                            <br />
                                            {application.applicant}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Application Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium">Current Status</span>
                                        <Badge variant={getStatusVariant(currentStatus)}>{currentStatus}</Badge>
                                    </div>
                                    <Select value={currentStatus} onValueChange={handleStatusChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Change status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Reviewed">Reviewed</SelectItem>
                                            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                            <SelectItem value="Interviewed">Interviewed</SelectItem>
                                            <SelectItem value="Offered">Offered</SelectItem>
                                            <SelectItem value="Hired">Hired</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium">Match Score</span>
                                        <span className="text-sm font-medium">{application.match}%</span>
                                    </div>
                                    <Progress value={application.match} className="h-2" />
                                </div>

                                <div className="pt-2">
                                    <span className="text-sm font-medium">Quick Actions</span>
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleStatusChange("Shortlisted")}
                                        >
                                            <ThumbsUp className="mr-1 h-4 w-4" />
                                            Shortlist
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleStatusChange("Rejected")}
                                        >
                                            <ThumbsDown className="mr-1 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ScheduleInterviewModal
                isOpen={isInterviewModalOpen}
                onClose={() => setIsInterviewModalOpen(false)}
                applicantName={application.applicant}
                jobTitle={application.job}
            />

            <SendMessageModal
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                applicantName={application.applicant}
                applicantEmail={application.email}
            />
        </>
    )
}

function getStatusVariant(status: string) {
    switch (status) {
        case "Reviewed":
            return "default"
        case "Pending":
            return "outline"
        case "Shortlisted":
            return "secondary"
        case "Interviewed":
            return "secondary"
        case "Offered":
            return "success"
        case "Hired":
            return "success"
        case "Rejected":
            return "destructive"
        default:
            return "outline"
    }
}

const allApplications = [
    {
        id: "1",
        applicant: "John Smith",
        email: "john.smith@example.com",
        job: "Senior Frontend Developer",
        status: "Reviewed",
        date: "May 16, 2023",
        match: 85,
    },
    {
        id: "2",
        applicant: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        job: "UX/UI Designer",
        status: "Interviewed",
        date: "May 15, 2023",
        match: 92,
    },
    {
        id: "3",
        applicant: "Michael Brown",
        email: "michael.brown@example.com",
        job: "Backend Engineer",
        status: "Pending",
        date: "May 14, 2023",
        match: 78,
    },
    {
        id: "4",
        applicant: "Emily Davis",
        email: "emily.davis@example.com",
        job: "Product Manager",
        status: "Rejected",
        date: "May 13, 2023",
        match: 65,
    },
    {
        id: "5",
        applicant: "David Wilson",
        email: "david.wilson@example.com",
        job: "DevOps Engineer",
        status: "Pending",
        date: "May 12, 2023",
        match: 80,
    },
    {
        id: "6",
        applicant: "Jennifer Lee",
        email: "jennifer.lee@example.com",
        job: "Senior Frontend Developer",
        status: "Interviewed",
        date: "May 11, 2023",
        match: 88,
    },
    {
        id: "7",
        applicant: "Robert Taylor",
        email: "robert.taylor@example.com",
        job: "Backend Engineer",
        status: "Reviewed",
        date: "May 10, 2023",
        match: 75,
    },
]
