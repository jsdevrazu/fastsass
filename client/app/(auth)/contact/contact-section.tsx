"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, MessageSquare, HelpCircle, Building, Users, CheckCircle2, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const contactFormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    userType: z.enum(["jobSeeker", "employer", "other"], {
        required_error: "Please select a user type.",
    }),
    message: z.string().min(20, { message: "Message must be at least 20 characters." }),
    department: z.string(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        Have questions or need assistance? We're here to help. Reach out to our team through any of the channels
                        below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <ContactCard
                        icon={<MessageSquare className="h-8 w-8 text-primary" />}
                        title="General Inquiries"
                        description="For general questions about our platform and services."
                        contact="info@FastSass.com"
                        contactType="email"
                    />
                    <ContactCard
                        icon={<HelpCircle className="h-8 w-8 text-primary" />}
                        title="Customer Support"
                        description="Need help with your account or have technical issues?"
                        contact="support@FastSass.com"
                        contactType="email"
                    />
                    <ContactCard
                        icon={<Building className="h-8 w-8 text-primary" />}
                        title="Business Development"
                        description="For partnership opportunities and business inquiries."
                        contact="partnerships@FastSass.com"
                        contactType="email"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Send Us a Message</CardTitle>
                            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="general" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="support">Support</TabsTrigger>
                                    <TabsTrigger value="business">Business</TabsTrigger>
                                </TabsList>
                                <TabsContent value="general" className="space-y-4 mt-4">
                                    <ContactForm department="General Inquiries" />
                                </TabsContent>
                                <TabsContent value="support" className="space-y-4 mt-4">
                                    <ContactForm department="Customer Support" />
                                </TabsContent>
                                <TabsContent value="business" className="space-y-4 mt-4">
                                    <ContactForm department="Business Development" />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Reach us directly through these channels.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ContactInfo
                                icon={<MapPin className="h-5 w-5 text-muted-foreground" />}
                                label="Main Office"
                                value="123 Job Street, Employment City, EC 10001, United States"
                            />
                            <ContactInfo
                                icon={<Phone className="h-5 w-5 text-muted-foreground" />}
                                label="Phone"
                                value="+1 (555) 123-4567"
                            />
                            <ContactInfo
                                icon={<Mail className="h-5 w-5 text-muted-foreground" />}
                                label="Email"
                                value="contact@FastSass.com"
                            />
                            <ContactInfo
                                icon={<Clock className="h-5 w-5 text-muted-foreground" />}
                                label="Hours"
                                value="Monday - Friday: 9AM - 6PM EST"
                            />
                            <div className="pt-4">
                                <h3 className="font-medium mb-3">Connect With Us</h3>
                                <div className="flex space-x-4">
                                    <SocialButton icon={<Linkedin />} />
                                    <SocialButton icon={<Twitter />} />
                                    <SocialButton icon={<Facebook />} />
                                    <SocialButton icon={<Instagram />} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FaqItem
                            question="How do I create an account?"
                            answer="To create an account, click on the 'Sign Up' button in the top right corner of our homepage. You can register as a job seeker or an employer, and follow the prompts to complete your profile."
                        />
                        <FaqItem
                            question="How do I post a job?"
                            answer="Employers can post jobs by logging into their account, navigating to the dashboard, and clicking on the 'Post a Job' button. Follow the form to enter job details, requirements, and company information."
                        />
                        <FaqItem
                            question="Is it free to create an account?"
                            answer="Yes, creating an account is completely free for both job seekers and employers. Job seekers can browse and apply to jobs at no cost. Employers may need to purchase credits or subscriptions to post jobs."
                        />
                        <FaqItem
                            question="How can I reset my password?"
                            answer="To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter your email address, and we'll send you instructions to create a new password."
                        />
                    </div>
                </div>

                <div className="bg-muted rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Join Our Team</h2>
                            <p className="text-muted-foreground">Interested in working with us? Check out our current openings.</p>
                        </div>
                        <Button className="whitespace-nowrap">
                            <Users className="mr-2 h-4 w-4" /> View Careers
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ContactCardProps {
    icon: React.ReactNode
    title: string
    description: string
    contact: string
    contactType: "email" | "phone"
}

function ContactCard({ icon, title, description, contact, contactType }: ContactCardProps) {
    return (
        <Card className="h-full">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <p className="text-muted-foreground mb-4">{description}</p>
                    {contactType === "email" ? (
                        <a href={`mailto:${contact}`} className="text-primary hover:underline font-medium">
                            {contact}
                        </a>
                    ) : (
                        <a href={`tel:${contact.replace(/\D/g, "")}`} className="text-primary hover:underline font-medium">
                            {contact}
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

interface ContactFormProps {
    department: string
}

function ContactForm({ department }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
            department: department,
        },
    })

    function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true)

        setTimeout(() => {
            console.log("Form submitted:", data)
            setIsSubmitting(false)
            setIsSuccess(true)

            toast({
                title: "Message Sent",
                description: "We've received your message and will get back to you soon.",
                variant: "default",
            })

            form.reset()

            setTimeout(() => setIsSuccess(false), 3000)
        }, 1500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" name="department" value={department} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the subject of your message" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>I am a</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="jobSeeker">Job Seeker</SelectItem>
                                    <SelectItem value="employer">Employer</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your message here" rows={5} {...field} />
                            </FormControl>
                            <FormDescription>Please provide as much detail as possible so we can best assist you.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
                    {isSubmitting ? (
                        <>Sending Message...</>
                    ) : isSuccess ? (
                        <>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Message Sent
                        </>
                    ) : (
                        <>Send Message</>
                    )}
                </Button>
            </form>
        </Form>
    )
}

interface ContactInfoProps {
    icon: React.ReactNode
    label: string
    value: string
}

function ContactInfo({ icon, label, value }: ContactInfoProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-muted-foreground">{value}</div>
            </div>
        </div>
    )
}

interface SocialButtonProps {
    icon: React.JSX.Element
}

function SocialButton({ icon }: SocialButtonProps) {
    return (
        <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
            {icon}
        </a>
    )
}

interface FaqItemProps {
    question: string
    answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{question}</h3>
            <p className="text-muted-foreground text-sm">{answer}</p>
        </div>
    )
}
