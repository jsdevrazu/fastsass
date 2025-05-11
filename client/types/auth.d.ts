interface LoginResponse {
  message: string;
  user: User;
  access_token: string;
  refresh_token: string;
}

interface CurrentUserResponse {
  message: string;
  user: User;
}
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  auth_provider: string;
  avatar: string;
  role: string;
  is_verified: boolean;
  refresh_token: string;
  skills?: (SkillsEntity)[] | null;
  certifications?: (CertificationsEntity)[] | null;
  experience?: (ExperienceEntity)[] | null;
  github_profile: string;
  head_line_title: string;
  linkedin_profile: string;
  location: string;
  phone_number: string;
  resume: string;
  summary: string;
  website: string;
  education: Education
  comapny: Company
  notification_feature: Notification,
  privacy_feature: {
    profile_visibility: boolean;
    contact_information: boolean;
    current_employer: boolean;
    activity_feed: boolean;
  }
  prefer_settings:{
    job_type: string;
    work_location: string;
    salary_range: string;
    experience_level: string;
    preferred_industry: string;
}
  feature: {
    max_job_post: number
    current_plan_name: string
    price: string
    subscription_id: string
    next_billing_date: string
    used_job: number
    is_active: boolean
  }
}

interface Notification {
  job_recomandation: boolean;
  application_update: boolean;
  interview_invitation: boolean;
  job_alert: boolean;
  marketing_communication: boolean;
  job_alert_frequency: string;
  recomandation_frequency: string;
}

interface SkillsEntity {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  id: string
}

interface Company {
  name: string;
  logo: string;
  comapnies_calture: ComapniesCalture;
  company_description: string;
  company_size: string;
  headquatar_location: string;
  industry: string;
  website: string;
  social_media: SocialMedia;
  founded: string;
  _id: string;
  rating: number;
  active_jobs: JobsEntity[] | [];
  ratings: Reviews[]
  contact: {
    email: string
    phone: string
  }
}


interface Reviews {
  rating: number,
  employe_status: string,
  title: string,
  review: string,
  cons: string[]
  props: string[]
  is_recommend: boolean
  date: string
  write_by?: string
  id: string

}
interface ComapniesCalture {
  mission_statement: string;
  core_value: string;
  benefit: string;
}
interface SocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  contact_email: string;
  phone_number: string;
}

interface Education {
  degree_name: string,
  start_date: string,
  end_date: string,
  institution: string
}
interface CertificationsEntity {
  name: string;
  org_name: string;
  issue_date: string;
  expiry_date: string;
  url: string;
  id: string;

}
interface ExperienceEntity {
  id: string;
  title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  currently_work: boolean;
  job_description: string;
}
