"use client"

import { useState } from "react"

// Notification type definition matching mock data
type Notification = {
    id: string
    userId: string
    type: "MENTION" | "ASSIGNED" | "RESOURCE_UPDATE"
    status: "READ" | "UNREAD"
    title: string
    message: string
    relatedResource: {
        type: string
        id: string
    }
    createdAt: string
}

// Mock notification data
const mockNotifications: Notification[] = [
    {
        id: "1",
        userId: "user1",
        type: "MENTION",
        status: "UNREAD",
        title: "John mentioned you in a comment",
        message: "Hey @user, can you review this design when you get a chance?",
        relatedResource: {
            type: "project",
            id: "proj-123",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
        id: "2",
        userId: "user1",
        type: "ASSIGNED",
        status: "UNREAD",
        title: "You've been assigned to a new task",
        message: "Sarah assigned you to 'Update landing page content'",
        relatedResource: {
            type: "task",
            id: "task-456",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
        id: "3",
        userId: "user1",
        type: "RESOURCE_UPDATE",
        status: "UNREAD",
        title: "Project updated",
        message: "Marketing Campaign project was updated with new requirements",
        relatedResource: {
            type: "project",
            id: "proj-789",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
        id: "4",
        userId: "user1",
        type: "MENTION",
        status: "READ",
        title: "Alex mentioned you in a task",
        message: "I think @user would be perfect for handling the API integration part",
        relatedResource: {
            type: "task",
            id: "task-101",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
        id: "5",
        userId: "user1",
        type: "RESOURCE_UPDATE",
        status: "READ",
        title: "Document updated",
        message: "The project requirements document has been updated",
        relatedResource: {
            type: "project",
            id: "proj-202",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
        id: "6",
        userId: "user1",
        type: "ASSIGNED",
        status: "READ",
        title: "Task reassigned",
        message: "The task 'Fix navigation bug' has been reassigned to you",
        relatedResource: {
            type: "task",
            id: "task-303",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    },
    {
        id: "7",
        userId: "user1",
        type: "MENTION",
        status: "READ",
        title: "Team mentioned you",
        message: "The design team mentioned you in their weekly update",
        relatedResource: {
            type: "project",
            id: "proj-404",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
        id: "8",
        userId: "user1",
        type: "RESOURCE_UPDATE",
        status: "UNREAD",
        title: "New comment on your task",
        message: "Michael left a comment on the task you're working on",
        relatedResource: {
            type: "task",
            id: "task-505",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
    },
    {
        id: "9",
        userId: "user1",
        type: "ASSIGNED",
        status: "READ",
        title: "Project role updated",
        message: "Your role in the Analytics Dashboard project has been updated to Lead Developer",
        relatedResource: {
            type: "project",
            id: "proj-606",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    },
    {
        id: "10",
        userId: "user1",
        type: "MENTION",
        status: "READ",
        title: "Jessica mentioned you",
        message: "Can @user help with the deployment this weekend?",
        relatedResource: {
            type: "task",
            id: "task-707",
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
    },
]

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

    // Mark a single notification as read
    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, status: "READ" } : notification)),
        )
    }

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, status: "READ" })))
    }

    // In a real app, you would fetch notifications from an API
    // useEffect(() => {
    //   const fetchNotifications = async () => {
    //     try {
    //       const response = await fetch('/api/notifications')
    //       const data = await response.json()
    //       setNotifications(data)
    //     } catch (error) {
    //       console.error('Failed to fetch notifications:', error)
    //     }
    //   }
    //
    //   fetchNotifications()
    // }, [])

    return {
        notifications,
        markAsRead,
        markAllAsRead,
    }
}
