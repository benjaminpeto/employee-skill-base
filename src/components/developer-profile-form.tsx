"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSession } from "@/hooks/useSession";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { defaultValues } from "@/types/form";
import { formSchema } from "@/schemas/formSchema";
import { useProfileOperations } from "@/hooks/useProfileOperations";
import { FormFields } from "./form-fields";

export function DeveloperProfileForm() {
  const session = useSession();
  const supabase = createClient();
  const { toast } = useToast();
  const { handleProfileSubmission } = useProfileOperations(supabase, toast);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) {
        console.error("Session is null");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        form.reset({
          auth_user_id: data.auth_user_id,
          name: data.name || session.user.user_metadata.full_name,
          email: data.email || session.user.email,
          job_title: data.job_title,
          years_of_experience: data.years_of_experience,
          tools: data.tools.join(", "),
          programming_languages: data.programming_languages.join(", "),
          applications_services: data.applications_services.join(", "),
          spoken_languages: data.spoken_languages.join(", "),
          timezone: data.timezone,
          current_project: data.current_project,
          availability: data.availability ? "available" : "unavailable",
        });
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session, form, supabase]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleProfileSubmission(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
