"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { ScheduleInterviewModal } from "@/components/modals/schedule-interview-modal"
import { SendMessageModal } from "@/components/modals/send-message-modal"
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
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)


    const handleDownload = (name: string, url: string) => {
        const resumeUrl = baseURLPhoto(url);
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.setAttribute("download", `${name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

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
                            {user_details?.application_status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">Applied on {moment(user_details?.applied_at).format("MMM Do YY")}</p>

                        <div className="hidden md:flex md:gap-2">
                            <Button onClick={() => handleDownload(user_details?.first_name ?? '', user_details?.resume ?? '')} variant="outline" size="sm" className="gap-1">
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
                <Button onClick={() => handleDownload(user_details?.first_name ?? '', user_details?.resume ?? '')} variant="outline" size="sm" className="flex-1 gap-1">
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
                                        <Link href={`mailto:${user_details?.email}`}>
                                            <Button variant="outline" size="sm" className="w-full gap-1">
                                                <Mail className="h-4 w-4" />
                                                <span>Email</span>
                                            </Button>
                                        </Link>
                                        <Link href={`tel:${user_details?.phone_number}`}>
                                            <Button variant="outline" size="sm" className="w-full gap-1">
                                                <Phone className="h-4 w-4" />
                                                <span>Call</span>
                                            </Button>
                                        </Link>

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
                                            <p className="mt-1">{user_details?.email}</p>
                                            <p className="mt-1">{user_details?.phone_number}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                                            <div className="mt-1 flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                <span>{user_details?.location}</span>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">Available for relocation</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                                            {
                                                user_details?.experience ? <>
                                                    <p className="mt-1">{user_details?.experience}</p>
                                                </> : <p>No experience available </p>
                                            }
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Education</h3>
                                            {
                                                user_details?.education.institution ? <>
                                                    <p className="mt-1">{user_details?.education?.degree_name}</p>
                                                    <p className="mt-1 text-sm text-muted-foreground">{user_details?.education?.institution} ({user_details?.education?.start_date} - {user_details?.education?.end_date})</p>
                                                </> : <p>No education available </p>
                                            }
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">Skills</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {user_details?.job_skills?.map((item) => (
                                                <Badge key={item} variant="secondary">{item}</Badge>
                                            ))}
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
                                <CardContent className="p-0">
                                    <ResumePreview user={user_details} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="cover-letter" className="mt-4">
                            <Card>
                                <CardContent className="py-4">
                                    <div className="prose max-w-none dark:prose-invert whitespace-pre-line">
                                        {user_details?.cover_letter}
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
                                        <Badge variant={getStatusVariant(user_details?.application_status ?? '')}>{user_details?.application_status}</Badge>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium">Match Score</span>
                                        <span className="text-sm font-medium">{user_details?.match_percentage}%</span>
                                    </div>
                                    <Progress value={user_details?.match_percentage} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ScheduleInterviewModal
                isOpen={isInterviewModalOpen}
                onClose={() => setIsInterviewModalOpen(false)}
                applicantName={`${user_details?.first_name} ${user_details?.last_name}`}
                jobTitle={user_details?.job_title ?? ''}
                id={user_details?.user_id ?? ''}
            />

            <SendMessageModal
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                applicantName={`${user_details?.first_name} ${user_details?.last_name}`}
                applicantEmail={user_details?.email ?? ''}
                id={user_details?.user_id ?? ''}
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