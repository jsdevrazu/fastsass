import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"


export function DownloadCard({ title, description, fileType, fileSize }: DownloadCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{fileType}</span>
                    <span>{fileSize}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
            </CardFooter>
        </Card>
    )
}