import { Skeleton } from "@/components/ui/skeleton"

export default function CompaniesLoading() {
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-5 w-full max-w-md" />
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Skeleton className="h-10 md:col-span-2" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>

                <Skeleton className="h-10 w-full max-w-md" />

                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <CompanyCardSkeleton key={i} />
                        ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Skeleton className="h-10 w-64" />
                </div>
            </div>
        </div>
    )
}

function CompanyCardSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    <div className="flex flex-wrap gap-2 mt-3">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-muted/30 border-t flex justify-between items-center">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-9 w-28" />
            </div>
        </div>
    )
}
