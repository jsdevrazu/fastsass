interface Notification {
  id: string
  userId: string
  type: "MENTION" | "ASSIGNED" | "RESOURCE_UPDATE"
  status: "UNREAD" | "READ"
  title: string
  message: string
  relatedResource: {
    type: string
    id: string
  }
  createdAt: string 
}
