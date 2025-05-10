"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangePassword from "@/components/account/change-password"
import DeleteAccount from "@/components/account/delete-account"

export default function JobSeekerSettingsPage() {


    return (
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
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-4">
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
                                            <Label className="text-base">Job Recommendations</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about jobs that match your profile and preferences
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Application Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails when there are updates to your job applications
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Interview Invitations</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails when employers invite you to interviews
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Job Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive daily or weekly emails with new jobs that match your saved searches
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
                                    <Label htmlFor="job-alerts-frequency">Job Alerts Frequency</Label>
                                    <Select defaultValue="daily">
                                        <SelectTrigger id="job-alerts-frequency">
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
                                    <Label htmlFor="recommendations-frequency">Recommendations Frequency</Label>
                                    <Select defaultValue="weekly">
                                        <SelectTrigger id="recommendations-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="privacy" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>Control who can see your profile and contact you</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Profile Visibility</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Make your profile visible to employers and recruiters
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Contact Information</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow employers to see your contact information
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Current Employer</Label>
                                            <p className="text-sm text-muted-foreground">Hide your profile from your current employer</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Activity Feed</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Show your activity on your profile (applications, saved jobs, etc.)
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Data Usage</CardTitle>
                                <CardDescription>Manage how your data is used</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Personalized Recommendations</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow us to use your data to provide personalized job recommendations
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Analytics</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow us to collect anonymous usage data to improve our services
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Third-Party Sharing</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Allow us to share your data with trusted partners
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Preferences</CardTitle>
                                <CardDescription>Set your job preferences to get better recommendations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="job-types">Job Types</Label>
                                    <Select defaultValue="full-time">
                                        <SelectTrigger id="job-types">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full-time">Full-time</SelectItem>
                                            <SelectItem value="part-time">Part-time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="freelance">Freelance</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="work-location">Work Location</Label>
                                    <Select defaultValue="remote">
                                        <SelectTrigger id="work-location">
                                            <SelectValue placeholder="Select work location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                            <SelectItem value="on-site">On-site</SelectItem>
                                            <SelectItem value="any">Any</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="salary-range">Desired Salary Range</Label>
                                    <Select defaultValue="100k-150k">
                                        <SelectTrigger id="salary-range">
                                            <SelectValue placeholder="Select salary range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                                            <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                                            <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                                            <SelectItem value="150k-200k">$150,000 - $200,000</SelectItem>
                                            <SelectItem value="200k+">$200,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience-level">Experience Level</Label>
                                    <Select defaultValue="senior">
                                        <SelectTrigger id="experience-level">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="entry">Entry Level</SelectItem>
                                            <SelectItem value="mid">Mid Level</SelectItem>
                                            <SelectItem value="senior">Senior Level</SelectItem>
                                            <SelectItem value="executive">Executive Level</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Preferred Industry</Label>
                                    <Select defaultValue="technology">
                                        <SelectTrigger id="industry">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Settings
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}