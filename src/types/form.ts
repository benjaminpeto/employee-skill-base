export interface FormDefaultValues {
  auth_user_id: string;
  name: string;
  email: string;
  job_title: string;
  years_of_experience: number;
  tools: string;
  programming_languages: string;
  applications_services: string;
  spoken_languages: string;
  timezone: string;
  current_project: string | null;
  availability: "available" | "unavailable";
}

export const defaultValues: FormDefaultValues = {
  auth_user_id: "",
  name: "",
  email: "",
  job_title: "",
  years_of_experience: 0,
  tools: "",
  programming_languages: "",
  applications_services: "",
  spoken_languages: "",
  timezone: "",
  current_project: null,
  availability: "available",
};

export interface SanitizedFromValues {
  auth_user_id: string;
  name: string;
  email: string;
  job_title: string;
  years_of_experience: number;
  tools: string[];
  programming_languages: string[];
  applications_services: string[];
  spoken_languages: string[];
  timezone: string;
  current_project: string | null;
  availability: "available" | "unavailable";
}
