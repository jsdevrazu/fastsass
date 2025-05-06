"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Star,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { WriteReviewModal } from "@/components/modals/write-review-modal"
import { useState } from "react"
import { useAuthStore } from "@/store/store"
import { toast } from "sonner"

const EmployeeReviews = ({ company }: { company: Company }) => {

    const [reviews, setReviews] = useState<Reviews[]>(company?.ratings || [])
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const { user } = useAuthStore()

    return (
        <div>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Employee Reviews</CardTitle>
                        <Button onClick={() => {
                            if (user?.role !== 'employer') return toast.error("You are not eligable for review")
                            setIsReviewModalOpen(true)
                        }}>Write a Review</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {reviews?.map((review, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{review.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {review?.employe_status === 'current_employee' ? 'Current Employee' : 'Former Employee'} • {review?.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(review.rating)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : i < review.rating
                                                            ? "fill-amber-400/50 text-amber-400"
                                                            : "fill-muted text-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="mt-3">{review?.review}</p>

                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                                <CheckCircle className="h-4 w-4 text-green-500" /> Pros
                                            </h4>
                                            <ul className="text-sm space-y-1">
                                                {review?.props?.map((pro, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span>{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                                                <XCircle className="h-4 w-4 text-red-500" /> Cons
                                            </h4>
                                            <ul className="text-sm space-y-1">
                                                {review?.cons?.map((con, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-red-500">•</span>
                                                        <span>{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t flex items-center">
                                        <div
                                            className={`flex items-center gap-1 text-sm ${review?.is_recommend ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {review.is_recommend ? (
                                                <>
                                                    <CheckCircle className="h-4 w-4" /> Recommends
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="h-4 w-4" /> Doesn't Recommend
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <WriteReviewModal
                company={company}
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                setReviews={setReviews}
            />
        </div>
    )
}
export default EmployeeReviews