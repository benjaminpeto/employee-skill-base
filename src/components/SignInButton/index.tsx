"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function SignInButton() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/v1/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      toast({
        title: "Please try again.",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button
        size="lg"
        type="button"
        variant="outline"
        onClick={signInWithGoogle}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-6" />
        )}{" "}
        Sign in with Google
      </Button>
    </div>
  );
}
