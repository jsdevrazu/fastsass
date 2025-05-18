"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Check, MessageSquare, RefreshCw, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: NotificationsEntity
  onMarkAsRead: (id: string) => void
  compact?: boolean
}

export function NotificationItem({ notification, onMarkAsRead, compact = false }: NotificationItemProps) {
  const { _id, type, title, message, status, created_at } = notification

  const isUnread = status === "UNREAD"

  const getIcon = () => {
    switch (type) {
      case "MENTION":
        return <MessageSquare className="h-4 w-4" />
      case "ASSIGNED":
        return <UserPlus className="h-4 w-4" />
      case "RESOURCE_UPDATE":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }


  return (
    <div
      className={cn(
        "group relative flex gap-4 p-4",
        isUnread && "bg-primary/5",
        compact ? "items-start" : "items-center",
      )}
    >
      {isUnread && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />}
      <div
        className={cn(
          "flex-shrink-0 rounded-full p-2",
          type === "MENTION" && "bg-blue-100 text-blue-600",
          type === "ASSIGNED" && "bg-green-100 text-green-600",
          type === "RESOURCE_UPDATE" && "bg-amber-100 text-amber-600",
        )}
      >
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div>
          <h4 className="text-sm font-medium leading-none mb-1">{title}</h4>
          {message && <p className={cn("text-sm text-muted-foreground", compact && "line-clamp-4")}>{message}</p>}
        </div>
      </div>
      {isUnread && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onMarkAsRead(_id)}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Mark as read</span>
        </Button>
      )}
    </div>
  )
}
