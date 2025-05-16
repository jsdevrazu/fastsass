import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusVariant(status: string) {
  switch (status) {
    case "Reviewed":
      return "default";
    case "Pending":
      return "outline";
    case "Interviewed":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
}

export function parseDuration(duration: string | undefined): {
  start: string;
  end: string;
  currently_work: boolean;
} {
  if (!duration) {
    return {
      start: '',
      end: '',
      currently_work: false,
    };
  }

  const normalized = duration.replace(/–|—|−/g, "-");

  const parts = normalized.split("-").map((s) => s.trim());

  const start = parts[0] ?? "";
  const end = parts[1] ?? "";
  const currently_work = /present|current/i.test(end);

  return { start, end, currently_work };
}


export const mapResumeExperienceToEntity = (
  exp: ExperienceEntityResumePreview
): ExperienceEntity => {
    const { start, end, currently_work } = parseDuration(exp.duration);


  return {
    id: nanoid(),
    title: exp.job_title,
    company_name: exp.company,
    start_date: start,
    end_date: end,
    currently_work: currently_work,
    job_description: Array.isArray(exp.description)
      ? exp.description.join("\n")
      : exp.description ?? "",
  };
};

export const mapResumeSkillsToEntity = (name: string): SkillsEntity => {

  return {
    id: nanoid(),
    name,
    level: 'beginner'
  };
};

export const mapResumeEducationToEntity = (education: EducationEntityResumePreview | undefined | null): Education => {

  return {
    degree_name: education?.degree ?? '',
    institution: education?.institution ?? '',
    start_date: '',
    end_date: ''
  };
};
