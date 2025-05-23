import { cookies } from "next/headers";
import ApiStrings from "@/lib/api_strings";
import { ACCESS_TOKEN } from '@/constants'


export async function getServerUser() {
    const cookie = await cookies()
    const token = cookie.get(ACCESS_TOKEN)?.value;


    if (!token) return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiStrings.ME}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data: CurrentUserResponse = await res.json();
        
        return data.user;
    } catch (err) {
        return null;
    }
}
