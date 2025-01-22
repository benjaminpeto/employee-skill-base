import {
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
import { FormFieldsProps } from "@/schemas/formSchema";
import Link from "next/link";

export const FormFields: React.FC<FormFieldsProps> = ({ form }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
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
          <FormDescription>
            Enter your current job title. This helps in identifying your role
            and responsibilities.
          </FormDescription>
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
              onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
            />
          </FormControl>
          <FormDescription>
            Specify the number of years you have been working in the industry.
            This gives an idea of your experience level.
          </FormDescription>
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
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List the tools you are proficient in, separated by commas. This
            helps in highlighting your technical skills.<br></br>For example:
            React, Laravel, Docker, NextJS, etc.
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
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List programming languages you are proficient in, separated by
            commas. This helps in highlighting your technical skills.
            <br></br>For example: JavaScript, Python, Ruby, etc.
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
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            Mention the applications or services you are familiar with. This can
            include cloud services, software, and other tools you use in your
            work, separated by commas.<br></br>For example: AWS, Azure, Google
            Cloud, etc.
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
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List the languages you speak, separated by commas. This can be
            useful for roles that require multilingual communication.
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
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              form.trigger(field.name);
              setTimeout(
                () =>
                  form.setValue(
                    field.name,
                    value as "available" | "unavailable",
                    {
                      shouldDirty: true,
                      shouldTouch: true,
                    }
                  ),
                0
              );
            }}
            value={field.value || ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">
                  Alaska Standard Time (AKST)
                </SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe & Africa</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="west">
                  Western European Summer Time (WEST)
                </SelectItem>
                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="cst_china">
                  China Standard Time (CST)
                </SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
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
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>
            Select your timezone. This is important for coordinating work across
            different regions.
          </FormDescription>
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
            If you are currently working on a project, mention its name. If not,
            you can leave this field blank.
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
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              form.trigger(field.name);
              setTimeout(
                () =>
                  form.setValue(
                    field.name,
                    value as "available" | "unavailable",
                    {
                      shouldDirty: true,
                      shouldTouch: true,
                    }
                  ),
                0
              );
            }}
            value={field.value || ""}
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
          <FormDescription>
            Indicate whether you are available for new projects or not.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="linkedin_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn URL</FormLabel>
          <FormControl>
            <Input
              placeholder="https://www.linkedin.com/in/your-profile"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormDescription>
            Provide a link to your LinkedIn profile. This allows others to view
            your professional network and endorsements.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="experience_level"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Experience Level</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...field}
              value={field.value ?? 0}
              onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
            />
          </FormControl>
          <FormDescription>
            Enter your experience level, ranging from 8 to 14. Refer to the{" "}
            <Link
              href="https://secretsourceweb.github.io/professional-ladder/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              professional ladder{" "}
            </Link>
            for guidance.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            Write a brief bio about yourself, including your interests and
            background.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="professional_experience"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Professional Experience</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List your previous job roles and the duration you worked in each
            role.<br></br>For example: Senior Developer at Company X from 2018
            to 2020, Software Engineer at Company Y from 2016 to 2018, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="qualifications"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Education and professional qualifications</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List your education and professional qualifications such as
            certification, diploma, degree, online courses, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="main_achievements"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Main Achievements</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List your main achievements, such as projects you&apos;ve worked on,
            awards you&apos;ve won, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="core_competencies"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Core Competencies</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List your top three core competencies, referring to the{" "}
            <Link
              href="https://docs.google.com/document/d/1ooBkerty1ZBvRdK2ij7ETCY-JKwP0PCefPko78RqYMc/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              provided document
            </Link>{" "}
            for guidance.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
