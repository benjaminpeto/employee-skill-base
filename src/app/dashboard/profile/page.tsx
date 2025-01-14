import { DeveloperProfileForm } from "@/components/developer-profile-form";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Profile</h1>
      <DeveloperProfileForm />
    </div>
  );
}
