import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TableLoader = ({ className } : { className?: string}) => {


    return (
        <>
            <Card className={cn("lg:col-span-4", className)}>
                <CardHeader>
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-60" />
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto">
                        <div className="min-w-full align-middle">
                            {/* Table header */}
                            <div className="border-b">
                                <div className="grid grid-cols-4 px-4 py-3">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>

                            {/* Table rows */}
                            <div>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="border-b">
                                        <div className="grid grid-cols-4 items-center px-4 py-4">
                                            <Skeleton className="h-5 w-40" />
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Skeleton className="h-9 w-40 rounded-md" />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default TableLoader