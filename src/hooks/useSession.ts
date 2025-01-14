import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();
  }, []);

  return session;
}
