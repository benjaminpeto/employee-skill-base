"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSession } from "@/hooks/useSession";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { defaultValues } from "@/types/form";
import { formSchema } from "@/schemas/formSchema";
import { useProfileOperations } from "@/hooks/useProfileOperations";
import { FormFields } from "./form-fields";
import { LoaderCircle, Save } from "lucide-react";

export function DeveloperProfileForm() {
  const session = useSession();
  const supabase = createClient();
  const { toast } = useToast();
  const { handleProfileSubmission } = useProfileOperations(supabase, toast);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    shouldUnregister: false,
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsDirty(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
        const formData: z.infer<typeof formSchema> = {
          auth_user_id: data.auth_user_id,
          name: data.name || session.user.user_metadata.full_name,
          email: data.email || session.user.email,
          job_title: data.job_title || "",
          years_of_experience: data.years_of_experience || 0,
          tools: data.tools?.join(", ") || "",
          programming_languages: data.programming_languages?.join(", ") || "",
          applications_services: data.applications_services?.join(", ") || "",
          spoken_languages: data.spoken_languages?.join(", ") || "",
          timezone: data.timezone || "",
          current_project: data.current_project || "",
          availability: data.availability ? "available" : "unavailable",
        };

        form.reset(formData, {
          keepDefaultValues: true,
        });
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session, form, supabase]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    await handleProfileSubmission(values);
    setIsSaving(false);
    form.reset(values);
    setIsDirty(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} />
        <Button type="submit" disabled={!isDirty || isSaving}>
          {isSaving ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
