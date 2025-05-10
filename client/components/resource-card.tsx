import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function ResourceCard({ icon, title, description, link }: ResourceCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="mb-2">{icon}</div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Link href={link} passHref>
                    <Button variant="outline" className="w-full">
                        Read Guide
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ResourceCard