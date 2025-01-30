import SignInButton from "@/components/SignInButton";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInButton />
    </Suspense>
  );
}
