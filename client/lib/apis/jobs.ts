import api from "@/lib/axios";
import ApiStrings from "@/lib/api_strings";

export const get_all_jobs = async ({
  page = 1,
  limit = 10,
  title,
  location,
  job_type,
  min_salary,
  max_salary,
}: QueryParamsGetJob): Promise<JobsResponse> => {

  const params: Record<string, any> = {
    page,
    limit,
  };

  if (title) params.title = title;
  if (location) params.location = location;
  if (job_type) params.job_type = job_type;
  if (min_salary) params.min_salary = min_salary;
  if (max_salary) params.max_salary = max_salary;

  const response = await api.get<JobsResponse>(ApiStrings.GET_JOBS, { params });
  return response.data;
};

export const get_applications = async ({
  page = 1,
  limit = 10
}) => {
  const response = await api.get<ApplicationResponse>(ApiStrings.GET_APPLICATIONS, { params: { page, limit } });
  return response.data;
}

export const get_recet_applications = async ({
  page = 1,
  limit = 10
}) => {
  const response = await api.get<ApplicationResponse>(ApiStrings.RECENT_APPLIED, { params: { page, limit } });
  return response.data;
}

export const get_recomanded_jobs = async ({
  page = 1,
  limit = 10
}) => {
  const response = await api.get<RecommedJobsResponse>(ApiStrings.RECOMANDED_JOBS, { params: { page, limit } });
  return response.data;
}

export const get_seeker_dashboard_stats = async () => {
  const response = await api.get<StatsResponse>(ApiStrings.STATS);
  return response.data;
}

export const generate_cover_letter = async (payload:GeneratePayload) => {
  const response = await api.post<CoverLetterResponse>(ApiStrings.COVER_LETTER, payload);
  return response.data;
}

export const get_saved_jobs = async () => {
  const response = await api.get<SavedJobResponse>(ApiStrings.SAVED_JOBS);
  return response.data;
}

export const get_single_job = async (id: string) => {
  const response = await api.get<SingleJobsResponse>(ApiStrings.SINGLE_JOB(id));
  return response.data;
}
export const get_job_applications = async (id:string): Promise<JobApplicationResponse> => {
  const response = await api.get<JobApplicationResponse>(ApiStrings.GET_JOB_APPLICATION(id));
  return response.data;
}

export const apply_job = async (payload: ApplyFormPayload) => {
  const response = await api.post(ApiStrings.APPLY_JOB(payload.id), payload.data);
  return response.data;
}
export const update_application_status = async (payload: {id:string, application_status: string}) => {
  const response = await api.post(ApiStrings.UPDATE_APPLICATION_STATUS(payload.id), { application_status: payload.application_status});
  return response.data;
}

export const post_job = async (payload: Payload) => {
  const response = await api.post<SavedJobResponse>(ApiStrings.POST_JOB, payload);
  return response.data;
}

export const review_post = async (payload: ReviewPayload) => {
  const response = await api.post(ApiStrings.REVIEW(payload.id), payload);
  return response.data;
}

export const get_employer_stats = async (): Promise<EmployerStats> => {
  const response = await api.get<EmployerStats>(ApiStrings.EMPLOYER_STATS);
  return response.data;
}
export const delete_job = async (id:string) => {
  const response = await api.delete(ApiStrings.DELETE(id));
  return response.data;
}
export const save_bookmark = async (id:string) => {
  const response = await api.post(ApiStrings.BOOKMARK(id));
  return response.data;
}

export const recent_application = async ({
  page = 1,
  limit = 10,
  days = 10
}): Promise<RecentApplication> => {
  const response = await api.get<RecentApplication>(ApiStrings.EMPLOYER_APPLICATION, { params: { page, limit, days}});
  return response.data;
}

export const employer_active_jobs = async ({
  page = 1,
  limit = 10
}): Promise<ActiveJobs> => {
  const response = await api.get<ActiveJobs>(ApiStrings.ACTIVE_JOBS, { params: { page, limit } });
  return response.data;
}

export const get_companies = async ({
  page = 1,
  limit = 10,
  title = '',
  industry = '',
  location = ''
}): Promise<CompanyResponse> => {

  const params: Record<string, any> = {
    page,
    limit,
  };

  if (title) params.title = title;
  if (location) params.location = location;
  if (industry) params.industry = industry;

  const response = await api.get<CompanyResponse>(ApiStrings.GET_COMPANIES, { params });
  return response.data;
}

export const get_my_jobs = async ({
  page = 1,
  limit = 10,
}): Promise<MyJobsResponse> => {

  const params: Record<string, any> = {
    page,
    limit,
  };

  const response = await api.get<MyJobsResponse>(ApiStrings.MY_JOB, { params });
  return response.data;
}

export const get_candidates = async ({
  page = 1,
  limit = 10,
}): Promise<CandidatesResponse> => {

  const params: Record<string, any> = {
    page,
    limit,
  };

  const response = await api.get<CandidatesResponse>(ApiStrings.CANDIDATES, { params });
  return response.data;
}

export const get_applications_based_on_job = async ({
  page = 1,
  limit = 10,
  id = ''
}): Promise<JobResponseApplications> => {

  const params: Record<string, any> = {
    page,
    limit,
  };

  const response = await api.get<JobResponseApplications>(ApiStrings.GET_JOB_APPLICATIONS(id), { params });
  return response.data;
}

