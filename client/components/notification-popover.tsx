"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationItem } from "@/components/notification-item"
import { useNotifications } from "@/hooks/use-notifications"

export function NotificationPopover() {
    const { notifications, markAsRead } = useNotifications()
    const [open, setOpen] = useState(false)

    const unreadNotifications = notifications.filter((notification) => notification.status === "UNREAD")

    const recentUnreadNotifications = unreadNotifications
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)

    const unreadCount = unreadNotifications.length

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-medium">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => {
                                unreadNotifications.forEach((notification) => markAsRead(notification._id))
                                setOpen(false)
                            }}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <div className="max-h-[calc(80vh-10rem)] overflow-y-auto">
                    {recentUnreadNotifications.length > 0 ? (
                        <div className="divide-y">
                            {recentUnreadNotifications.map((notification) => (
                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    onMarkAsRead={(id) => {
                                        markAsRead(id)
                                        setOpen(false)
                                    }}
                                    compact
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                            <div className="rounded-full bg-primary/10 p-3 mb-3">
                                <Bell className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-medium mb-1">You're all caught up!</p>
                            <p className="text-xs text-muted-foreground">We'll notify you when something new arrives.</p>
                        </div>
                    )}
                </div>
                <div className="border-t p-2">
                    <Link
                        href="/notifications"
                        className="block w-full rounded-md p-2 text-center text-sm font-medium text-primary hover:bg-primary/10"
                        onClick={() => setOpen(false)}
                    >
                        View all notifications
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}
