import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"


export function VideoCard({ title, duration, thumbnail }: VideoCardProps) {
    return (
        <Card className="h-full overflow-hidden">
            <div className="relative">
                <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Video className="mr-2 h-4 w-4" /> Watch Video
                </Button>
            </CardFooter>
        </Card>
    )
}