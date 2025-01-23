import Link from "next/link";
import CompetencySheet from "./competency-sheet";
import { FormFieldsProps } from "@/schemas/formSchema";
import { FormFieldWrapper } from "./form-field-wrapper";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldNames } from "@/types/form";

export const FormFields: React.FC<FormFieldsProps> = ({ form }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
    <FormFieldWrapper
      name={FormFieldNames.NAME}
      label="Name"
      placeholder="John Doe"
      form={form}
      disabled
    />
    <FormFieldWrapper
      name={FormFieldNames.EMAIL}
      label="Email"
      placeholder="john@example.com"
      type="email"
      form={form}
      disabled
    />
    <FormFieldWrapper
      name={FormFieldNames.JOB_TITLE}
      label="Job Title"
      placeholder="Senior Developer"
      description="Enter your current job title. This helps in identifying your role and responsibilities."
      form={form}
    />
    <FormFieldWrapper
      name={FormFieldNames.YEARS_OF_EXPERIENCE}
      label="Years of Experience"
      type="number"
      form={form}
      description="Specify the number of years you have been working in the industry. This gives an idea of your experience level."
      onChange={(e) =>
        form.setValue("years_of_experience", parseInt(e.target.value, 10))
      }
    />
    <FormFieldWrapper
      name={FormFieldNames.TOOLS}
      label="Tools"
      component={Textarea}
      form={form}
      description="List the tools you are proficient in, separated by commas. This helps in highlighting your technical skills. For example: React, Laravel, Docker, NextJS, etc."
    />
    <FormFieldWrapper
      name={FormFieldNames.PROGRAMMING_LANGUAGES}
      label="Programming Languages"
      component={Textarea}
      form={form}
      description="List programming languages you are proficient in, separated by commas. This helps in highlighting your technical skills. For example: JavaScript, Python, Ruby, etc."
    />
    <FormFieldWrapper
      name={FormFieldNames.APPLICATIONS_SERVICES}
      label="Applications/Services"
      component={Textarea}
      form={form}
      description="Mention the applications or services you are familiar with. This can include cloud services, software, and other tools you use in your work, separated by commas. For example: AWS, Azure, Google Cloud, etc."
    />
    <FormFieldWrapper
      name={FormFieldNames.SPOKEN_LANGUAGES}
      label="Spoken Languages"
      component={Textarea}
      form={form}
      description="List the languages you speak, separated by commas. This can be useful for roles that require multilingual communication."
    />
    <FormField
      control={form.control}
      name={FormFieldNames.TIMEZONE}
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
    <FormFieldWrapper
      name={FormFieldNames.CURRENT_PROJECT}
      label="Current Project"
      placeholder="Project Name (optional)"
      form={form}
    />
    <FormField
      control={form.control}
      name={FormFieldNames.AVAILABILITY}
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
    <FormFieldWrapper
      name={FormFieldNames.LINKEDIN_URL}
      label="LinkedIn URL"
      placeholder="https://www.linkedin.com/in/your-profile"
      form={form}
    />
    <FormFieldWrapper
      name={FormFieldNames.EXPERIENCE_LEVEL}
      label="Experience Level"
      type="number"
      form={form}
      description={
        <>
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
        </>
      }
      onChange={(e) =>
        form.setValue("experience_level", parseInt(e.target.value, 10))
      }
    />
    <FormFieldWrapper
      name={FormFieldNames.BIO}
      label="Bio"
      component={Textarea}
      form={form}
      description="Write a brief bio about yourself, including your interests and background."
    />
    <FormFieldWrapper
      name={FormFieldNames.PROFESSIONAL_EXPERIENCE}
      label="Professional Experience"
      component={Textarea}
      form={form}
      description="List your previous job roles and the duration you worked in each role. For example: Senior Developer at Company X from 2018 to 2020, Software Engineer at Company Y from 2016 to 2018, etc."
    />
    <FormFieldWrapper
      name={FormFieldNames.QUALIFICATIONS}
      label="Education and professional qualifications"
      component={Textarea}
      form={form}
      description="List your education and professional qualifications such as certification, diploma, degree, online courses, etc."
    />
    <FormFieldWrapper
      name={FormFieldNames.MAIN_ACHIEVEMENTS}
      label="Main Achievements"
      component={Textarea}
      form={form}
      description="List your main achievements, such as projects you've worked on, awards you've won, etc."
    />
    <FormField
      control={form.control}
      name={FormFieldNames.CORE_COMPETENCIES}
      render={({ field }) => (
        <FormItem>
          <CompetencySheet />
          <FormControl>
            <Textarea {...field} value={field.value ?? ""} />
          </FormControl>
          <FormDescription>
            List your top three core competencies.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
