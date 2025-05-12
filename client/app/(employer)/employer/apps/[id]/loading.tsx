import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function ApplicationDetailsLoading() {
  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" className="mb-2 flex h-8 items-center gap-1 px-2 text-muted-foreground" disabled>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Applications</span>
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-5 w-64" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-32" />

            <div className="hidden md:flex md:gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-36" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2 md:hidden">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center sm:w-1/3">
                  <Skeleton className="h-24 w-24 rounded-full" />

                  <div className="mt-4 flex w-full flex-col gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />

                    <div className="mt-2 flex justify-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="sm:w-2/3">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="mt-1 h-5 w-40" />
                      <Skeleton className="mt-1 h-5 w-32" />
                    </div>

                    <div>
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="mt-1 h-5 w-40" />
                      <Skeleton className="mt-1 h-5 w-48" />
                    </div>

                    <div>
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="mt-1 h-5 w-16" />
                      <Skeleton className="mt-1 h-5 w-48" />
                    </div>

                    <div>
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="mt-1 h-5 w-40" />
                      <Skeleton className="mt-1 h-5 w-48" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Skeleton className="h-5 w-12" />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume and Cover Letter */}
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resume" disabled>
                Resume
              </TabsTrigger>
              <TabsTrigger value="cover-letter" disabled>
                Cover Letter
              </TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>

        {/* Right column - Status, timeline, and actions */}
        <div className="space-y-6">
          {/* Status card */}
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>

                <div className="pt-2">
                  <Skeleton className="h-5 w-24" />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline card */}
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes card */}
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[120px] w-full" />
            </CardContent>
            <CardFooter className="flex justify-end border-t px-6 py-4">
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
