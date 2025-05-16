import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, UserCheck } from "lucide-react"

interface PrivacyCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function PrivacyCard({ icon, title, description }: PrivacyCardProps) {
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

function TableOfContents() {
  return (
    <div className="bg-muted p-6 rounded-lg mb-8">
      <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        <li>
          <a href="#introduction" className="text-primary hover:underline">
            1. Introduction
          </a>
        </li>
        <li>
          <a href="#data-we-collect" className="text-primary hover:underline">
            2. The Data We Collect About You
          </a>
        </li>
        <li>
          <a href="#how-we-collect" className="text-primary hover:underline">
            3. How We Collect Your Personal Data
          </a>
        </li>
        <li>
          <a href="#how-we-use" className="text-primary hover:underline">
            4. How We Use Your Personal Data
          </a>
        </li>
        <li>
          <a href="#data-sharing" className="text-primary hover:underline">
            5. Disclosures of Your Personal Data
          </a>
        </li>
        <li>
          <a href="#international-transfers" className="text-primary hover:underline">
            6. International Transfers
          </a>
        </li>
        <li>
          <a href="#data-security" className="text-primary hover:underline">
            7. Data Security
          </a>
        </li>
        <li>
          <a href="#data-retention" className="text-primary hover:underline">
            8. Data Retention
          </a>
        </li>
        <li>
          <a href="#your-rights" className="text-primary hover:underline">
            9. Your Legal Rights
          </a>
        </li>
        <li>
          <a href="#cookies" className="text-primary hover:underline">
            10. Cookies
          </a>
        </li>
        <li>
          <a href="#contact" className="text-primary hover:underline">
            11. Contact Us
          </a>
        </li>
      </ul>
    </div>
  )
}

interface PolicySectionProps {
  id: string
  title: string
  content: string
}

function PolicySection({ id, title, content }: PolicySectionProps) {
  return (
    <section id={id} className="scroll-mt-16">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-sm max-w-none text-muted-foreground" />
    </section>
  )
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 1, 2023"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PrivacyCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Data Protection"
            description="We implement robust security measures to protect your personal information."
          />
          <PrivacyCard
            icon={<UserCheck className="h-8 w-8 text-primary" />}
            title="Your Rights"
            description="You have control over your data with clear options to access, modify, or delete it."
          />
          <PrivacyCard
            icon={<Eye className="h-8 w-8 text-primary" />}
            title="Transparency"
            description="We're committed to being clear about what data we collect and how we use it."
          />
        </div>

        <div className="space-y-8 mb-12">
          <TableOfContents />

          <PolicySection
            id="introduction"
            title="1. Introduction"
            content={`
              <p>Welcome to FastSass. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
              
              <p>This privacy policy aims to give you information on how FastSass collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up for an account, post a job, apply for a job, or use any other services we offer.</p>
              
              <p>It is important that you read this privacy policy together with any other privacy notice or fair processing notice we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data.</p>
            `}
          />

          <PolicySection
            id="data-we-collect"
            title="2. The Data We Collect About You"
            content={`
              <p>Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
              
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, date of birth, and gender.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                <li><strong>Professional Data</strong> includes your resume, work history, education, skills, references, and other information related to your professional background.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Profile Data</strong> includes your username and password, job applications or job postings made by you, your interests, preferences, feedback, and survey responses.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
                <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
              
              <p class="mt-4">We also collect, use and share <strong>Aggregated Data</strong> such as statistical or demographic data for any purpose. Aggregated Data may be derived from your personal data but is not considered personal data in law as this data does not directly or indirectly reveal your identity.</p>
              
              <p>We do not collect any <strong>Special Categories of Personal Data</strong> about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data). Nor do we collect any information about criminal convictions and offenses.</p>
            `}
          />

          <PolicySection
            id="how-we-collect"
            title="3. How We Collect Your Personal Data"
            content={`
              <p>We use different methods to collect data from and about you including through:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Direct interactions.</strong> You may give us your Identity, Contact, Professional, and Profile Data by filling in forms or by corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you:
                  <ul class="list-disc pl-6 mt-1">
                    <li>Create an account on our website;</li>
                    <li>Post a job listing;</li>
                    <li>Apply for a job;</li>
                    <li>Subscribe to our service or publications;</li>
                    <li>Request marketing to be sent to you;</li>
                    <li>Enter a competition, promotion or survey; or</li>
                    <li>Give us some feedback.</li>
                  </ul>
                </li>
                <li><strong>Automated technologies or interactions.</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.</li>
                <li><strong>Third parties or publicly available sources.</strong> We may receive personal data about you from various third parties and public sources, such as analytics providers, advertising networks, and search information providers.</li>
              </ul>
            `}
          />

          <PolicySection
            id="how-we-use"
            title="4. How We Use Your Personal Data"
            content={`
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
              
              <p class="mt-4"><strong>Purposes for which we will use your personal data:</strong></p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>To register you as a new customer</li>
                <li>To process and deliver our services</li>
                <li>To manage our relationship with you</li>
                <li>To enable you to participate in features of our service</li>
                <li>To administer and protect our business and this website</li>
                <li>To deliver relevant website content and advertisements to you</li>
                <li>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences</li>
                <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
              </ul>
              
              <p class="mt-4"><strong>Marketing:</strong></p>
              <p>We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. You can opt out of marketing communications at any time by following the unsubscribe links on any marketing message sent to you or by contacting us at any time.</p>
            `}
          />

          <PolicySection
            id="data-sharing"
            title="5. Disclosures of Your Personal Data"
            content={`
              <p>We may have to share your personal data with the parties set out below for the purposes outlined in section 4 above:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Employers or job seekers, as appropriate, to facilitate the job application and hiring process.</li>
                <li>Service providers who provide IT and system administration services.</li>
                <li>Professional advisers including lawyers, bankers, auditors, and insurers.</li>
                <li>Regulators and other authorities who require reporting of processing activities in certain circumstances.</li>
                <li>Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this privacy policy.</li>
              </ul>
              
              <p class="mt-4">We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>
            `}
          />

          <PolicySection
            id="international-transfers"
            title="6. International Transfers"
            content={`
              <p>We may share your personal data within our group of companies and with external third parties, which may involve transferring your data outside your country of residence. Whenever we transfer your personal data internationally, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data.</li>
                <li>Where we use certain service providers, we may use specific contracts approved for use which give personal data the same protection it has in your country.</li>
                <li>Where we use providers based in the US, we may transfer data to them if they are part of the Privacy Shield which requires them to provide similar protection to personal data shared between Europe and the US.</li>
              </ul>
            `}
          />

          <PolicySection
            id="data-security"
            title="7. Data Security"
            content={`
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.</p>
              
              <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
            `}
          />

          <PolicySection
            id="data-retention"
            title="8. Data Retention"
            content={`
              <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
              
              <p>To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.

              <p>In some circumstances we may anonymize your personal data (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you.</p>
            `}
          />

          <PolicySection
            id="your-rights"
            title="9. Your Legal Rights"
            content={`
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Request access</strong> to your personal data.</li>
                <li><strong>Request correction</strong> of your personal data.</li>
                <li><strong>Request erasure</strong> of your personal data.</li>
                <li><strong>Object to processing</strong> of your personal data.</li>
                <li><strong>Request restriction of processing</strong> your personal data.</li>
                <li><strong>Request transfer</strong> of your personal data.</li>
                <li><strong>Right to withdraw consent</strong> where we are relying on consent to process your personal data.</li>
              </ul>
              
              <p class="mt-4">If you wish to exercise any of the rights set out above, please contact us using the details provided below.</p>
              
              <p><strong>No fee usually required:</strong> You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive, or excessive. Alternatively, we may refuse to comply with your request in these circumstances.</p>
              
              <p><strong>Time limit to respond:</strong> We try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.</p>
            `}
          />

          <PolicySection
            id="cookies"
            title="10. Cookies"
            content={`
              <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. For detailed information on the cookies we use and the purposes for which we use them see our Cookie Policy.</p>
            `}
          />

          <PolicySection
            id="contact"
            title="11. Contact Us"
            content={`
              <p>If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager:</p>
              
              <div class="mt-2">
                <p>Email address: privacy@FastSass.com</p>
                <p>Postal address: 123 Job Street, Employment City, EC 10001, United States</p>
              </div>
              
              <p class="mt-4">You have the right to make a complaint at any time to the relevant data protection authority in your jurisdiction. We would, however, appreciate the chance to deal with your concerns before you approach the authority, so please contact us in the first instance.</p>
            `}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="outline" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cookies">Cookies Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FastSass. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
