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

export const getApplicationsServices = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("applications_services");

  if (error) {
    console.error("Error fetching applications/services data", error);
    return [];
  }

  const sanitizeService = (service: string) => {
    return service
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const serviceCounts = data.reduce(
    (acc: { [key: string]: number }, profile) => {
      const services = profile.applications_services;
      if (services) {
        services.forEach((service: string) => {
          const sanitizedService = sanitizeService(service);
          acc[sanitizedService] = (acc[sanitizedService] || 0) + 1;
        });
      }
      return acc;
    },
    {}
  );

  return Object.entries(serviceCounts).map(([service, count]) => ({
    label: service,
    value: count,
  }));
};

export const getTools = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("tools");

  if (error) {
    console.error("Error fetching tools data", error);
    return [];
  }

  const sanitizeTool = (tool: string) => {
    return tool
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const toolCounts = data.reduce((acc: { [key: string]: number }, profile) => {
    const tools = profile.tools;
    if (tools) {
      tools.forEach((tool: string) => {
        const sanitizedTool = sanitizeTool(tool);
        acc[sanitizedTool] = (acc[sanitizedTool] || 0) + 1;
      });
    }
    return acc;
  }, {});

  return Object.entries(toolCounts).map(([tool, count]) => ({
    label: tool,
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

export const getJobTitles = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("job_title");

  if (error) {
    console.error("Error fetching job titles data", error);
    return [];
  }

  const sanitizeTitle = (title: string) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const titleCounts = data.reduce((acc: { [key: string]: number }, profile) => {
    const title = profile.job_title;
    if (title) {
      const sanitizedTitle = sanitizeTitle(title);
      acc[sanitizedTitle] = (acc[sanitizedTitle] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(titleCounts).map(([title, count]) => ({
    label: title,
    value: count,
  }));
};
