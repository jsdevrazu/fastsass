import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function EmployerJobsLoading() {
    return (
        <div className="flex min-h-screen">
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-32" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-24 rounded-md" />
                            <Skeleton className="h-9 w-32 rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-1 overflow-auto">
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-[180px] rounded-md" />
                        </div>
                    </div>

                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-auto">
                                <div className="min-w-full align-middle">
                                    <div className="border-b">
                                        <div className="grid grid-cols-7 px-4 py-3">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-5 w-20" />
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-16" />
                                            <div></div>
                                        </div>
                                    </div>

                                    <div>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index} className="border-b">
                                                <div className="grid grid-cols-7 items-center px-4 py-4">
                                                    <Skeleton className="h-5 w-40" />
                                                    <Skeleton className="h-5 w-8" />
                                                    <Skeleton className="h-6 w-16 rounded-full" />
                                                    <Skeleton className="h-5 w-20" />
                                                    <Skeleton className="h-5 w-20" />
                                                    <Skeleton className="h-5 w-16" />
                                                    <div className="flex justify-end">
                                                        <Skeleton className="h-8 w-8 rounded-md" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
