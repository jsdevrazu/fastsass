'use client'

import { useAuthStore } from "@/store/store"
import { useEffect } from "react"
import Image from "next/image"

export function GlobalLoader() {
    const { loading, initialLoading } = useAuthStore()

    useEffect(() => {
        initialLoading()
    }, [])

    if (!loading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-2">
                <Image src={'/logo_loading.png'} alt="Fastsass" width={400} height={400} />
            </div>
        </div>
    )
}
