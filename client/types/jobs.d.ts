interface JobsResponse {
  message: string;
  jobs?: (JobsEntity)[] | null;
  total: number;
  page: number;
  limit: number;
}
interface SingleJobsResponse {
  message: string;
  job: JobsEntity;
}
interface RecommedJobsResponse {
  message: string;
  recommended_jobs: JobsEntity[];
  total: number;
  page: number;
  limit: number;
}
interface JobsEntity {
  _id: string;
  job_id: string;
  title: string;
  body: string;
  experience_level: string;
  min_salary: number;
  max_salary: number;
  location: string;
  job_type: string;
  skills: string[];
  questions: string[];
  apply_settings: string;
  slug: string;
  created_at: string;
  company_name: string;
  updated_at: string;
  post_by: string;
  job_view?: number | null;
  company: Company
  application_dead_line: string
  application_email: string
  application_link: string
  isBookmarked: boolean
}


interface ApplicationResponse {
  message: string;
  page: number;
  total: number;
  limit: number;
  applications?: (ApplicationsEntity)[] | null;
}
interface JobApplicationResponse {
  message: string;
  applicants?: SingleApplicant;
}
interface SingleApplicant {
  cover_letter: string;
  experience: string;
  summary: string;
  application_status: string;
  _id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  first_name: string;
  avatar: string;
  last_name: string;
  email: string;
  resume: string;
  location: string;
  education: Education;
  user_experience?: (Experience)[] | null;
  github_profile: string;
  linkedin_profile: string;
  website: string;
  phone_number: string;
  job_skills?: (string)[] | null;
  applied_at: string;
  match_percentage: number
  resume_summary: string
}

interface Experience {
  id: str
  title: str
  company_name: str
  start_date: str
  end_date: str
  currently_work: bool
  job_description: str
}
interface Education {
  degree_name: string;
  start_date: string;
  end_date: string;
  institution: string;
}


interface ApplicationsEntity {
  _id: string;
  company_name: string
  application_status: string;
  job: {
    title: string;
    location: string;
    slug: string;
    created_at: string;
  }
  job_id: string
}


interface StatsResponse {
  message: string;
  application: number;
  interviewed: number;
  save_jobs: number;
  profile_views: number;
}

interface CoverLetterResponse{
  cover_letter: string
}


interface SavedJobResponse {
  message: string;
  page: number;
  limit: number;
  total: number;
  jobs?: (SavedJobsEntity)[] | null;
}
interface SavedJobsEntity {
  saved_jobs: SavedJobs;
  _id: string;
  user_id: string;
}
interface SavedJobs {
  title: string;
  body: string;
  location: string;
  job_type: string;
  slug: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  _id: string;
}


interface EmployerStats {
  active_jobs: 1,
  total_application: 1,
  interviewed: 0,
  jobs_view: 0
}

interface RecentApplication {
  applicants?: (ApplicantsEntity)[] | null;
  message: string;
  page: number;
  limit: number;
  total: number;
}
interface ApplicantsEntity {
  _id: string;
  user_id: string;
  job_id: string;
  first_name: string;
  last_name: string;
  created_at: string;
  avatar: string;
  job_title: string;
  match_percentage: number;
  application_status: string;
  applicant_email: string;
  resume: string;
}


interface ActiveJobs {
  jobs?: (ActiveJobsEntity)[] | null;
}
interface ActiveJobsEntity {
  _id: string;
  title: string;
  location: string;
  job_type: string;
  slug: string;
  created_at: string;
  total_applications: number;
  application_dead_line: string
}


interface CompanyResponse {
  message: string;
  page: number;
  limit: number;
  total: number;
  companies?: (CompaniesEntity)[] | null;
}
interface CompaniesEntity {
  name: string;
  company_description: string;
  company_size: string;
  headquatar_location: string;
  logo: string;
  industry: string;
  rating: number;
  jobs_open: number;
  _id: string;
}

interface SingleCompanyResponse {
  message: string;
  company: Company;
}


interface MyJobsResponse {
  message: string;
  jobs?: (MyJobs)[] | null;
}
interface MyJobs {
  title: string;
  job_type: string;
  status: string;
  slug: string;
  created_at: string;
  updated_at: string;
  application_dead_line: string;
  posted_by_user: PostedByUser;
  _id: string;
  total_applications: number
}
interface PostedByUser {
  name: string;
  logo: string;
  _id: string;
}


interface CandidatesResponse {
  message: string;
  total: number;
  applicants?: (Candidates)[] | null;
}
interface Candidates {
  cover_letter: string;
  experience: string;
  _id: string;
  job_id: string;
  job_title: string;
  first_name: string;
  avatar: string;
  last_name: string;
  email: string;
  resume: string;
  location: string;
  application_status: string;
  applied_at: string;
  skills: string[]
}

interface UsersResponse {
  users?: (UsersEntity)[] | null;
  total: number
}
interface UsersEntity {
  id: string;
  avatar: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  invite_message: string;
}


 interface JobResponseApplications {
  message: string;
  title: string;
  total:number;
  applications?: (JobApplicationsEntity)[] | null;
}
 interface JobApplicationsEntity {
  created_at: string;
  application_status: string;
  _id: string;
  job_id: string;
  user_id: string;
  title: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
  job_skills?: (string)[] | null;
  user_skills?: (JobUserSkillsEntity)[] | null;
  resume: string;
  match_percentage: number;
}
 interface JobUserSkillsEntity {
  id: string;
  name: string;
  level: string;
}
