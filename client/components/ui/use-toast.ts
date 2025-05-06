"use client"

import { useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])
    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== props))
    }, 5000)

    return props
  }

  return { toast, toasts }
}

// Export a simple toast function that can be used without the hook
export const toast = (props: ToastProps) => {
  // This is a simplified version that will be replaced by the actual implementation
  // when the Toaster component is rendered
  console.log("Toast:", props)
  return props
}
