import { JSX } from "react";
import { UseFormReturn } from "react-hook-form";

export interface FormDefaultValues {
  avatar_url: string;
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
  linkedin_url: string | null;
  experience_level: number | null;
  bio: string | null;
  professional_experience: string | null;
  qualifications: string | null;
  main_achievements: string | null;
  core_competencies: string | null;
}

export const defaultValues: FormDefaultValues = {
  avatar_url: "",
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
  linkedin_url: null,
  experience_level: 0,
  bio: null,
  professional_experience: null,
  qualifications: null,
  main_achievements: null,
  core_competencies: null,
};

export interface SanitizedFromValues {
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
  current_project: string | null;
  availability: "available" | "unavailable";
  linkedin_url: string | null;
  experience_level: number | null;
  bio: string | null;
  professional_experience: string | null;
  qualifications: string | null;
  main_achievements: string | null;
  core_competencies: string | null;
}

export enum FormFieldNames {
  NAME = "name",
  EMAIL = "email",
  AVATAR_URL = "avatar_url",
  AUTH_USER_ID = "auth_user_id",
  JOB_TITLE = "job_title",
  YEARS_OF_EXPERIENCE = "years_of_experience",
  TOOLS = "tools",
  PROGRAMMING_LANGUAGES = "programming_languages",
  APPLICATIONS_SERVICES = "applications_services",
  SPOKEN_LANGUAGES = "spoken_languages",
  TIMEZONE = "timezone",
  CURRENT_PROJECT = "current_project",
  AVAILABILITY = "availability",
  LINKEDIN_URL = "linkedin_url",
  EXPERIENCE_LEVEL = "experience_level",
  BIO = "bio",
  PROFESSIONAL_EXPERIENCE = "professional_experience",
  QUALIFICATIONS = "qualifications",
  MAIN_ACHIEVEMENTS = "main_achievements",
  CORE_COMPETENCIES = "core_competencies",
}

export interface FormFieldWrapperProps {
  name: FormFieldNames;
  label: string;
  placeholder?: string;
  description?: string | JSX.Element;
  type?: string;
  component?: React.ElementType;
  disabled?: boolean;
  form: UseFormReturn<FormDefaultValues>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
