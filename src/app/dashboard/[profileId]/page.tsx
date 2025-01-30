import { createClient } from "@/lib/supabase/supabaseServer";
import EmployeeProfile from "@/components/Profile/employee-profile";
import { Suspense } from "react";
import EmployeeProfileSkeleton from "@/components/Profile/employee-profile-skeleton";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const supabase = await createClient();
  const { profileId } = await params;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", profileId)
    .single();

  if (error || !data) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<EmployeeProfileSkeleton />}>
      <EmployeeProfile profile={data} />
    </Suspense>
  );
}
