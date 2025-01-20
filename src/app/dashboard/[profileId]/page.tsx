import { createClient } from "@/lib/supabase/supabaseServer";
import EmployeeProfile from "@/components/Profile/employee-profile";

export default async function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const supabase = createClient();
  const { profileId } = await params;
  const { data, error } = await (await supabase)
    .from("profiles")
    .select("*")
    .eq("auth_user_id", profileId)
    .single();

  if (error || !data) {
    return <div>Loading...</div>;
  }

  return <EmployeeProfile profile={data} />;
}
