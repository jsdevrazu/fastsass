"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Pencil, Trash2 } from "lucide-react"

interface CertificationCardProps {
  certification: CertificationsEntity
  onEdit: (data: CertificationsEntity) => void
  onDelete: (id: string) => void
}

export function CertificationCard({ certification, onEdit, onDelete }: CertificationCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No Expiration"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date)
  }

  const issueDate = formatDate(certification?.issue_date)
  const expiryDate = certification?.expiry_date ? "No Expiration" : formatDate(certification?.expiry_date)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="border-l-4 border-primary p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{certification.name}</h3>
              <p className="text-muted-foreground">{certification?.org_name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  Issued: {issueDate}
                </Badge>
                <Badge variant={certification?.expiry_date ? "secondary" : "outline"} className="text-xs">
                  {certification?.expiry_date ? "No Expiration" : `Expires: ${expiryDate}`}
                </Badge>
              </div>
              {certification?.org_name && (
                <p className="text-xs text-muted-foreground mt-1">Credential ID: {certification.org_name}</p>
              )}
            </div>
            <div className="flex gap-2">
              {certification.url && (
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={certification.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View Credential</span>
                  </a>
                </Button>
              )}
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(certification)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(certification.id)}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
