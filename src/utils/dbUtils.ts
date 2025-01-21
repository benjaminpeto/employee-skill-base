import { createClient } from "@/lib/supabase/supabaseClient";

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
    label: project,
    value: count,
  }));
};

export const getSpokenLanguages = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("spoken_languages");

  if (error) {
    console.error("Error fetching spoken languages data", error);
    return [];
  }

  const sanitizeLanguage = (language: string) => {
    return language
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const languageCounts = data.reduce(
    (acc: { [key: string]: number }, profile) => {
      const languages = profile.spoken_languages;
      if (languages) {
        languages.forEach((language: string) => {
          const sanitizedLanguage = sanitizeLanguage(language);
          acc[sanitizedLanguage] = (acc[sanitizedLanguage] || 0) + 1;
        });
      }
      return acc;
    },
    {}
  );

  return Object.entries(languageCounts).map(([language, count]) => ({
    label: language,
    value: count,
  }));
};

export const getProgrammingLanguages = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("programming_languages");

  if (error) {
    console.error("Error fetching programming languages data", error);
    return [];
  }

  const sanitizeLanguage = (language: string) => {
    return language
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const languageCounts = data.reduce(
    (acc: { [key: string]: number }, profile) => {
      const languages = profile.programming_languages;
      if (languages) {
        languages.forEach((language: string) => {
          const sanitizedLanguage = sanitizeLanguage(language);
          acc[sanitizedLanguage] = (acc[sanitizedLanguage] || 0) + 1;
        });
      }
      return acc;
    },
    {}
  );

  return Object.entries(languageCounts).map(([language, count]) => ({
    label: language,
    value: count,
  }));
};
