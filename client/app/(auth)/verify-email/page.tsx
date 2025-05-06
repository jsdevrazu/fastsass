import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckCircle2 } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="h-6 w-6" />
          <span>JobPortal</span>
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify
              your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Didn't receive the email? Check your spam folder or</p>
            </div>
            <Button className="w-full" type="submit">
              Resend verification email
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground text-center">
              <Link href="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
