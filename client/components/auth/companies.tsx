"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Building, Users, Star, ExternalLink, ChevronDown } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import locations from '@/dump/locations.json'
import industries from '@/dump/industry.json'
import { useQuery } from "@tanstack/react-query"
import { get_companies } from "@/lib/apis/jobs"
import CompaniesLoading from "@/app/companies/loading"
import { baseURLPhoto } from "@/lib/axios"
import { useDebounce } from "@/hooks/use-debounce"


export default function CompaniesPage() {

    const [page, setPage] = useState(0)
    const [title, setTitle] = useState('')
    const [industry, setIndustry] = useState('')
    const [location, setLocation] = useState('')
    const debouncedTitle = useDebounce(title, 500);

    const { isLoading, data, refetch } = useQuery<CompanyResponse>({
        queryKey: ['get_companies'],
        queryFn: () => get_companies({ page: page + 1, limit: 10, title, location, industry })
    })

    const companies = data?.companies ?? []
    const totalPages = data?.total ?? 0

    useEffect(() => {
        refetch()
    }, [debouncedTitle, page, location, industry])

    if (isLoading) return <CompaniesLoading />




    return (
        <>
            <Header />
            <div className="container mx-auto py-8 px-4 max-w-7xl">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
                        <p className="text-muted-foreground">Discover top companies hiring now and explore their open positions</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search companies..."
                                className="pl-9"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <Select value={industry} onValueChange={setIndustry}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industries.map((industry) => (
                                        <SelectItem key={industry} value={industry}>
                                            {industry === "all" ? "All Industries" : industry}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location} value={location}>
                                            {location === "all" ? "All Locations" : location}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {companies?.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {companies?.map((company) => (
                                <CompanyCard key={company?._id} company={company} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={Building}
                            title="No companies found"
                            description="Try adjusting your search or filters to find what you're looking for."
                        />
                    )}

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
                </div>
            </div>
            <Footer />
        </>
    )
}

function CompanyCard({ company }: { company: CompaniesEntity }) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                                <img
                                    src={baseURLPhoto(company.logo) || "/placeholder.svg"}
                                    alt={`${company.name} logo`}
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg line-clamp-1">{company.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span>{company.rating}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{company.company_description}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {company.industry}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {company.headquatar_location.split(",")[0]}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {company.company_size}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-4 bg-muted/30 border-t">
                <div className="text-sm font-medium">
                    <span className="text-primary">{company.jobs_open}</span> open positions
                </div>
                <Button asChild size="sm" variant="ghost" className="gap-1">
                    <Link href={`/companies/${company._id}`}>
                        View Company
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
