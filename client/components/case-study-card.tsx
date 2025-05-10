import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export function CaseStudyCard({ title, industry, result }: CaseStudyCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="text-sm font-medium text-muted-foreground mb-1">{industry}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
          Result: {result}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Read Case Study
        </Button>
      </CardFooter>
    </Card>
  )
}