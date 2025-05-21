import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction } from "lucide-react"
import Link from "next/link"

export default function UnderDevelopmentPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Construction className="h-24 w-24 text-yellow-500 dark:text-yellow-400" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Under Development</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you are trying to access is currently under development. Please check back later.
        </p>
        <Button asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="mt-16 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} FastSass. All rights reserved.
      </div>
    </div>
  )
}
