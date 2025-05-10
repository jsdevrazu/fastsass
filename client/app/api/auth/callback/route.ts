import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers";
import ApiStrings from '@/lib/api_strings';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const cookie = await cookies()

    if (!token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=missing_token`);
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiStrings.ME}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Token validation failed");
        }

        const data: CurrentUserResponse = await res.json();
        cookie.set("access_token", token);
        if (data.user?.role === 'job_seeker') {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/seeker/dashboard`);
        } else if (data.user?.role === 'employer') {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/employer`);
        } else {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
        }

    } catch (err) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    }
}