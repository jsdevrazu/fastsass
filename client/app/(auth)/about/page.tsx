import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Globe, Award, ArrowRight, MapPin } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="max-w-5xl mx-auto mb-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About FastSass</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Connecting talented professionals with their dream careers and helping companies find their perfect match.
                    </p>
                </div>

                <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
                    <Image src="/placeholder.svg?height=400&width=1000" alt="Our team" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
                        <div className="text-white p-8 md:p-12 max-w-xl">
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg mb-6">
                                To revolutionize how people find jobs and how companies hire talent by creating the most efficient,
                                transparent, and user-friendly job marketplace in the world.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="secondary" asChild>
                                    <Link href="/jobs">Find Jobs</Link>
                                </Button>
                                <Button variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30" asChild>
                                    <Link href="/post-job">Post a Job</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <ValueCard
                        icon={<Users className="h-12 w-12 text-primary" />}
                        title="People First"
                        description="We believe in putting people at the center of everything we do, creating experiences that empower both job seekers and employers."
                    />
                    <ValueCard
                        icon={<CheckCircle className="h-12 w-12 text-primary" />}
                        title="Quality Matches"
                        description="We're committed to creating meaningful connections between talented professionals and companies where they can thrive."
                    />
                    <ValueCard
                        icon={<Globe className="h-12 w-12 text-primary" />}
                        title="Global Opportunity"
                        description="We're breaking down geographical barriers to connect talent with opportunity anywhere in the world."
                    />
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
                    <div className="space-y-12">
                        <TimelineItem
                            year="2018"
                            title="The Beginning"
                            description="FastSass was founded with a simple idea: make job searching and hiring better for everyone. Our founders, frustrated with existing solutions, set out to create something different."
                            isLeft={true}
                        />
                        <TimelineItem
                            year="2019"
                            title="Early Growth"
                            description="We expanded our team and launched our first version of the platform, focusing on creating a seamless experience for both job seekers and employers."
                            isLeft={false}
                        />
                        <TimelineItem
                            year="2020"
                            title="Adapting to Change"
                            description="During the global pandemic, we pivoted to support remote work opportunities and helped thousands of professionals find new careers during challenging times."
                            isLeft={true}
                        />
                        <TimelineItem
                            year="2021"
                            title="Innovation & Expansion"
                            description="We introduced AI-powered matching technology and expanded to new markets, doubling our user base and helping more companies find the right talent."
                            isLeft={false}
                        />
                        <TimelineItem
                            year="2022"
                            title="Growing Community"
                            description="Our community grew to over 1 million users, and we celebrated helping 100,000 professionals find their dream jobs through our platform."
                            isLeft={true}
                        />
                        <TimelineItem
                            year="2023"
                            title="Today & Beyond"
                            description="Today, we're continuing to innovate and expand, with a focus on creating more opportunities and better experiences for job seekers and employers worldwide."
                            isLeft={false}
                        />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <TeamMember name="Sarah Johnson" role="CEO & Co-Founder" image="/placeholder.svg?height=300&width=300" />
                        <TeamMember name="Michael Chen" role="CTO & Co-Founder" image="/placeholder.svg?height=300&width=300" />
                        <TeamMember name="Aisha Patel" role="Chief Product Officer" image="/placeholder.svg?height=300&width=300" />
                        <TeamMember
                            name="David Rodriguez"
                            role="Chief Marketing Officer"
                            image="/placeholder.svg?height=300&width=300"
                        />
                        <TeamMember
                            name="Emma Wilson"
                            role="Head of Customer Success"
                            image="/placeholder.svg?height=300&width=300"
                        />
                        <TeamMember name="James Taylor" role="Head of Engineering" image="/placeholder.svg?height=300&width=300" />
                        <TeamMember name="Olivia Kim" role="Head of Design" image="/placeholder.svg?height=300&width=300" />
                        <TeamMember name="Marcus Jackson" role="Head of Sales" image="/placeholder.svg?height=300&width=300" />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <StatCard number="1M+" label="Registered Users" />
                        <StatCard number="50K+" label="Companies" />
                        <StatCard number="200K+" label="Jobs Filled" />
                        <StatCard number="40+" label="Countries" />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Recognition & Awards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AwardCard year="2023" award="Best Job Platform" organization="Tech Innovation Awards" />
                        <AwardCard year="2022" award="Excellence in User Experience" organization="Digital Design Association" />
                        <AwardCard year="2021" award="HR Technology of the Year" organization="Global HR Excellence Awards" />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Offices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <OfficeCard
                            city="New York"
                            address="123 Broadway, New York, NY 10001"
                            image="/placeholder.svg?height=200&width=300"
                        />
                        <OfficeCard
                            city="London"
                            address="45 Tech Square, London, EC1V 9BX"
                            image="/placeholder.svg?height=200&width=300"
                        />
                        <OfficeCard
                            city="Singapore"
                            address="78 Innovation Drive, Singapore 138542"
                            image="/placeholder.svg?height=200&width=300"
                        />
                    </div>
                </div>

                <div className="bg-muted rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        We're always looking for talented individuals who are passionate about creating meaningful connections
                        between people and opportunities.
                    </p>
                    <Button asChild>
                        <Link href="/careers">
                            View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

function ValueCard({ icon, title, description }: ValueCardProps) {
    return (
        <div className="flex flex-col items-center text-center p-6">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

function TimelineItem({ year, title, description, isLeft }: TimelineItemProps) {
    return (
        <div className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-1/2 px-4">
                {isLeft ? (
                    <div className="text-right">
                        <div className="text-primary font-bold text-xl mb-2">{year}</div>
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                ) : (
                    <div className="hidden md:block" />
                )}
            </div>
            <div className="relative flex flex-col items-center">
                <div className="h-full w-0.5 bg-primary/20"></div>
                <div className="absolute top-0 w-4 h-4 rounded-full bg-primary"></div>
            </div>
            <div className="w-1/2 px-4">
                {!isLeft ? (
                    <div>
                        <div className="text-primary font-bold text-xl mb-2">{year}</div>
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                ) : (
                    <div className="hidden md:block" />
                )}
            </div>
        </div>
    )
}

function TeamMember({ name, role, image }: TeamMemberProps) {
    return (
        <div className="text-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                />
            </div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-muted-foreground">{role}</p>
        </div>
    )
}

function StatCard({ number, label }: StatCardProps) {
    return (
        <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{number}</div>
            <div className="text-muted-foreground">{label}</div>
        </div>
    )
}

function AwardCard({ year, award, organization }: AwardCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <Award className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">{year}</div>
                        <h3 className="font-bold text-lg mb-1">{award}</h3>
                        <p className="text-muted-foreground">{organization}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function OfficeCard({ city, address, image }: OfficeCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-40">
                <Image src={image || "/placeholder.svg"} alt={city} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{city}</h3>
                <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                    <span>{address}</span>
                </div>
            </CardContent>
        </Card>
    )
}
