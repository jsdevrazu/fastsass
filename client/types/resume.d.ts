interface ResumePreview {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: null;
  website?: null;
  education?: (EducationEntityResumePreview)[] | null;
  experience?: (ExperienceEntityResumePreview)[] | null;
  skills?: (string)[] | null;
  summary?:string
}
interface EducationEntityResumePreview {
  degree: string;
  institution: string;
  year: string;
}
interface ExperienceEntityResumePreview {
  job_title: string;
  company: string;
  duration: string;
  description?: string | null;
}
