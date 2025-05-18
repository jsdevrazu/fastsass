"use client"

import { get_notifications, mark_all_read, mark_as_read } from "@/lib/apis/notification"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export function useNotifications() {
    const [notifications, setNotifications] = useState<NotificationsEntity[]>([])

    const { data } = useQuery<NotificationResponse>({
        queryKey: ['get_notifications'],
        queryFn: get_notifications
    })

    const { mutate } = useMutation({
        mutationFn: mark_as_read
    })

    const { mutate: mnFun } = useMutation({
        mutationFn: mark_all_read
    })


    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification._id === id ? { ...notification, status: "READ" } : notification)),
        )
        mutate(id)
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, status: "READ" })))
        mnFun()
    }

    useEffect(() => {
        if (data?.message) {
            setNotifications(data.notifications ?? [])
        }
    }, [data])

    return {
        notifications,
        markAsRead,
        markAllAsRead,
    }
}
