import type React from "react"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/auth/login-form"
import Logo from "@/components/logo"
import { Metadata } from "next"



export const metadata: Metadata = {
  title: "Login",
  description: "Login to your FastSass account"
}

export default function LoginPage() {


  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center p-4 py-8 md:p-8">
        <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Logo />
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to login to your account</CardDescription>
          </CardHeader>
          <LoginForm />
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
