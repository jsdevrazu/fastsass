import { Briefcase, FileText, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceCard from "@/components/resource-card"
import { DownloadCard } from "@/components/download-card"
import { ToolCard } from "@/components/tool-card"
import { VideoCard } from "@/components/video-card"
import { FaqItem } from "@/components/faq-item"


export default function JobSeekerResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources For Job Seekers</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Everything you need to succeed in your job search and career development journey.
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                icon={<FileText className="h-8 w-8 text-primary" />}
                title="Resume Writing Guide"
                description="Learn how to create a standout resume that gets you noticed by employers."
                link="/resources/job-seekers/resume-guide"
              />
              <ResourceCard
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                title="Interview Preparation"
                description="Comprehensive guide to ace your job interviews with confidence."
                link="/resources/job-seekers/interview-prep"
              />
              <ResourceCard
                icon={<BookOpen className="h-8 w-8 text-primary" />}
                title="Career Development"
                description="Strategies for long-term career growth and professional development."
                link="/resources/job-seekers/career-development"
              />
              <ResourceCard
                icon={<Award className="h-8 w-8 text-primary" />}
                title="Skill Assessment"
                description="Identify your strengths and areas for improvement to stand out in the job market."
                link="/resources/job-seekers/skill-assessment"
              />
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DownloadCard
                title="Professional Resume Template"
                description="ATS-friendly resume template for professionals across industries."
                fileType="DOCX"
                fileSize="245 KB"
              />
              <DownloadCard
                title="Cover Letter Template"
                description="Customizable cover letter template that highlights your qualifications."
                fileType="DOCX"
                fileSize="180 KB"
              />
              <DownloadCard
                title="Interview Thank You Email"
                description="Template for following up after interviews to leave a great impression."
                fileType="PDF"
                fileSize="120 KB"
              />
              <DownloadCard
                title="Job Search Tracker"
                description="Spreadsheet to organize your job applications and follow-ups."
                fileType="XLSX"
                fileSize="350 KB"
              />
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ToolCard
                title="Resume Analyzer"
                description="Get instant feedback on your resume and suggestions for improvement."
              />
              <ToolCard
                title="Salary Calculator"
                description="Compare salaries by job title, location, and experience level."
              />
              <ToolCard
                title="Interview Simulator"
                description="Practice common interview questions with AI-powered feedback."
              />
              <ToolCard
                title="Skills Assessment"
                description="Evaluate your technical and soft skills with industry benchmarks."
              />
              <ToolCard
                title="Career Path Explorer"
                description="Discover potential career paths based on your skills and interests."
              />
              <ToolCard title="Job Fit Analyzer" description="Check how well your profile matches job requirements." />
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VideoCard
                title="Resume Writing Masterclass"
                duration="45:22"
                thumbnail="/placeholder.svg?height=200&width=350"
              />
              <VideoCard
                title="Ace Your Job Interview"
                duration="38:15"
                thumbnail="/placeholder.svg?height=200&width=350"
              />
              <VideoCard
                title="Negotiating Your Salary"
                duration="27:40"
                thumbnail="/placeholder.svg?height=200&width=350"
              />
              <VideoCard
                title="LinkedIn Profile Optimization"
                duration="32:18"
                thumbnail="/placeholder.svg?height=200&width=350"
              />
            </div>
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem
              question="How do I know if my resume is ATS-friendly?"
              answer="ATS-friendly resumes use standard formatting, relevant keywords from the job description, and avoid graphics, tables, and unusual fonts. Our Resume Analyzer tool can help check your resume's ATS compatibility."
            />
            <FaqItem
              question="What should I do if I don't hear back after an interview?"
              answer="If you haven't heard back within a week after your interview, it's appropriate to send a polite follow-up email. Express your continued interest in the position and ask about the timeline for their decision."
            />
            <FaqItem
              question="How can I explain gaps in my employment history?"
              answer="Be honest about employment gaps while focusing on any productive activities during that time, such as freelancing, volunteering, or learning new skills. Frame the gap as a period of growth rather than a liability."
            />
            <FaqItem
              question="Should I apply for jobs if I don't meet all the requirements?"
              answer="Yes, you should apply if you meet about 70-80% of the key requirements. Job descriptions often list ideal qualifications, and employers may consider candidates who demonstrate potential and a willingness to learn."
            />
          </div>
        </section>

        <section className="bg-muted p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest career tips and job search strategies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}