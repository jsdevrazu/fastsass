"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
    CreditCard,
    Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import ChangePassword from "@/components/account/change-password"
import DeleteAccount from "@/components/account/delete-account"
import EmployerProfile from "@/components/account/account-form"

export default function EmployerSettingsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast.success("Settings updated", {
                description: "Your settings have been successfully updated.",
            })
        } catch (error) {
            toast.error("Error", {
                description: "There was an error updating your settings. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col">
                <main className="flex-1 overflow-auto">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                            <p className="text-muted-foreground">Manage your account settings and preferences</p>
                        </div>

                        <Tabs defaultValue="account" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
                                <TabsTrigger value="team">Team Members</TabsTrigger>
                            </TabsList>

                            <TabsContent value="account" className="space-y-4">
                                <EmployerProfile />
                                <ChangePassword />
                                <DeleteAccount />
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Email Notifications</CardTitle>
                                        <CardDescription>Manage the emails you receive from us</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">New Applications</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive emails when candidates apply to your job postings
                                                    </p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Application Status Updates</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive emails when application statuses change
                                                    </p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Job Posting Expiration</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive emails when your job postings are about to expire
                                                    </p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Candidate Recommendations</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive emails with candidate recommendations for your job postings
                                                    </p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-base">Marketing Communications</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive emails about new features, tips, and promotions
                                                    </p>
                                                </div>
                                                <Switch />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Frequency</CardTitle>
                                        <CardDescription>Choose how often you want to receive notifications</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="application-digest">Application Digest</Label>
                                            <Select defaultValue="daily">
                                                <SelectTrigger id="application-digest">
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="realtime">Real-time</SelectItem>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="analytics-reports">Analytics Reports</Label>
                                            <Select defaultValue="weekly">
                                                <SelectTrigger id="analytics-reports">
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="billing" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Plan</CardTitle>
                                        <CardDescription>Manage your subscription and billing information</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">Business Plan</h3>
                                                    <p className="text-sm text-muted-foreground">$99/month</p>
                                                </div>
                                                <Badge>Current Plan</Badge>
                                            </div>
                                            <Separator className="my-4" />
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <CheckIcon className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">Up to 10 active job postings</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckIcon className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">Advanced candidate filtering</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckIcon className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">Analytics dashboard</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckIcon className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">Team collaboration (up to 5 users)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckIcon className="h-4 w-4 text-primary" />
                                                    <span className="text-sm">Email support</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <Button variant="outline">Change Plan</Button>
                                                <Button variant="destructive">Cancel Subscription</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Method</CardTitle>
                                        <CardDescription>Manage your payment methods</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-muted">
                                                        <CreditCard className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Visa ending in 4242</p>
                                                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">Default</Badge>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant="outline">Add Payment Method</Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing History</CardTitle>
                                        <CardDescription>View your billing history and download invoices</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <div className="grid grid-cols-5 border-b p-3 text-sm font-medium">
                                                <div>Date</div>
                                                <div className="col-span-2">Description</div>
                                                <div>Amount</div>
                                                <div>Invoice</div>
                                            </div>
                                            <div className="divide-y">
                                                {billingHistory.map((item) => (
                                                    <div key={item.id} className="grid grid-cols-5 p-3 text-sm">
                                                        <div>{item.date}</div>
                                                        <div className="col-span-2">{item.description}</div>
                                                        <div>${item.amount}</div>
                                                        <div>
                                                            <Button variant="ghost" size="sm" className="h-8 px-2">
                                                                Download
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="team" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Team Members</CardTitle>
                                        <CardDescription>Manage your team members and their permissions</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-end">
                                            <Button>
                                                <Users className="mr-2 h-4 w-4" />
                                                Invite Team Member
                                            </Button>
                                        </div>
                                        <div className="rounded-md border">
                                            <div className="grid grid-cols-5 border-b p-3 text-sm font-medium">
                                                <div className="col-span-2">Name</div>
                                                <div>Email</div>
                                                <div>Role</div>
                                                <div>Actions</div>
                                            </div>
                                            <div className="divide-y">
                                                {teamMembers.map((member) => (
                                                    <div key={member.id} className="grid grid-cols-5 p-3 text-sm">
                                                        <div className="col-span-2 flex items-center gap-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage
                                                                    src={`/placeholder.svg?height=32&width=32&text=${member.name.charAt(0)}`}
                                                                    alt={member.name}
                                                                />
                                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="font-medium">{member.name}</span>
                                                        </div>
                                                        <div className="flex items-center">{member.email}</div>
                                                        <div className="flex items-center">
                                                            <Badge variant={member.role === "Admin" ? "default" : "outline"}>{member.role}</Badge>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Button variant="ghost" size="sm" className="h-8 px-2">
                                                                Edit
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Role Permissions</CardTitle>
                                        <CardDescription>Configure permissions for each role</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">Admin</h3>
                                                <p className="text-sm text-muted-foreground">Full access to all features and settings</p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h3 className="text-lg font-semibold">Recruiter</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Can post jobs, review applications, and manage candidates
                                                </p>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="recruiter-post-jobs">Post Jobs</Label>
                                                        <Switch id="recruiter-post-jobs" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="recruiter-manage-applications">Manage Applications</Label>
                                                        <Switch id="recruiter-manage-applications" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="recruiter-view-analytics">View Analytics</Label>
                                                        <Switch id="recruiter-view-analytics" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="recruiter-edit-company">Edit Company Profile</Label>
                                                        <Switch id="recruiter-edit-company" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="recruiter-billing">Manage Billing</Label>
                                                        <Switch id="recruiter-billing" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h3 className="text-lg font-semibold">Hiring Manager</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Can review applications and provide feedback on candidates
                                                </p>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="manager-post-jobs">Post Jobs</Label>
                                                        <Switch id="manager-post-jobs" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="manager-manage-applications">Manage Applications</Label>
                                                        <Switch id="manager-manage-applications" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="manager-view-analytics">View Analytics</Label>
                                                        <Switch id="manager-view-analytics" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="manager-edit-company">Edit Company Profile</Label>
                                                        <Switch id="manager-edit-company" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="manager-billing">Manage Billing</Label>
                                                        <Switch id="manager-billing" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? "Saving..." : "Save Permissions"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}


function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

const billingHistory = [
    {
        id: "1",
        date: "May 1, 2023",
        description: "Business Plan - Monthly",
        amount: "99.00",
    },
    {
        id: "2",
        date: "Apr 1, 2023",
        description: "Business Plan - Monthly",
        amount: "99.00",
    },
    {
        id: "3",
        date: "Mar 1, 2023",
        description: "Business Plan - Monthly",
        amount: "99.00",
    },
    {
        id: "4",
        date: "Feb 1, 2023",
        description: "Business Plan - Monthly",
        amount: "99.00",
    },
]

const teamMembers = [
    {
        id: "1",
        name: "David Wilson",
        email: "david.wilson@techcorp.com",
        role: "Admin",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        role: "Recruiter",
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael.brown@techcorp.com",
        role: "Hiring Manager",
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@techcorp.com",
        role: "Recruiter",
    },
]
