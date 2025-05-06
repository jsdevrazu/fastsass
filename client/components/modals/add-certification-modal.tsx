"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


interface AddCertificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (certification: Omit<CertificationsEntity, "id">) => void
  editingCertification: CertificationsEntity | null
}

export function AddCertificationModal({ open, onOpenChange, onSave, editingCertification }: AddCertificationModalProps) {
  const [name, setName] = useState("")
  const [issuer, setIssuer] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [noExpiration, setNoExpiration] = useState(false)
  const [credentialUrl, setCredentialUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      name,
      org_name: issuer,
      issue_date: issueDate,
      expiry_date: (noExpiration ? null : expiryDate) ?? '',
      url: credentialUrl ?? '',
    })

    setName("")
    setIssuer("")
    setIssueDate("")
    setExpiryDate("")
    setNoExpiration(false)
    setCredentialUrl("")

    onOpenChange(false)
  }

  useEffect(() => {
    if(editingCertification){
      setName(editingCertification.name)
      setIssuer(editingCertification.org_name)
      setIssueDate(editingCertification.issue_date)
      setExpiryDate(editingCertification.expiry_date)
      setNoExpiration(editingCertification.expiry_date ? true : false)
      setCredentialUrl(editingCertification.url)
    }
  }, [editingCertification])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
            <DialogDescription>Add details about your certifications and professional credentials.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cert-name">Certification Name</Label>
              <Input
                id="cert-name"
                placeholder="e.g. AWS Certified Developer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                placeholder="e.g. Amazon Web Services"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue-date">Issue Date</Label>
                <Input
                  id="issue-date"
                  type="month"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  type="month"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  disabled={noExpiration}
                  required={!noExpiration}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="no-expiration"
                checked={noExpiration}
                onCheckedChange={(checked) => setNoExpiration(checked === true)}
              />
              <Label htmlFor="no-expiration">This certification does not expire</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="credential-url">Credential URL (Optional)</Label>
              <Input
                id="credential-url"
                placeholder="e.g. https://www.credly.com/badges/..."
                type="url"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Certification</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
