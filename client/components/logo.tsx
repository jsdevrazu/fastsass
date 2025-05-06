import { Zap } from 'lucide-react'
import React from 'react'

const Logo = () => {
    return (
        <>
            <div className="w-8 h-8 rounded-md bg-[#5e3cf2] flex justify-center items-center">
                <Zap className="h-6 w-6 text-white" />
            </div>
            <span>FastSasS</span>
        </>
    )
}

export default Logo