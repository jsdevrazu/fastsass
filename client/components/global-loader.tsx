'use client'

import { useAuthStore } from "@/store/store"
import { useEffect } from "react"
import Logo from "@/components/logo"

export function GlobalLoader() {
    const { loading, initialLoading } = useAuthStore()

    useEffect(() => {
        initialLoading()
    }, [])

    if (!loading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-2">
                <Logo />
            </div>
        </div>
    )
}
