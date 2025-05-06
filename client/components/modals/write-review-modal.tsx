"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, Plus, Minus, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { review_post } from "@/lib/apis/jobs"
import { useAuthStore } from "@/store/store"

const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    employmentStatus: z.enum(["current", "former"], {
        required_error: "Please select your employment status",
    }),
    title: z.string().min(1, "Please enter a review title"),
    content: z.string().min(20, "Review content must be at least 20 characters"),
    pros: z.array(z.string()).refine((items) => items.some((item) => item.trim().length > 0), {
        message: "Please add at least one pro",
    }),
    cons: z.array(z.string()).refine((items) => items.some((item) => item.trim().length > 0), {
        message: "Please add at least one con",
    }),
    recommended: z.enum(["yes", "no"], {
        required_error: "Please select whether you recommend this company",
    }),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface WriteReviewModalProps {
    company: Company
    isOpen: boolean
    onClose: () => void
    setReviews: Dispatch<SetStateAction<Reviews[]>>
}

export function WriteReviewModal({ company, isOpen, onClose, setReviews }: WriteReviewModalProps) {
    const [hoverRating, setHoverRating] = useState(0)
    const [payloadData, setPayloadData] = useState<Reviews>()
    const { user } = useAuthStore()

    const { mutate, isPending} = useMutation({
        mutationFn: review_post,
        onSuccess: () =>{
            toast.success("Review Added Successfully")
            if (payloadData) {
                setReviews((prev) => [...prev, payloadData]) 
              }
        },
        onError: (error) =>{
            toast.error(error?.message)
        }
    })

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            employmentStatus: "current",
            title: "",
            content: "",
            pros: [""],
            cons: [""],
            recommended: "yes",
        },
    })

    const handleRatingHover = (value: number) => {
        setHoverRating(value)
    }

    const handleRatingLeave = () => {
        setHoverRating(0)
    }

    const addPro = () => {
        const currentPros = form.getValues("pros")
        form.setValue("pros", [...currentPros, ""])
    }

    const removePro = (index: number) => {
        const currentPros = form.getValues("pros")
        const newPros = [...currentPros]
        newPros.splice(index, 1)
        form.setValue("pros", newPros)
    }

    const updatePro = (index: number, value: string) => {
        const currentPros = form.getValues("pros")
        const newPros = [...currentPros]
        newPros[index] = value
        form.setValue("pros", newPros)
    }

    const addCon = () => {
        const currentCons = form.getValues("cons")
        form.setValue("cons", [...currentCons, ""])
    }

    const removeCon = (index: number) => {
        const currentCons = form.getValues("cons")
        const newCons = [...currentCons]
        newCons.splice(index, 1)
        form.setValue("cons", newCons)
    }

    const updateCon = (index: number, value: string) => {
        const currentCons = form.getValues("cons")
        const newCons = [...currentCons]
        newCons[index] = value
        form.setValue("cons", newCons)
    }

    const handleSubmit = (values: ReviewFormValues) => {
        if(user?.role !== 'employer') return toast.error("You are not eligable for review")
        const filteredPros = values.pros.filter((pro) => pro.trim() !== "")
        const filteredCons = values.cons.filter((con) => con.trim() !== "")

        const review = {
            id: company?._id,
            title: values.title,
            review: values.content,
            rating: values.rating,
            employe_status: values.employmentStatus === "current" ? "current_employee" : "former_employee",
            props: filteredPros,
            cons: filteredCons,
            is_recommend: values.recommended === "yes",
            date: String(new Date())
        }
        setPayloadData(review)
        mutate(review)

        form.reset({
            rating: 0,
            employmentStatus: "current",
            title: "",
            content: "",
            pros: [""],
            cons: [""],
            recommended: "yes",
        })

        onClose()
    }

    const handleDialogClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Write a Review for {company?.name}</DialogTitle>
                    <DialogDescription>
                        Share your experience to help others make informed decisions. Your review will be public.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Overall Rating <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div
                                            className="flex items-center gap-1"
                                            onMouseLeave={handleRatingLeave}
                                            aria-label={`Rating: ${field.value} out of 5 stars`}
                                        >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => field.onChange(value)}
                                                    onMouseEnter={() => handleRatingHover(value)}
                                                    className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    aria-label={`Rate ${value} out of 5 stars`}
                                                >
                                                    <Star
                                                        className={`h-8 w-8 ${value <= (hoverRating || field.value)
                                                                ? "fill-amber-400 text-amber-400"
                                                                : "fill-muted text-muted"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Employment Status */}
                        <FormField
                            control={form.control}
                            name="employmentStatus"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Your Status <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="current" id="current" />
                                                <FormLabel htmlFor="current" className="font-normal">
                                                    Current Employee
                                                </FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="former" id="former" />
                                                <FormLabel htmlFor="former" className="font-normal">
                                                    Former Employee
                                                </FormLabel>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Review Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Review Title <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Summarize your experience in a headline" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Review Content */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Your Review <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What was it like working at this company? What did you like or dislike?"
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pros"
                            render={() => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Pros <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <div className="space-y-2">
                                        {form.getValues("pros").map((_, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={form.getValues(`pros.${index}`)}
                                                    onChange={(e) => updatePro(index, e.target.value)}
                                                    placeholder="Add a pro"
                                                    className="flex-1"
                                                />
                                                {form.getValues("pros").length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removePro(index)}
                                                        aria-label="Remove pro"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {index === form.getValues("pros").length - 1 && (
                                                    <Button type="button" variant="outline" size="icon" onClick={addPro} aria-label="Add pro">
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {form.formState.errors.pros && (
                                        <p className="text-sm font-medium text-destructive">{form.formState.errors.pros.message}</p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cons"
                            render={() => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Cons <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <div className="space-y-2">
                                        {form.getValues("cons").map((_, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={form.getValues(`cons.${index}`)}
                                                    onChange={(e) => updateCon(index, e.target.value)}
                                                    placeholder="Add a con"
                                                    className="flex-1"
                                                />
                                                {form.getValues("cons").length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removeCon(index)}
                                                        aria-label="Remove con"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {index === form.getValues("cons").length - 1 && (
                                                    <Button type="button" variant="outline" size="icon" onClick={addCon} aria-label="Add con">
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {form.formState.errors.cons && (
                                        <p className="text-sm font-medium text-destructive">{form.formState.errors.cons.message}</p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="recommended"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>
                                        Would you recommend working at {company?.name}? <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="recommend-yes" />
                                                <FormLabel htmlFor="recommend-yes" className="font-normal flex items-center gap-1">
                                                    <CheckCircle className="h-4 w-4 text-green-500" /> Yes, I would recommend
                                                </FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="recommend-no" />
                                                <FormLabel htmlFor="recommend-no" className="font-normal flex items-center gap-1">
                                                    <XCircle className="h-4 w-4 text-red-500" /> No, I would not recommend
                                                </FormLabel>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleDialogClose}>
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit">
                                {isPending ? 'Loading...' : 'Submit Review'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
