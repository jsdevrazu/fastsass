import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg border-green-100 bg-white">
          <div className="flex flex-col items-center text-center space-y-6">
            <Skeleton className="h-18 w-18 rounded-full" />

            <div className="space-y-2 w-full">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>

            <div className="bg-green-50 rounded-lg p-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="h-4 w-64 mx-auto" />
          <Skeleton className="h-4 w-40 mx-auto mt-1" />
        </div>
      </div>
    </div>
  )
}
