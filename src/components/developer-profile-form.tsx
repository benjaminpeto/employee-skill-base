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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/useSession";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { defaultValues } from "@/types/form";
import { formSchema } from "@/schemas/formSchema";
import { useProfileOperations } from "@/hooks/useProfileOperations";

export function DeveloperProfileForm() {
  const session = useSession();
  const supabase = createClient();
  const { toast } = useToast();
  const { handleProfileSubmission } = useProfileOperations(supabase, toast);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
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
    await handleProfileSubmission(values);
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>North America</SelectLabel>
                      <SelectItem value="est">
                        Eastern Standard Time (EST)
                      </SelectItem>
                      <SelectItem value="cst">
                        Central Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="mst">
                        Mountain Standard Time (MST)
                      </SelectItem>
                      <SelectItem value="pst">
                        Pacific Standard Time (PST)
                      </SelectItem>
                      <SelectItem value="akst">
                        Alaska Standard Time (AKST)
                      </SelectItem>
                      <SelectItem value="hst">
                        Hawaii Standard Time (HST)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Europe & Africa</SelectLabel>
                      <SelectItem value="gmt">
                        Greenwich Mean Time (GMT)
                      </SelectItem>
                      <SelectItem value="cet">
                        Central European Time (CET)
                      </SelectItem>
                      <SelectItem value="eet">
                        Eastern European Time (EET)
                      </SelectItem>
                      <SelectItem value="west">
                        Western European Summer Time (WEST)
                      </SelectItem>
                      <SelectItem value="cat">
                        Central Africa Time (CAT)
                      </SelectItem>
                      <SelectItem value="eat">
                        East Africa Time (EAT)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Asia</SelectLabel>
                      <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                      <SelectItem value="ist">
                        India Standard Time (IST)
                      </SelectItem>
                      <SelectItem value="cst_china">
                        China Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="jst">
                        Japan Standard Time (JST)
                      </SelectItem>
                      <SelectItem value="kst">
                        Korea Standard Time (KST)
                      </SelectItem>
                      <SelectItem value="ist_indonesia">
                        Indonesia Central Standard Time (WITA)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Australia & Pacific</SelectLabel>
                      <SelectItem value="awst">
                        Australian Western Standard Time (AWST)
                      </SelectItem>
                      <SelectItem value="acst">
                        Australian Central Standard Time (ACST)
                      </SelectItem>
                      <SelectItem value="aest">
                        Australian Eastern Standard Time (AEST)
                      </SelectItem>
                      <SelectItem value="nzst">
                        New Zealand Standard Time (NZST)
                      </SelectItem>
                      <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>South America</SelectLabel>
                      <SelectItem value="art">Argentina Time (ART)</SelectItem>
                      <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                      <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                      <SelectItem value="clt">
                        Chile Standard Time (CLT)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <FormDescription>
                  Only enter your current project if you&apos;re working on one.
                </FormDescription>
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
                <Select onValueChange={field.onChange} value={field.value}>
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
