import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  avatar_url: z.string().url(),
  auth_user_id: z.string().uuid(),
  name: z.string(),
  job_title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  email: z.string().email(),
  years_of_experience: z.number().int().positive(),
  tools: z.string().min(1, {
    message: "Please select at least one tool.",
  }),
  programming_languages: z.string().min(1, {
    message: "Please select at least one programming language.",
  }),
  applications_services: z.string().min(1, {
    message: "Please select at least one application or service.",
  }),
  spoken_languages: z.string().min(1, {
    message: "Please select at least one spoken language.",
  }),
  timezone: z.string(),
  current_project: z.string().nullable(),
  availability: z.enum(["available", "unavailable"]),
});

export interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}
