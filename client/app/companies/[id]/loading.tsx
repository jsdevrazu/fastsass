import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"

export default function CompanyDetailsLoading() {
  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="gap-1" disabled>
          <ChevronLeft className="h-4 w-4" />
          Back to Companies
        </Button>
      </div>

      <div className="relative mb-8">
        <Skeleton className="w-full h-48 md:h-64 rounded-lg" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between md:-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-background" />
            <div className="md:mb-4">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
          <Skeleton className="h-10 w-full" />
        </TabsList>

        <TabsContent value="about" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-9 w-24 mt-3 md:mt-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <div className="flex items-center">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-6" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
