"use client"
import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangePassword from "@/components/account/change-password"
import SetPassword from "@/components/account/set-password"
import DeleteAccount from "@/components/account/delete-account"
import NotificationJobSeekerPage from "@/components/dashboard/seeker/notification"
import PrivacyJobSeekerPage from "@/components/dashboard/seeker/privacy"
import JobPreferencesSetting from "@/components/dashboard/seeker/preferences"
import { useAuthStore } from "@/store/store"

export default function JobSeekerSettingsPage() {

    const { user } = useAuthStore()



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
                        {
                            user?.auth_provider !== 'email' ? <SetPassword /> : <ChangePassword />
                        }
                        <DeleteAccount />
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <NotificationJobSeekerPage />
                    </TabsContent>

                    <TabsContent value="privacy" className="space-y-4">
                        <PrivacyJobSeekerPage />
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-4">
                        <JobPreferencesSetting />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}