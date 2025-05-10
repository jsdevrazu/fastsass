import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { Button } from "./ui/button";

type Props = {
    visible: boolean;
    isButtonVisible?: boolean
    message?: string;
};

export const OverlayLock = ({ visible, message, isButtonVisible }: Props) => {

    const router = useRouter()

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="text-white text-lg font-semibold px-6 py-4 bg-black/70 rounded-xl">
                {message || "Access is restricted"}
            </div>
            {
                isButtonVisible && <Button onClick={() => router.push('/pricing')}>View Price Plan</Button>
            }
        </div>
    );
};
