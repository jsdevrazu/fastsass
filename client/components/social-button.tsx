import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"



const SocialMediaButtonLogin = ({ role = 'job_seeker' }: { role?: string }) => {

    const handleSocialMedia = (provider: string) => {
        if (provider === 'google') {
            window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/google?role=${role}`
        }
        if (provider === 'github') {
            window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/github?role=${role}`
        }
    }


    return (
        <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleSocialMedia('github')} variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
            </Button>
            <Button onClick={() => handleSocialMedia('google')} variant="outline" className="w-full">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
            </Button>
        </div>
    )
}

export default SocialMediaButtonLogin