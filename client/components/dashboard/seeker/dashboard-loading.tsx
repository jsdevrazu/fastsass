import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TableLoader from "@/components/dashboard/seeker/table-loader"

export default function JobSeekerDashboardLoading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex-1 overflow-auto">
          <div className="space-y-4">
            {/* Page header skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>

            {/* Stats cards skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-7 w-12 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Content grid skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Recent applications skeleton */}
              <TableLoader />

              {/* Recommended jobs skeleton */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Skeleton className="h-5 w-32 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-3 w-3" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-16 rounded-md" />
                          <Skeleton className="h-9 w-16 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-9 w-40 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
