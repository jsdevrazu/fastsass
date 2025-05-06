"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionLink?: string
  actionOnClick?: () => void
  secondaryActionLabel?: string
  secondaryActionLink?: string
  secondaryActionOnClick?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  actionOnClick,
  secondaryActionLabel,
  secondaryActionLink,
  secondaryActionOnClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className,
      )}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {actionLabel && actionLink && (
            <Button asChild>
              <Link href={actionLink}>{actionLabel}</Link>
            </Button>
          )}
          {actionLabel && actionOnClick && <Button onClick={actionOnClick}>{actionLabel}</Button>}
          {secondaryActionLabel && secondaryActionLink && (
            <Button variant="outline" asChild>
              <Link href={secondaryActionLink}>{secondaryActionLabel}</Link>
            </Button>
          )}
          {secondaryActionLabel && secondaryActionOnClick && (
            <Button variant="outline" onClick={secondaryActionOnClick}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
