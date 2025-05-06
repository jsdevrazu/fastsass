import Filter from "@/components/jobs/filter"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs List",
  description: "Browse the latest job listings on FastSass",
};

export default async function JobsPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="app_container py-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Find Jobs</h1>
              <p className="text-muted-foreground">
                Browse through thousands of job listings to find your next opportunity.
              </p>
            </div>
            <Filter />
          </div>
        </div>
      </main>
    </div>
  )
}