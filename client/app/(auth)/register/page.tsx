import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import SignupForm from "@/components/auth/signup-form"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Signup",
  description: "Create your FastSass account",
};

export default function RegisterPage() {

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center p-4 md:p-8">
        <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Logo />
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <SignupForm />
        </Card>
      </div>
    </div>
  )
}
