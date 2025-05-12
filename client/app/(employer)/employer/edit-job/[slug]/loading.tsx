import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PlanLoading() {
  return (
    <div className="py-6 space-y-8">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-[350px] mt-2" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[250px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-5 w-[50px]" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[180px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-4 w-[80px] mt-1" />
              </div>
              <Skeleton className="h-6 w-[60px]" />
            </div>
            <div>
              <Skeleton className="h-8 w-[120px]" />
              <Skeleton className="h-4 w-[150px] mt-1" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>

      <div>
        <Skeleton className="h-8 w-[200px] mb-6" />

        <div className="flex justify-center mb-8">
          <Skeleton className="h-10 w-[400px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-4 w-[180px] mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[100px] mb-4" />
                <div className="space-y-2 mb-6">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-[180px]" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <Skeleton className="h-7 w-[200px] mb-4" />
        <Skeleton className="h-4 w-full max-w-[500px] mb-4" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}
