
const ApiStrings = {
  // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    CHANGE_PASSWORD: "/auth/change-password",
    SET_PASSWORD: "/auth/set-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    COMPANY_PROFILE: "/auth/company-profile",
    // Jobs
    GET_JOBS: "/job/jobs",
    GET_APPLICATIONS: "/job/get-apply-jobs",
    RECENT_APPLIED: "/job/recent-applied",
    RECOMANDED_JOBS: "/job/recommended",
    STATS: "/job/stats",
    SAVED_JOBS: "/job/saved-jobs",
    POST_JOB: "/job/post",
    EMPLOYER_STATS: "/job/employer/stats",
    EMPLOYER_APPLICATION: "/job/employer/recent-applicants",
    ACTIVE_JOBS: "/job/employer/active-jobs",
    GET_COMPANIES: "/job/companies",
    MY_JOB: "/job/my-jobs",
    CANDIDATES: "/job/candidates",
    APPLICATIONS_EXPORT: "/job/applications/export",
    JOBS_EXPORT: "/job/my-jobs/export",
    SINGLE_JOB: (id:string) => `/job/${id}/detail`,
    APPLY_JOB: (id:string) => `/job/apply/${id}`,
    REVIEW: (id:string) => `/job/review/${id}`,
    DELETE: (id:string) => `/job/delete/${id}`,
    BOOKMARK: (id:string) => `/job/save/${id}`,
    GET_JOB_APPLICATION: (id:string) => `/job/job-apps/${id}`,
    // Payment
    CREATE_PAYMENT_URL: '/pay/subcribe',
    BILLING_PORTAL: '/pay/billing-portal',
    PAYMENT_DETAILS: '/pay/details',
    // Notification
    UPDATE_NOTIFICATION: '/notification/update'
  };
  
  export default ApiStrings;