export interface Profile {
  avatar_url: string;
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
  current_project: string;
  availability: boolean;
  linkedin_url: string | null;
  experience_level: number;
  bio: string | null;
  professional_experience: string | null;
  qualifications: string | null;
  main_achievements: string | null;
  core_competencies: string | null;
}

export interface UserInfo {
  name: string;
  email: string;
  avatarUrl: string;
}
