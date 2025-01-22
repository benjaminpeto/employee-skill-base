import { createClient } from "@/lib/supabase/supabaseClient";
import { ProfileForAnalytics } from "@/types/charts";

const fetchDataAndSanitize = async (
  column: keyof ProfileForAnalytics,
  sanitizeFn: (value: string) => string
) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select(column);

  if (error) {
    console.error(`Error fetching ${column} data`, error);
    return [];
  }

  const counts = data.reduce((acc: { [key: string]: number }, profile) => {
    const values = (profile as ProfileForAnalytics)[column];
    if (Array.isArray(values)) {
      values.forEach((value) => {
        const sanitizedValue = sanitizeFn(value);
        acc[sanitizedValue] = (acc[sanitizedValue] || 0) + 1;
      });
    } else if (typeof values === "string") {
      const sanitizedValue = sanitizeFn(values);
      acc[sanitizedValue] = (acc[sanitizedValue] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(counts).map(([label, value]) => ({
    label,
    value,
  }));
};

const sanitizeString = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getEmployeeCounts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("availability");

  if (error) {
    console.error("Error fetching employee data", error);
    return { available: 0, unavailable: 0 };
  }

  const available = data.filter((profile) => profile.availability).length;
  const unavailable = data.length - available;

  return { available, unavailable };
};

export const getProjectAssignments = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("current_project");

  if (error) {
    console.error("Error fetching project assignments data", error);
    return [];
  }

  const projectCounts = data.reduce(
    (acc: { [key: string]: number }, profile) => {
      const project = profile.current_project;
      if (project) {
        acc[project] = (acc[project] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return Object.entries(projectCounts).map(([project, count]) => ({
    label: project.charAt(0).toUpperCase() + project.slice(1),
    value: count,
  }));
};

export const getYearsOfExperience = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("years_of_experience");

  if (error) {
    console.error("Error fetching years of experience data", error);
    return [];
  }

  const experienceRanges = [
    { label: "0-3", min: 0, max: 3 },
    { label: "4-6", min: 4, max: 6 },
    { label: "7-9", min: 7, max: 9 },
    { label: "10-12", min: 10, max: 12 },
    { label: "13-15", min: 13, max: 15 },
    { label: ">15", min: 16, max: Infinity },
  ];

  const experienceCounts = data.reduce(
    (acc: { [key: string]: number }, profile) => {
      const experience = profile.years_of_experience;
      if (experience !== undefined) {
        const range = experienceRanges.find(
          (range) => experience >= range.min && experience <= range.max
        );
        if (range) {
          acc[range.label] = (acc[range.label] || 0) + 1;
        }
      }
      return acc;
    },
    {}
  );

  return experienceRanges
    .map((range) => ({
      label: range.label,
      value: experienceCounts[range.label] || 0,
    }))
    .filter((range) => range.value > 0);
};

export const getSpokenLanguages = async () => {
  return fetchDataAndSanitize("spoken_languages", sanitizeString);
};

export const getProgrammingLanguages = async () => {
  return fetchDataAndSanitize("programming_languages", sanitizeString);
};

export const getApplicationsServices = async () => {
  return fetchDataAndSanitize("applications_services", sanitizeString);
};

export const getTools = async () => {
  return fetchDataAndSanitize("tools", sanitizeString);
};

export const getJobTitles = async () => {
  return fetchDataAndSanitize("job_title", sanitizeString);
};
