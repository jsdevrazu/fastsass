import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Shield, AlertTriangle } from "lucide-react"

interface TermsCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function TermsCard({ icon, title, description }: TermsCardProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <ul className="space-y-2">
            <li>
              <a href="#introduction" className="text-primary hover:underline">
                1. Introduction
              </a>
            </li>
            <li>
              <a href="#definitions" className="text-primary hover:underline">
                2. Definitions
              </a>
            </li>
            <li>
              <a href="#account" className="text-primary hover:underline">
                3. Account Registration and Requirements
              </a>
            </li>
            <li>
              <a href="#user-conduct" className="text-primary hover:underline">
                4. User Conduct and Responsibilities
              </a>
            </li>
            <li>
              <a href="#content" className="text-primary hover:underline">
                5. Content and Intellectual Property
              </a>
            </li>
            <li>
              <a href="#services" className="text-primary hover:underline">
                6. Services and Fees
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2">
            <li>
              <a href="#termination" className="text-primary hover:underline">
                7. Termination
              </a>
            </li>
            <li>
              <a href="#disclaimers" className="text-primary hover:underline">
                8. Disclaimers and Limitations of Liability
              </a>
            </li>
            <li>
              <a href="#indemnification" className="text-primary hover:underline">
                9. Indemnification
              </a>
            </li>
            <li>
              <a href="#governing-law" className="text-primary hover:underline">
                10. Governing Law and Dispute Resolution
              </a>
            </li>
            <li>
              <a href="#changes" className="text-primary hover:underline">
                11. Changes to Terms
              </a>
            </li>
            <li>
              <a href="#miscellaneous" className="text-primary hover:underline">
                12. Miscellaneous
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface TermsSectionProps {
  id: string
  title: string
  content: string
}

function TermsSection({ id, title, content }: TermsSectionProps) {
  return (
    <section id={id} className="scroll-mt-16">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-sm max-w-none text-muted-foreground" />
    </section>
  )
}

export default function TermsOfServicePage() {
  const lastUpdated = "May 1, 2023"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <TermsCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Agreement"
            description="These terms constitute a legally binding agreement between you and JobPortal."
          />
          <TermsCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Protection"
            description="We're committed to protecting your rights and privacy while using our services."
          />
          <TermsCard
            icon={<AlertTriangle className="h-8 w-8 text-primary" />}
            title="Compliance"
            description="Using our services requires compliance with these terms and applicable laws."
          />
        </div>

        <div className="space-y-8 mb-12">
          <TableOfContents />

          <TermsSection
            id="introduction"
            title="1. Introduction"
            content={`
              <p>Welcome to JobPortal. These Terms of Service ("Terms") govern your access to and use of the JobPortal website, mobile applications, and services (collectively, the "Services").</p>
              
              <p>By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.</p>
              
              <p>Please read these Terms carefully, as they contain important information about your legal rights, remedies, and obligations. By using our Services, you are entering into a legal contract with JobPortal, Inc.</p>
            `}
          />

          <TermsSection
            id="definitions"
            title="2. Definitions"
            content={`
              <p>In these Terms, the following definitions apply:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li><strong>"JobPortal"</strong> (or "we," "our," or "us") refers to JobPortal, Inc., the company that operates the Services.</li>
                <li><strong>"User"</strong> (or "you" or "your") refers to any individual or entity that accesses or uses our Services.</li>
                <li><strong>"Job Seeker"</strong> refers to a User who uses our Services to search for and apply to jobs.</li>
                <li><strong>"Employer"</strong> refers to a User who uses our Services to post jobs and search for candidates.</li>
                <li><strong>"Content"</strong> refers to all text, data, information, software, graphics, photographs, videos, sounds, and other materials that are displayed, uploaded, or otherwise made available through our Services.</li>
                <li><strong>"User Content"</strong> refers to Content that Users provide to be made available through our Services, including job postings, resumes, profiles, and communications.</li>
              </ul>
            `}
          />

          <TermsSection
            id="account"
            title="3. Account Registration and Requirements"
            content={`
              <p><strong>3.1 Account Creation</strong></p>
              <p>To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself and to update such information as necessary to keep it accurate, current, and complete.</p>
              
              <p><strong>3.2 Account Security</strong></p>
              <p>You are responsible for safeguarding your account credentials and for any activity that occurs under your account. You agree to notify JobPortal immediately of any unauthorized use of your account or any other breach of security. JobPortal will not be liable for any losses caused by any unauthorized use of your account.</p>
              
              <p><strong>3.3 Age Requirements</strong></p>
              <p>You must be at least 16 years old to use our Services. If you are under 18, you represent that you have your parent or guardian's permission to use the Services and that they have read and agree to these Terms on your behalf.</p>
              
              <p><strong>3.4 One Account Per User</strong></p>
              <p>You may not create or maintain more than one account for the same purpose. JobPortal reserves the right to terminate duplicate accounts without notice.</p>
            `}
          />

          <TermsSection
            id="user-conduct"
            title="4. User Conduct and Responsibilities"
            content={`
              <p>When using our Services, you agree not to:</p>
              
              <ul class="list-disc pl-6 space-y-2 mt-2">
                <li>Violate any applicable law, regulation, or these Terms;</li>
                <li>Post or transmit any Content that is unlawful, fraudulent, harassing, abusive, defamatory, obscene, or otherwise objectionable;</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
                <li>Interfere with or disrupt the operation of the Services or servers or networks connected to the Services;</li>
                <li>Use any robot, spider, scraper, or other automated means to access the Services for any purpose without our express written permission;</li>
                <li>Bypass any measures we may use to prevent or restrict access to the Services;</li>
                <li>Collect or harvest any personally identifiable information from other Users without their express consent;</li>
                <li>Post or transmit any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," or any other form of solicitation;</li>
                <li>Post or transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment;</li>
                <li>Use the Services in any manner that could disable, overburden, damage, or impair the Services or interfere with any other party's use of the Services.</li>
              </ul>
            `}
          />

          <TermsSection
            id="content"
            title="5. Content and Intellectual Property"
            content={`
              <p><strong>5.1 User Content</strong></p>
              <p>You retain all ownership rights in the User Content you post to our Services. By posting User Content, you grant JobPortal a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such User Content in any and all media or distribution methods now known or later developed.</p>
              
              <p><strong>5.2 Content Responsibility</strong></p>
              <p>You are solely responsible for your User Content and the consequences of posting it. By posting User Content, you represent and warrant that:</p>
              <ul class="list-disc pl-6 space-y-1 mt-1">
                <li>You own or have the necessary rights to use and authorize JobPortal to use your User Content;</li>
                <li>Your User Content does not violate the rights of any third party, including copyright, trademark, privacy, or other personal or proprietary rights;</li>
                <li>Your User Content does not contain libelous or otherwise unlawful, abusive, or obscene material;</li>
                <li>Your User Content does not violate any applicable laws or regulations.</li>
              </ul>
              
              <p><strong>5.3 JobPortal Content</strong></p>
              <p>The Services contain Content owned or licensed by JobPortal ("JobPortal Content"). JobPortal Content is protected by copyright, trademark, patent, trade secret, and other laws, and JobPortal owns and retains all rights in the JobPortal Content and the Services. You may not remove, alter, or conceal any copyright, trademark, service mark, or other proprietary rights notices incorporated in or accompanying the JobPortal Content.</p>
              
              <p><strong>5.4 Content Monitoring</strong></p>
              <p>JobPortal has the right, but not the obligation, to monitor and edit all Content provided by Users. JobPortal reserves the right to remove any Content that violates these Terms or that we find objectionable for any reason, without prior notice.</p>
            `}
          />

          <TermsSection
            id="services"
            title="6. Services and Fees"
            content={`
              <p><strong>6.1 Service Description</strong></p>
              <p>JobPortal provides a platform that connects Job Seekers with Employers. Our Services include job posting, resume posting, job search, candidate search, and related features.</p>
              
              <p><strong>6.2 Free and Paid Services</strong></p>
              <p>Some of our Services are offered free of charge, while others require payment. JobPortal reserves the right to modify, terminate, or otherwise amend our offered Services and fee structure at any time.</p>
              
              <p><strong>6.3 Payment Terms</strong></p>
              <p>If you choose to use our paid Services, you agree to pay all applicable fees as they become due. All fees are non-refundable unless otherwise specified. You are responsible for providing accurate billing information and for keeping this information current.</p>
              
              <p><strong>6.4 Subscription Services</strong></p>
              <p>Some of our Services may be offered on a subscription basis. By signing up for a subscription, you authorize JobPortal to charge your payment method on a recurring basis until you cancel. You may cancel your subscription at any time by following the instructions in your account settings.</p>
            `}
          />

          <TermsSection
            id="termination"
            title="7. Termination"
            content={`
              <p><strong>7.1 Termination by You</strong></p>
              <p>You may terminate your account at any time by following the instructions in your account settings or by contacting us at support@jobportal.com.</p>
              
              <p><strong>7.2 Termination by JobPortal</strong></p>
              <p>JobPortal reserves the right to suspend or terminate your account and access to the Services at any time for any reason, including, but not limited to, your violation of these Terms. JobPortal may also terminate or suspend your access to the Services without prior notice if we believe that such action is necessary to protect the safety or interests of JobPortal, its Users, or third parties.</p>
              
              <p><strong>7.3 Effect of Termination</strong></p>
              <p>Upon termination of your account, your right to use the Services will immediately cease, and JobPortal may delete or remove any Content associated with your account. All provisions of these Terms that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
            `}
          />

          <TermsSection
            id="disclaimers"
            title="8. Disclaimers and Limitations of Liability"
            content={`
              <p><strong>8.1 Service Provided "As Is"</strong></p>
              <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. JOBPORTAL DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
              
              <p><strong>8.2 Third-Party Content</strong></p>
              <p>JOBPORTAL DOES NOT ENDORSE, WARRANT, OR GUARANTEE ANY THIRD-PARTY CONTENT OR SERVICES AVAILABLE THROUGH OUR SERVICES AND WILL NOT BE A PARTY TO OR IN ANY WAY RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.</p>
              
              <p><strong>8.3 Limitation of Liability</strong></p>
              <p>IN NO EVENT SHALL JOBPORTAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF OUR SERVICES, (III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (IV) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR SERVICES, (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY THIRD PARTY, AND/OR (VI) ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT JOBPORTAL IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              
              <p>THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION. YOU SPECIFICALLY ACKNOWLEDGE THAT JOBPORTAL SHALL NOT BE LIABLE FOR USER CONTENT OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE RISK OF HARM OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH YOU.</p>
            `}
          />

          <TermsSection
            id="indemnification"
            title="9. Indemnification"
            content={`
              <p>You agree to defend, indemnify, and hold harmless JobPortal, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Services; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your User Content caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Services.</p>
            `}
          />

          <TermsSection
            id="governing-law"
            title="10. Governing Law and Dispute Resolution"
            content={`
              <p><strong>10.1 Governing Law</strong></p>
              <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p>
              
              <p><strong>10.2 Dispute Resolution</strong></p>
              <p>Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in English and shall take place in Delaware. The judgment of the arbitrator may be entered in any court of competent jurisdiction.</p>
              
              <p><strong>10.3 Exceptions</strong></p>
              <p>Notwithstanding the foregoing, JobPortal may seek injunctive or other equitable relief to protect its intellectual property rights or confidential information in any court of competent jurisdiction.</p>
              
              <p><strong>10.4 Class Action Waiver</strong></p>
              <p>ANY ARBITRATION SHALL BE CONDUCTED ON AN INDIVIDUAL BASIS. YOU AND JOBPORTAL AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.</p>
            `}
          />

          <TermsSection
            id="changes"
            title="11. Changes to Terms"
            content={`
              <p>JobPortal reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              
              <p>By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.</p>
            `}
          />

          <TermsSection
            id="miscellaneous"
            title="12. Miscellaneous"
            content={`
              <p><strong>12.1 Entire Agreement</strong></p>
              <p>These Terms constitute the entire agreement between you and JobPortal regarding the use of the Services, superseding any prior agreements between you and JobPortal relating to your use of the Services.</p>
              
              <p><strong>12.2 Waiver and Severability</strong></p>
              <p>The failure of JobPortal to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.</p>
              
              <p><strong>12.3 Assignment</strong></p>
              <p>You may not assign or transfer these Terms, by operation of law or otherwise, without JobPortal's prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and of no effect. JobPortal may assign or transfer these Terms, at its sole discretion, without restriction.</p>
              
              <p><strong>12.4 Notices</strong></p>
              <p>Any notices or other communications provided by JobPortal under these Terms will be given by posting to the Services or by email to the email address you provide during registration.</p>
              
              <p><strong>12.5 Contact Information</strong></p>
              <p>If you have any questions about these Terms, please contact us at legal@jobportal.com.</p>
            `}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="outline" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cookies">Cookies Policy</Link>
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
