import Link from "next/link"
import { CheckCircle, ArrowRight, Home, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cookies } from "next/headers";
import ApiStrings from "@/lib/api_strings";
import { ACCESS_TOKEN } from '@/constants'
import { redirect } from "next/navigation";

export default async function PaymentSuccessPage() {
  const cookie = await cookies()
  const token = cookie.get(ACCESS_TOKEN)?.value;

  if (!token) redirect('/login')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiStrings.PAYMENT_DETAILS}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
  });

  const data = await res.json() as PaymentDetails




  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg border-green-100 bg-white">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
              <p className="text-gray-600">
                Your payment has been processed successfully. Thank you for your purchase!
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <span className="text-sm font-medium">{data.transaction_id}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-sm font-medium">${data.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Plan</span>
                <span className="text-sm font-medium">{data.plan_name}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                <Link href="/employer">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 cursor-pointer">
                <a href={data.invoice_pdf_url} target="_blank">
                  <FileText className="mr-2 h-4 w-4" /> View Receipt
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            If you have any questions about your payment, please contact our
            <Link href="/support" className="text-green-600 hover:text-green-700 ml-1">
              customer support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
