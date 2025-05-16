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
                <div
                    aria-label="Loading..."
                    role="status"
                    className="flex items-center space-x-2"
                >
                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line
                            x1={128}
                            y1={32}
                            x2={128}
                            y2={64}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        />
                        <line
                            x1="195.9"
                            y1="60.1"
                            x2="173.3"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        />
                        <line
                            x1={224}
                            y1={128}
                            x2={192}
                            y2={128}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        ></line>
                        <line
                            x1="195.9"
                            y1="195.9"
                            x2="173.3"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        />
                        <line
                            x1={128}
                            y1={224}
                            x2={128}
                            y2={192}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        ></line>
                        <line
                            x1="60.1"
                            y1="195.9"
                            x2="82.7"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        />
                        <line
                            x1={32}
                            y1={128}
                            x2={64}
                            y2={128}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        />
                        <line
                            x1="60.1"
                            y1="60.1"
                            x2="82.7"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={24}
                        ></line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">Loading...</span>
                </div>

            </div>
            {
                isButtonVisible && <Button onClick={() => router.push('/pricing')}>View Price Plan</Button>
            }
        </div>
    );
};
