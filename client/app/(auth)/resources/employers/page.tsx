import { Users, FileText, BarChart, Calendar, CheckCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaqItem } from "@/components/faq-item"
import { DownloadCard } from "@/components/download-card"
import ResourceCard from "@/components/resource-card"
import { CaseStudyCard } from "@/components/case-study-card"
import { WebinarCard } from "@/components/webinar-card"

export default function EmployerResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources For Employers</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive tools and guides to help you attract, hire, and retain top talent.
          </p>
        </div>

        <Tabs defaultValue="hiring" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="hiring">Hiring</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="hiring" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Job Description Templates"
                description="Craft compelling job descriptions that attract qualified candidates."
                link="/resources/employers/job-descriptions"
              />
              <ResourceCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Interview Question Bank"
                description="Curated questions to assess candidates' skills and cultural fit."
                link="/resources/employers/interview-questions"
              />
              <ResourceCard
                icon={<BarChart className="h-8 w-8 text-primary" />}
                title="Recruitment Metrics Guide"
                description="Key metrics to track and optimize your hiring process."
                link="/resources/employers/recruitment-metrics"
              />
              <ResourceCard
                icon={<Calendar className="h-8 w-8 text-primary" />}
                title="Hiring Timeline Planner"
                description="Plan your recruitment process from posting to onboarding."
                link="/resources/employers/hiring-timeline"
              />
            </div>
          </TabsContent>

          <TabsContent value="onboarding" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                icon={<CheckCircle className="h-8 w-8 text-primary" />}
                title="Onboarding Checklist"
                description="Comprehensive checklist to ensure a smooth onboarding experience."
                link="/resources/employers/onboarding-checklist"
              />
              <ResourceCard
                icon={<Calendar className="h-8 w-8 text-primary" />}
                title="First 90 Days Plan"
                description="Structure the crucial first 90 days for new employee success."
                link="/resources/employers/first-90-days"
              />
              <ResourceCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="New Hire Integration"
                description="Strategies to integrate new employees into your team culture."
                link="/resources/employers/new-hire-integration"
              />
              <ResourceCard
                icon={<BarChart className="h-8 w-8 text-primary" />}
                title="Onboarding ROI Calculator"
                description="Measure the effectiveness and ROI of your onboarding process."
                link="/resources/employers/onboarding-roi"
              />
            </div>
          </TabsContent>

          <TabsContent value="retention" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Employee Engagement"
                description="Strategies to boost engagement and reduce turnover."
                link="/resources/employers/employee-engagement"
              />
              <ResourceCard
                icon={<BarChart className="h-8 w-8 text-primary" />}
                title="Retention Analytics"
                description="Track and analyze key retention metrics and warning signs."
                link="/resources/employers/retention-analytics"
              />
              <ResourceCard
                icon={<BookOpen className="h-8 w-8 text-primary" />}
                title="Career Development Programs"
                description="Create growth opportunities that keep employees motivated."
                link="/resources/employers/career-development"
              />
              <ResourceCard
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Exit Interview Guide"
                description="Extract valuable insights from departing employees."
                link="/resources/employers/exit-interviews"
              />
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Hiring Compliance Guide"
                description="Stay compliant with employment laws during the hiring process."
                link="/resources/employers/hiring-compliance"
              />
              <ResourceCard
                icon={<CheckCircle className="h-8 w-8 text-primary" />}
                title="Workplace Policies"
                description="Essential workplace policies to protect your business and employees."
                link="/resources/employers/workplace-policies"
              />
              <ResourceCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Diversity & Inclusion"
                description="Build a diverse and inclusive workplace culture."
                link="/resources/employers/diversity-inclusion"
              />
              <ResourceCard
                icon={<Calendar className="h-8 w-8 text-primary" />}
                title="Compliance Calendar"
                description="Key dates and deadlines for employment law compliance."
                link="/resources/employers/compliance-calendar"
              />
            </div>
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Templates & Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DownloadCard
              title="Job Description Template"
              description="Customizable template for creating effective job descriptions."
              fileType="DOCX"
              fileSize="225 KB"
            />
            <DownloadCard
              title="Interview Scorecard"
              description="Standardized evaluation form for candidate interviews."
              fileType="XLSX"
              fileSize="180 KB"
            />
            <DownloadCard
              title="Onboarding Checklist"
              description="Comprehensive checklist for new employee onboarding."
              fileType="PDF"
              fileSize="320 KB"
            />
            <DownloadCard
              title="Performance Review Template"
              description="Structured template for employee performance evaluations."
              fileType="DOCX"
              fileSize="275 KB"
            />
            <DownloadCard
              title="Employee Handbook Template"
              description="Customizable employee handbook covering key policies."
              fileType="DOCX"
              fileSize="450 KB"
            />
            <DownloadCard
              title="Recruitment Budget Planner"
              description="Spreadsheet to plan and track recruitment expenses."
              fileType="XLSX"
              fileSize="210 KB"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyCard
              title="How Company X Reduced Time-to-Hire by 45%"
              industry="Technology"
              result="45% faster hiring"
            />
            <CaseStudyCard
              title="Improving Employee Retention Through Onboarding"
              industry="Healthcare"
              result="32% higher retention"
            />
            <CaseStudyCard
              title="Building a Diverse Engineering Team"
              industry="Software"
              result="2x diversity increase"
            />
            <CaseStudyCard
              title="Scaling Recruitment for Rapid Growth"
              industry="E-commerce"
              result="100+ hires in 3 months"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem
              question="What are the most effective channels for recruiting top talent?"
              answer="The most effective recruiting channels vary by industry and role. For technical positions, specialized job boards, GitHub, and referrals often yield the best results. For executive roles, LinkedIn and executive search firms are typically more effective. Always track your source of hire metrics to determine which channels work best for your specific needs."
            />
            <FaqItem
              question="How can we improve our candidate experience?"
              answer="Improve candidate experience by maintaining clear communication throughout the process, providing timely feedback, keeping the application process simple, preparing interviewers properly, respecting candidates' time, and gathering feedback through surveys. A positive candidate experience improves your employer brand and increases offer acceptance rates."
            />
            <FaqItem
              question="What metrics should we track to measure recruitment effectiveness?"
              answer="Key recruitment metrics include time-to-fill, cost-per-hire, quality of hire, source of hire, offer acceptance rate, candidate experience scores, and hiring manager satisfaction. These metrics help identify bottlenecks in your recruitment process and areas for improvement."
            />
            <FaqItem
              question="How can we reduce employee turnover?"
              answer="Reduce turnover by hiring for cultural fit, providing competitive compensation, offering growth opportunities, recognizing achievements, fostering work-life balance, conducting stay interviews, and creating a positive work environment. Regular engagement surveys can help identify issues before they lead to resignations."
            />
          </div>
        </section>

        <section className="bg-muted p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Upcoming Webinars</h2>
            <p className="text-muted-foreground">
              Join our free webinars to learn from industry experts and improve your hiring strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <WebinarCard title="Building a Magnetic Employer Brand" date="May 15, 2023" time="2:00 PM EST" />
            <WebinarCard title="AI in Recruitment: Opportunities and Pitfalls" date="May 22, 2023" time="1:00 PM EST" />
          </div>
        </section>
      </div>
    </div>
  )
}


