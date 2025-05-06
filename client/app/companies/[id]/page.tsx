import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Building,
    MapPin,
    Globe,
    Calendar,
    Users,
    Briefcase,
    Star,
    Clock,
    ChevronLeft,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    CheckCircle,
} from "lucide-react"
import { baseURLPhoto } from "@/lib/axios"
import EmployeeReviews from "@/components/auth/employee-reviews"
import moment from "moment"
import Image from "next/image"
import { ShareJobButton } from "@/components/share-job-button"


export default async function CompanyDetailsPage({ params }: { params: { id: string } }) {

    const { id } = await params
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/company/${id}`)
    const { company } = await data.json() as SingleCompanyResponse


    return (
        <div className="container mx-auto py-6 px-4 max-w-7xl">
            <div className="mb-6">
                <Button variant="ghost" size="sm" asChild className="gap-1">
                    <Link href="/companies">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Companies
                    </Link>
                </Button>
            </div>

            <div className="relative mb-8">
                <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={baseURLPhoto(company?.logo) || "/placeholder.svg"}
                        alt={`${company?.name} cover`}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={256}
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between md:-mt-16 relative">
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-background bg-background shadow-md overflow-hidden">
                            <Image
                                src={baseURLPhoto(company?.logo) || "/placeholder.svg"}
                                alt={`${company?.name} logo`}
                                className="w-full h-full object-contain p-2"
                                width={96}
                                height={96}
                            />
                        </div>
                        <div className="md:mb-4">
                            <h1 className="text-2xl md:text-3xl font-bold">{company?.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Building className="h-4 w-4" />
                                <span>{company?.industry}</span>
                                <span className="text-xs">•</span>
                                <MapPin className="h-4 w-4" />
                                <span>{company?.headquatar_location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        <ShareJobButton jobId={id} jobTitle={'Company Profile'} companyName={company?.name} className="w-full" />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About {company?.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="whitespace-pre-line">{company?.company_description}</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Company Culture</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {
                                            Object.entries(company?.comapnies_calture)?.map(([value], index) => (
                                                <li key={index} className="flex items-start gap-2 capitalize">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{value}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Latest Jobs at {company?.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {company?.active_jobs?.slice(0, 3)?.map((job) => (
                                            <div
                                                key={job?.job_id}
                                                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                                            >
                                                <div>
                                                    <h3 className="font-medium">{job?.title}</h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <Badge variant="outline" className="flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" />
                                                            {job?.location}
                                                        </Badge>
                                                        <Badge variant="outline" className="flex items-center gap-1">
                                                            <Briefcase className="h-3 w-3" />
                                                            {job?.job_type}
                                                        </Badge>
                                                        <Badge variant="outline" className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {moment(job?.created_at).format("MMM Do YY")}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button asChild className="mt-3 md:mt-0">
                                                    <Link href={`/jobs/${job?.slug}`}>View Job</Link>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Company Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Website</div>
                                            <a
                                                href={company?.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {company?.website}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Headquarters</div>
                                            <div>{company?.headquatar_location}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Founded</div>
                                            <div>{company.founded}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Company Size</div>
                                            <div>{company.company_size} employees</div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">Social Media</div>
                                        <div className="flex gap-2">
                                            <a
                                                href={company?.social_media?.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-muted hover:bg-muted/80"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                            </a>
                                            <a
                                                href={company?.social_media?.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-muted hover:bg-muted/80"
                                            >
                                                <Twitter className="h-4 w-4" />
                                            </a>
                                            <a
                                                href={company?.social_media?.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-muted hover:bg-muted/80"
                                            >
                                                <Facebook className="h-4 w-4" />
                                            </a>
                                            <a
                                                href={company?.social_media?.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-muted hover:bg-muted/80"
                                            >
                                                <Instagram className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">Contact</div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <a href={`mailto:${company?.contact?.email}`} className="text-primary hover:underline">
                                                    {company?.contact?.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <a href={`tel:${company?.contact?.phone}`} className="text-primary hover:underline">
                                                    {company?.contact?.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Company Rating</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold">{company?.rating}</div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${i < Math.floor(company?.rating)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : i < company?.rating
                                                            ? "fill-amber-400/50 text-amber-400"
                                                            : "fill-muted text-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-sm text-muted-foreground">({company?.ratings?.length} reviews)</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="jobs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Open Positions at {company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {company?.active_jobs?.map((job) => (
                                    <div
                                        key={job.job_id}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                                    >
                                        <div>
                                            <h3 className="font-medium">{job?.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {company?.industry} • {job?.location}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <Briefcase className="h-3 w-3" />
                                                    {job?.job_type}
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {moment(job?.created_at).format("MMM Do YY")}
                                                </Badge>
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    ${job?.min_salary} - {job?.max_salary}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button asChild className="mt-3 md:mt-0">
                                            <Link href={`/jobs/${job?.slug}`}>View Job</Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews">
                    <EmployeeReviews company={company} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
