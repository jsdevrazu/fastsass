import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  Search, TrendingUp } from "lucide-react"
import Hero from "@/components/home/hero"
import FeaturedJobs from "@/components/home/featured-jobs"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"

export default async function HomePage() {

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/featured-jobs`)
  const { jobs } = await data.json() as JobsResponse



  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
       <Hero />
       <FeaturedJobs jobs={jobs ?? []} />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="app_container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  For Employers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Post a Job and Find the Perfect Candidate
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Reach thousands of job seekers and find the right talent for your company.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/employer/post-job">Post a Job</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Reach More Candidates</h3>
                    <p className="text-muted-foreground">
                      Get your job posting in front of thousands of qualified candidates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Advanced Filtering</h3>
                    <p className="text-muted-foreground">
                      Filter candidates by skills, experience, and location to find the perfect match.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

