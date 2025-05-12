interface ResumePreviewProps {
  applicantName: string
}

export function ResumePreview({ applicantName }: ResumePreviewProps) {
  return (
    <div className="border p-6 rounded-md bg-background">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{applicantName}</h2>
          <p className="text-muted-foreground">Senior Software Developer</p>
          <p className="text-sm text-muted-foreground">San Francisco, CA • john.smith@example.com • (555) 123-4567</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h3>
          <p className="text-sm">
            Experienced software developer with 5+ years of expertise in building modern web applications. Proficient in
            React, TypeScript, and Node.js with a strong focus on creating performant and accessible user interfaces.
            Passionate about clean code and user-centered design.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h3>

          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">Senior Developer</h4>
              <span className="text-sm text-muted-foreground">Jan 2020 - Present</span>
            </div>
            <p className="text-sm font-medium">TechCorp, San Francisco, CA</p>
            <ul className="list-disc text-sm ml-5 mt-1 space-y-1">
              <li>Led the development of a React-based dashboard that improved user engagement by 40%</li>
              <li>Implemented TypeScript across the codebase, reducing bugs by 25%</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Optimized application performance, reducing load times by 30%</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium">Frontend Developer</h4>
              <span className="text-sm text-muted-foreground">Mar 2017 - Dec 2019</span>
            </div>
            <p className="text-sm font-medium">WebSolutions Inc., San Jose, CA</p>
            <ul className="list-disc text-sm ml-5 mt-1 space-y-1">
              <li>Developed responsive web applications using React and Redux</li>
              <li>Collaborated with designers to implement pixel-perfect UIs</li>
              <li>Built reusable component libraries that improved development efficiency</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Education</h3>
          <div className="flex justify-between items-baseline">
            <h4 className="font-medium">B.S. Computer Science</h4>
            <span className="text-sm text-muted-foreground">2015 - 2019</span>
          </div>
          <p className="text-sm">University of California, Berkeley</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-muted px-2 py-1 rounded">React</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">TypeScript</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">JavaScript</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">Node.js</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">GraphQL</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">REST APIs</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">HTML/CSS</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">Tailwind CSS</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">Git</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">AWS</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">Docker</span>
            <span className="text-sm bg-muted px-2 py-1 rounded">Jest</span>
          </div>
        </div>
      </div>
    </div>
  )
}
