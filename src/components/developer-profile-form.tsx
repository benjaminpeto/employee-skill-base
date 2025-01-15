"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/useSession";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
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

export function DeveloperProfileForm() {
  const session = useSession();
  const supabase = createClient();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      availability: "unavailable",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session && isMounted) {
      const fetchProfile = async () => {
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

      fetchProfile();
    }
  }, [session, form, supabase, isMounted]);

  if (!isMounted) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert availability to boolean
    const availabilityBoolean = values.availability === "available";

    // Sanitize input fields
    const sanitizedValues = {
      ...values,
      tools: values.tools
        .split(",")
        .map((tool) => tool.trim())
        .filter((tool) => tool),
      programming_languages: values.programming_languages
        .split(",")
        .map((lang) => lang.trim())
        .filter((lang) => lang),
      applications_services: values.applications_services
        .split(",")
        .map((service) => service.trim())
        .filter((service) => service),
      spoken_languages: values.spoken_languages
        .split(",")
        .map((lang) => lang.trim())
        .filter((lang) => lang),
    };

    const { data } = await supabase
      .from("profiles")
      .select("auth_user_id")
      .eq("auth_user_id", sanitizedValues.auth_user_id)
      .single();

    if (data) {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...sanitizedValues,
          availability: availabilityBoolean,
        })
        .eq("auth_user_id", sanitizedValues.auth_user_id);

      if (error) {
        toast({
          title: "Error",
          description: "There was an error updating the profile.",
          variant: "destructive",
        });
        console.error("Error updating data:", error);
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        });
        console.log("Data updated successfully");
      }
    } else {
      const { error } = await supabase.from("profiles").insert([
        {
          ...sanitizedValues,
          availability: availabilityBoolean,
        },
      ]);

      if (error) {
        toast({
          title: "Error",
          description: "There was an error submitting the form.",
          variant: "destructive",
        });
        console.error("Error inserting data:", error);
      } else {
        toast({
          title: "Success",
          description: "Profile created successfully.",
        });
        console.log("Data inserted successfully");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="years_of_experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tools</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Enter the tools you use, separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="programming_languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programming Languages</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Enter the programming languages you know, separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applications_services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applications/Services</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Enter the applications or services you&apos;re familiar with,
                  separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spoken_languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spoken Languages</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Enter the languages you speak, separated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input placeholder="UTC+1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Project</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Name (optional)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
