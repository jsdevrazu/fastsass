import React from 'react'
interface ResumePreviewProps {
  user: SingleApplicant | undefined
}

export function ResumePreview({ user }: ResumePreviewProps) {

  const resume_preview = JSON.parse(user?.resume_summary?.replace(/```json|```/g, '').trim() ?? '') as ResumePreview | null


  return (
    <div className="border p-6 rounded-md bg-background">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{resume_preview?.full_name}</h2>
          <p className="text-muted-foreground">{user?.job_title}</p>
          <p className="text-sm text-muted-foreground">{resume_preview?.location} • {resume_preview?.email} • {resume_preview?.phone}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h3>
          <p className="text-sm">
            {resume_preview?.summary}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h3>

          {
            resume_preview?.experience?.length !== 0 ? <div className="mb-4">
              {
                resume_preview?.experience?.map((exprience) => (
                  <div key={exprience.job_title}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium">{exprience?.job_title}</h4>
                      <span className="text-sm text-muted-foreground">{exprience?.duration}</span>
                    </div>
                    <p className="text-sm font-medium">TechCorp, San Francisco, CA</p>
                    <ul className="list-disc text-sm ml-5 mt-1 space-y-1">
                      <li>Led the development of a React-based dashboard that improved user engagement by 40%</li>
                      <li>Implemented TypeScript across the codebase, reducing bugs by 25%</li>
                      <li>Mentored junior developers and conducted code reviews</li>
                      <li>Optimized application performance, reducing load times by 30%</li>
                    </ul>
                  </div>
                ))
              }
            </div> : <p>No user experience added yet</p>
          }
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
          {
            resume_preview?.education?.length !== 0 ? <>
              {
                resume_preview?.education?.map((education) => (
                  <React.Fragment key={education?.degree}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium">{education?.degree}</h4>
                      <span className="text-sm text-muted-foreground">{education?.year}</span>
                    </div>
                    <p className="text-sm">{education?.institution}</p>
                  </React.Fragment>
                ))
              }
            </> : <p>No education added yet</p>
          }
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume_preview?.skills?.length === 0 ? <p>No skills found in resume</p> : resume_preview?.skills?.map((skill) => (
              <span key={skill} className="text-sm bg-muted px-2 py-1 rounded">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
