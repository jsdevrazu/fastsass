'use client'

import { useAuthStore } from "@/store/store"
import { useEffect } from "react"
import { Zap } from "lucide-react"

export function GlobalLoader() {
    const { loading, initialLoading } = useAuthStore()

    useEffect(() => {
        initialLoading()
    }, [])

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [loading]);

    if (!loading) return null

    return (
        <div className="fixed z-[10000] inset-0 flex items-center justify-center bg-background overflow-hidden">
            <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-md bg-primary flex justify-center items-center">
                    <Zap className="h-10 w-10 text-white" />
                </div>
                <span className="text-2xl">FastSasS</span>
            </div>
        </div>
    )
}
