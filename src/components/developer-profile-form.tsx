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

const formSchema = z.object({
  auth_user_id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  job_title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  years_of_experience: z.number().int().positive(),
  tools: z.array(z.string()).min(1, {
    message: "Please select at least one tool.",
  }),
  programming_languages: z.array(z.string()).min(1, {
    message: "Please select at least one programming language.",
  }),
  applications_services: z.array(z.string()).min(1, {
    message: "Please select at least one application or service.",
  }),
  spoken_languages: z.array(z.string()).min(1, {
    message: "Please select at least one spoken language.",
  }),
  timezone: z.string(),
  current_project: z.string().nullable(),
  availability: z.enum(["available", "unavailable", "limited"]),
});

export function DeveloperProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      auth_user_id: "", // This should be populated with the actual user ID
      name: "",
      job_title: "",
      email: "",
      years_of_experience: 0,
      tools: [],
      programming_languages: [],
      applications_services: [],
      spoken_languages: [],
      timezone: "",
      current_project: null,
      availability: "unavailable",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission here
    console.log(values);
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
                  <Input placeholder="John Doe" {...field} />
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
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
            render={() => (
              <FormItem>
                <FormLabel>Tools</FormLabel>
                <FormControl>
                  <Textarea
                    value={form.watch("tools").join(", ")}
                    onChange={(e) =>
                      form.setValue(
                        "tools",
                        e.target.value.split(",").map((tool) => tool.trim())
                      )
                    }
                  />
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
            render={() => (
              <FormItem>
                <FormLabel>Programming Languages</FormLabel>
                <FormControl>
                  <Textarea
                    value={form.watch("programming_languages").join(", ")}
                    onChange={(e) =>
                      form.setValue(
                        "programming_languages",
                        e.target.value.split(",").map((lang) => lang.trim())
                      )
                    }
                  />
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
            render={() => (
              <FormItem>
                <FormLabel>Applications/Services</FormLabel>
                <FormControl>
                  <Textarea
                    value={form.watch("applications_services").join(", ")}
                    onChange={(e) =>
                      form.setValue(
                        "applications_services",
                        e.target.value
                          .split(",")
                          .map((service) => service.trim())
                      )
                    }
                  />
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
            render={() => (
              <FormItem>
                <FormLabel>Spoken Languages</FormLabel>
                <FormControl>
                  <Textarea
                    value={form.watch("spoken_languages").join(", ")}
                    onChange={(e) =>
                      form.setValue(
                        "spoken_languages",
                        e.target.value.split(",").map((lang) => lang.trim())
                      )
                    }
                  />
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
                    <SelectItem value="limited">
                      Limited Availability
                    </SelectItem>
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
