import { SanitizedFromValues, FormDefaultValues } from "@/types/form";
import { ToastProps } from "@/types/toast";
import { SupabaseClient } from "@supabase/supabase-js";

export function useProfileOperations(
  supabase: SupabaseClient,
  toast: (props: ToastProps) => void
) {
  async function showToast(
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) {
    toast({
      title,
      description,
      variant,
    });
  }

  async function updateProfile(
    sanitizedValues: SanitizedFromValues,
    availabilityBoolean: boolean
  ) {
    const { data } = await supabase
      .from("profiles")
      .update({
        ...sanitizedValues,
        availability: availabilityBoolean,
        avatar_url: sanitizedValues.avatar_url,
      })
      .eq("auth_user_id", sanitizedValues.auth_user_id);

    return data;
  }

  async function insertProfile(
    sanitizedValues: SanitizedFromValues,
    availabilityBoolean: boolean
  ) {
    const { data } = await supabase.from("profiles").insert([
      {
        ...sanitizedValues,
        availability: availabilityBoolean,
        avatar_url: sanitizedValues.avatar_url,
      },
    ]);

    return data;
  }

  function sanitizeValues(values: FormDefaultValues): SanitizedFromValues {
    return {
      ...values,
      tools: values.tools
        .split(",")
        .map((tool: string) => tool.trim())
        .filter((tool: string) => tool),
      programming_languages: values.programming_languages
        .split(",")
        .map((lang: string) => lang.trim())
        .filter((lang: string) => lang),
      applications_services: values.applications_services
        .split(",")
        .map((service: string) => service.trim())
        .filter((service: string) => service),
      spoken_languages: values.spoken_languages
        .split(",")
        .map((lang: string) => lang.trim())
        .filter((lang: string) => lang),
      avatar_url: values.avatar_url,
    };
  }

  async function handleProfileSubmission(values: FormDefaultValues) {
    const availabilityBoolean = values.availability === "available";
    const sanitizedValues = sanitizeValues(values);

    const { data } = await supabase
      .from("profiles")
      .select("auth_user_id")
      .eq("auth_user_id", sanitizedValues.auth_user_id)
      .single();

    let error;
    if (data) {
      error = await updateProfile(sanitizedValues, availabilityBoolean);
    } else {
      error = await insertProfile(sanitizedValues, availabilityBoolean);
    }

    if (error) {
      showToast(
        "Error",
        "There was an error submitting the form.",
        "destructive"
      );
      console.error("Error:", error);
    } else {
      showToast(
        "Success",
        data ? "Profile updated successfully." : "Profile created successfully."
      );
      console.log("Data processed successfully");
    }
  }

  return {
    showToast,
    updateProfile,
    insertProfile,
    sanitizeValues,
    handleProfileSubmission,
  };
}
