import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cookie, Shield, Settings } from "lucide-react"

interface CookieCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function CookieCard({ icon, title, description }: CookieCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface CookieTableProps {
  cookies: Array<{
    name: string
    purpose: string
    duration: string
  }>
}

function CookieTable({ cookies }: CookieTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cookie Name</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cookies.map((cookie, index) => (
          <TableRow key={index}>
            <TableCell>{cookie.name}</TableCell>
            <TableCell>{cookie.purpose}</TableCell>
            <TableCell>{cookie.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function CookiesPolicyPage() {
  const lastUpdated = "May 1, 2023"

  const essentialCookies = [
    {
      name: "session_id",
      purpose: "Maintains your session across page requests",
      duration: "Session",
    },
    {
      name: "csrf_token",
      purpose: "Helps prevent Cross-Site Request Forgery attacks",
      duration: "Session",
    },
    {
      name: "auth_token",
      purpose: "Authenticates logged-in users",
      duration: "30 days",
    },
  ]

  const functionalCookies = [
    {
      name: "language",
      purpose: "Remembers your preferred language",
      duration: "1 year",
    },
    {
      name: "recent_searches",
      purpose: "Stores your recent job searches",
      duration: "30 days",
    },
    {
      name: "user_preferences",
      purpose: "Remembers your site preferences",
      duration: "1 year",
    },
  ]

  const analyticsCookies = [
    {
      name: "_ga",
      purpose: "Google Analytics - Distinguishes unique users",
      duration: "2 years",
    },
    {
      name: "_gid",
      purpose: "Google Analytics - Identifies user session",
      duration: "24 hours",
    },
    {
      name: "_gat",
      purpose: "Google Analytics - Throttles request rate",
      duration: "1 minute",
    },
  ]

  const advertisingCookies = [
    {
      name: "_fbp",
      purpose: "Facebook Pixel - Tracks conversions",
      duration: "3 months",
    },
    {
      name: "IDE",
      purpose: "Google DoubleClick - Used for targeted advertising",
      duration: "1 year",
    },
    {
      name: "ads_prefs",
      purpose: "Stores ad preferences",
      duration: "6 months",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cookies Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <CookieCard
            icon={<Cookie className="h-8 w-8 text-primary" />}
            title="What Are Cookies"
            description="Small text files stored on your device that help us provide a better website experience."
          />
          <CookieCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Your Privacy"
            description="We respect your right to privacy and provide you with control over cookies used on our site."
          />
          <CookieCard
            icon={<Settings className="h-8 w-8 text-primary" />}
            title="Your Choices"
            description="You can manage your cookie preferences at any time through your browser settings."
          />
        </div>

        <div className="space-y-8 mb-12">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Cookie Policy</h2>
            <p className="text-muted-foreground mb-4">
              This Cookie Policy explains what cookies are and how we use them on our website. It also explains how you
              can control the cookies used. You should read this policy to understand what cookies are, how we use them,
              the types of cookies we use, the information we collect using cookies and how that information is used,
              and how to control your cookie preferences.
            </p>
            <p className="text-muted-foreground">
              For further information on how we use, store, and keep your personal data secure, see our Privacy Policy.
              This Cookie Policy is part of our Privacy Policy. It covers the use of cookies between your device and our
              site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are used to store small pieces of information. They are stored on your
              device when the website is loaded on your browser. These cookies help us make the website function
              properly, make it more secure, provide better user experience, and understand how the website performs and
              to analyze what works and where it needs improvement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              As most of the online services, our website uses cookies first-party and third-party cookies for a number
              of purposes. First-party cookies are mostly necessary for the website to function the right way, and they
              do not collect any of your personally identifiable data.
            </p>
            <p className="text-muted-foreground mb-4">
              The third-party cookies used on our website are used mainly for understanding how the website performs,
              how you interact with our website, keeping our services secure, providing advertisements that are relevant
              to you, and all in all providing you with a better and improved user experience and help speed up your
              future interactions with our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>

            <Tabs defaultValue="essential" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="essential">Essential</TabsTrigger>
                <TabsTrigger value="functional">Functional</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="advertising">Advertising</TabsTrigger>
              </TabsList>

              <TabsContent value="essential" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                      These cookies are essential for the website to function properly. Without these cookies, the
                      website would not work properly. They are typically set in response to actions made by you which
                      amount to a request for services, such as setting your privacy preferences, logging in, or filling
                      in forms.
                    </p>
                    <CookieTable cookies={essentialCookies} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="functional" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                      These cookies enable the website to provide enhanced functionality and personalization. They may
                      be set by us or by third-party providers whose services we have added to our pages. If you do not
                      allow these cookies, then some or all of these services may not function properly.
                    </p>
                    <CookieTable cookies={functionalCookies} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the
                      performance of our site. They help us to know which pages are the most and least popular and see
                      how visitors move around the site. All information these cookies collect is aggregated and
                      therefore anonymous.
                    </p>
                    <CookieTable cookies={analyticsCookies} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advertising" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-2">Advertising Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                      These cookies may be set through our site by our advertising partners. They may be used by those
                      companies to build a profile of your interests and show you relevant advertisements on other
                      sites. They do not store directly personal information but are based on uniquely identifying your
                      browser and internet device.
                    </p>
                    <CookieTable cookies={advertisingCookies} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-muted-foreground mb-4">
              You can manage your cookies preferences by adjusting the settings on your browser (see your browser Help
              for how to do this). Be aware that disabling cookies will affect the functionality of this and many other
              websites that you visit. Disabling cookies will usually result in also disabling certain functionality and
              features of this site. Therefore it is recommended that you do not disable cookies.
            </p>

            <div className="bg-muted p-6 rounded-lg mt-6">
              <h3 className="font-bold mb-4">Browser Cookie Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Google Chrome</h4>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Click the menu icon (three dots) in the browser's top-right corner</li>
                    <li>Select "Settings"</li>
                    <li>Click on "Privacy and security"</li>
                    <li>Click on "Cookies and other site data"</li>
                    <li>Adjust your cookie settings as needed</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mozilla Firefox</h4>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Click the menu button (three lines) in the top-right corner</li>
                    <li>Select "Options" (Windows) or "Preferences" (Mac)</li>
                    <li>Select "Privacy & Security" panel</li>
                    <li>Set "Enhanced Tracking Protection" to your preferred level</li>
                    <li>Scroll down to the "Cookies and Site Data" section</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cookie Consent</h2>
            <p className="text-muted-foreground mb-4">
              When you first visit our website, we will show you a cookie banner that allows you to choose which cookies
              you allow us to use. You can change your preferences at any time by clicking the "Cookie Settings" button
              at the bottom of our website.
            </p>
            <div className="mt-6">
              <Button>Update Cookie Preferences</Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">More Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our use of cookies or other technologies, please email us at
              privacy@jobportal.com or contact us through the methods described in our Privacy Policy.
            </p>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
