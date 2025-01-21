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
