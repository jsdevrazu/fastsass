"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
    CheckIcon,
    Crown,
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
import { useAuthStore } from "@/store/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { create_billing_portal } from "@/lib/apis/payment"
import { OverlayLock } from "@/components/overlay-lock"
import Link from "next/link"
import { emailNotificationEmployerSchema, EmailNotificationSchema } from "@/validation/auth.validation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { update_notification } from "@/lib/apis/notification"
import { InviteTeamMemberModal } from "@/components/modals/invite-team-modal"
import { delete_invite, get_invites } from "@/lib/apis/employer"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { baseURLPhoto } from "@/lib/axios"

export default function EmployerSettingsPage() {
    const [inviteModalOpen, setInviteModalOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const { mutate, isPending } = useMutation({
        mutationFn: create_billing_portal,
        onSuccess: (data) => {
            window.location.href = data.url
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { data } = useQuery<UsersResponse>({
        queryKey: ['get_invites'],
        queryFn: get_invites
    })

    const { user } = useAuthStore()
    const { handleSubmit, control, setValue } = useForm<EmailNotificationSchema>({
        resolver: zodResolver(emailNotificationEmployerSchema)
    });

    const handleRedirect = () => {
        mutate()
    }

    const { mutate: mn, isPending: loading } = useMutation({
        mutationFn: update_notification,
        onSuccess: () => {
            toast.success("Settings Update Success")
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })

    const { mutate: mnFunc, isPending: deleteLoading } = useMutation({
        mutationFn: delete_invite,
        onSuccess: () => {
            toast.success("Invite deleted successfully")
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })

    const onSubmit = async (data: EmailNotificationSchema) => {
        const payload = {
            employer_notification: {
                ...data
            }
        }
        mn(payload)
    }

    const columns: ColumnDef<UsersEntity>[] = [
        {
            accessorKey: "name",
            header: "User",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={baseURLPhoto(row.original?.avatar)}
                            alt={row.original?.full_name}
                        />
                        <AvatarFallback>{row.original.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{row.original.full_name}</div>
                        <div className="text-sm text-muted-foreground lowercase">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Badge variant='default'>{row.original.status}</Badge>,
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <Badge variant={row.original.role === "employer_owner" ? "default" : "outline"}>{row.original.role}</Badge>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <Button disabled={deleteLoading} onClick={() => mnFunc(row.original.id)} variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                        Delete Invite
                    </Button>
                </div>
            )
        }
    ];


    useEffect(() => {
        setValue('analytics_reports', user?.employer_notification?.analytics_reports ?? '')
        setValue('application_digest', user?.employer_notification?.application_digest ?? '')
        setValue('application_status_update', user?.employer_notification?.application_status_update ?? false)
        setValue('candidate_recomandation', user?.employer_notification?.candidate_recomandation ?? false)
        setValue('marketing_communication', user?.employer_notification?.marketing_communication ?? false)
        setValue('new_application_email', user?.employer_notification?.marketing_communication ?? false)
        setValue('job_post_expiration', user?.employer_notification?.job_post_expiration ?? false)
    }, [user])


    return (
        <>
            <OverlayLock visible={isPending} />
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
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-base">New Applications</Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                Receive emails when candidates apply to your job postings
                                                            </p>
                                                        </div>
                                                        <Controller
                                                            name='new_application_email'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                            )}
                                                        />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-base">Application Status Updates</Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                Receive emails when application statuses change
                                                            </p>
                                                        </div>
                                                        <Controller
                                                            name='application_status_update'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                            )}
                                                        />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-base">Job Posting Expiration</Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                Receive emails when your job postings are about to expire
                                                            </p>
                                                        </div>
                                                        <Controller
                                                            name='job_post_expiration'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                            )}
                                                        />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-base">Candidate Recommendations</Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                Receive emails with candidate recommendations for your job postings
                                                            </p>
                                                        </div>
                                                        <Controller
                                                            name='candidate_recomandation'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                            )}
                                                        />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-base">Marketing Communications</Label>
                                                            <p className="text-sm text-muted-foreground">
                                                                Receive emails about new features, tips, and promotions
                                                            </p>
                                                        </div>
                                                        <Controller
                                                            name='marketing_communication'
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <Separator />

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
                                                <Button type="submit" disabled={loading} className="mt-5">
                                                    {loading ? "Saving..." : "Save Notification Settings"}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                </TabsContent>

                                <TabsContent value="billing" className="space-y-4">
                                    {
                                        user?.feature ? <Card>
                                            <CardHeader>
                                                <CardTitle>Current Plan</CardTitle>
                                                <CardDescription>Manage your subscription and billing information</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="rounded-lg border p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{user?.feature?.current_plan_name}</h3>
                                                            <p className="text-sm text-muted-foreground">{user?.feature?.price}/month</p>
                                                        </div>
                                                        <Badge>Current Plan</Badge>
                                                    </div>
                                                    <Separator className="my-4" />
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <CheckIcon className="h-4 w-4 text-primary" />
                                                            <span className="text-sm">Up to {user?.feature?.max_job_post} active job postings</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex gap-2">
                                                        <Button onClick={handleRedirect} variant="outline">Mange Billing</Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card> : <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md dark:from-blue-950/30 dark:to-indigo-950/30">
                                            <CardContent className="grid gap-4 p-6 sm:grid-cols-[1fr_200px]">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-primary">
                                                        <Crown className="h-5 w-5" />
                                                        <h3 className="text-lg font-semibold">Upgrade to a Premium Plan</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        You're currently using a free account with limited features. Upgrade to a premium plan to unlock all
                                                        features and post unlimited jobs.
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <Button asChild>
                                                            <Link href="/pricing">Upgrade Plan</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="hidden items-center justify-center sm:flex">
                                                    <div className="relative h-32 w-32">
                                                        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                                                        <div className="absolute inset-4 rounded-full bg-primary/20"></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Crown className="h-12 w-12 text-primary" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    }

                                </TabsContent>

                                <TabsContent value="team" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Team Members</CardTitle>
                                            <CardDescription>Manage your team members and their permissions</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-end">
                                                <Button onClick={() => setInviteModalOpen(true)}>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    Invite Team Member
                                                </Button>
                                            </div>
                                            <DataTable
                                                columns={columns}
                                                data={data?.users ?? []}
                                                page={page}
                                                limit={limit}
                                                totalRows={data?.total || 0}
                                                searchKey='name'
                                                searchPlaceholder="Search by applicant name..."
                                                onPaginationChange={(newPage, newLimit) => {
                                                    setPage(newPage);
                                                    setLimit(newLimit);
                                                }}
                                            />
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
                                            <Button type="button" disabled={isPending}>
                                                {isPending ? "Saving..." : "Save Permissions"}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </main>
                </div>
            </div>
            <InviteTeamMemberModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
        </>
    )
}
