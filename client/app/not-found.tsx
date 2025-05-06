import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-extrabold text-primary/10">404</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="inline-block rounded-full bg-muted p-5">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Page not found</h2>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-muted-foreground">
            Oops! The page you're looking for seems to have vanished into the job market.
          </p>
          <p className="text-sm text-muted-foreground">It might be taking a career break or has moved to a new URL.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/jobs">
              <Search className="h-4 w-4" />
              Browse Jobs
            </Link>
          </Button>
          <Button asChild variant="ghost" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
