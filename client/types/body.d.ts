interface Payload {
  skills: string[];
  title: string;
  body: string;
  min_salary: number;
  max_salary: number;
  location: string;
  job_type: string;
  apply_settings: string;
  questions?: {
    value: string;
  }[];
}

interface ReviewPayload {
  id: string;
  title: string;
  review: string;
  rating: number;
  employe_status: string;
  props: string[];
  cons: string[];
  is_recommend: boolean;
}


interface ApplyFormPayload {
  id: string,
  data: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    location: string
    resume: string
    cover_letter: string
  }
}

interface ResetPasswordPayload {
  otp: string
  new_password: string
}

interface NotificationPayload {
  notification_feature: {
    application_update: boolean
    interview_invitation: boolean
    job_alert: boolean
    job_alert_frequency: string
    job_recomandation: boolean
    marketing_communication: boolean
    recomandation_frequency: string
  }
}