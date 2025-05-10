import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers";
import ApiStrings from '@/lib/api_strings';
import { redirect } from 'next/navigation'


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const cookie = await cookies()

    if (!token) {
        return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=missing_token`);
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiStrings.ME}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (!res.ok) {
            throw new Error("Token validation failed");
        }

        const data: CurrentUserResponse = await res.json();
        cookie.set("access_token", token);
        if (data.user?.role === 'job_seeker') {
            return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/seeker/dashboard`);
        } else if (data.user?.role === 'employer') {
            return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/employer`);
        } else {
            return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
        }

    } catch (err) {
        return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    }
}