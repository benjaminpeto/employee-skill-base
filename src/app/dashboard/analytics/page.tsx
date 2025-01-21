// import { createClient } from "@/lib/supabase/supabaseServer";

export default async function AnalyticsPage() {
  //   const supabase = createClient();
  //   const { data, error } = await (await supabase)
  //     .from("profiles")
  //     .select("*")
  //     .single();

  //   if (error || !data) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Insights</h1>
    </div>
  );
}
