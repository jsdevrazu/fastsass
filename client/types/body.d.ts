interface Payload {
  skills: string[];
  title: string;
  meta_description: string;
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

interface ReviewPayload{
    id: string;
    title: string;
    review: string;
    rating: number;
    employe_status: string;
    props: string[];
    cons: string[];
    is_recommend: boolean;
}


interface ApplyFormPayload{
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