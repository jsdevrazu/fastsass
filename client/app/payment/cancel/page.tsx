import Link from "next/link"
import { XCircle, ArrowLeft, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg border-gray-100 bg-white">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="rounded-full bg-gray-100 p-3">
              <XCircle className="h-12 w-12 text-gray-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
              <p className="text-gray-600">
                Your payment process was cancelled. No charges have been made to your account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button asChild className="flex-1">
                <Link href="/pricing">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/support">
                  <HelpCircle className="mr-2 h-4 w-4" /> Get Help
                </Link>
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">Why was my payment cancelled?</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-gray-600 text-left list-disc pl-5 space-y-1">
                    <li>You may have clicked the cancel button during checkout</li>
                    <li>Your card might have insufficient funds</li>
                    <li>There could be an issue with your payment method</li>
                    <li>Your bank might have declined the transaction</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 text-left">
                    We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers.
                    For certain regions, we also support local payment methods.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        <div className="mt-6 flex justify-center">
          <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
            <Link href="/pricing" className="inline-flex items-center">
              <CreditCard className="mr-2 h-4 w-4" /> View Pricing Plans
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need assistance with your payment?
            <Link href="/support" className="text-blue-600 hover:text-blue-700 ml-1">
              Contact our support team
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#f9fafb"
            fillOpacity="0.6"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
