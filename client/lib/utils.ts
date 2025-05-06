import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusVariant(status: string) {
  switch (status) {
    case "Reviewed":
      return "default"
    case "Pending":
      return "outline"
    case "Interviewed":
      return "secondary"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}