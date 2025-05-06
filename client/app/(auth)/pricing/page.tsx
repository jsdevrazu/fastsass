import PriceSection from "@/app/(auth)/pricing/price-section"

export default function PricingPage() { 
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="app_container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your business
                </p>
              </div>
            </div>
           <PriceSection />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="app_container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Answers to common questions about our pricing and features
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 pt-12">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I change plans later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Do you offer discounts for annual billing?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 15% discount when you choose annual billing on any of our plans.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What happens when my job posting expires?</h3>
                <p className="text-muted-foreground">
                  When a job posting expires, it will no longer appear in search results, but you can still access all
                  applications received.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I get a refund if I'm not satisfied?</h3>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee if you're not completely satisfied with our service.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Do you offer custom plans for larger organizations?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer custom enterprise solutions. Please contact our sales team to discuss your specific
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
