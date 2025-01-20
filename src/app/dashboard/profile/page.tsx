import { DeveloperProfileForm } from "@/components/Form/developer-profile-form";
import { ProfileCard } from "@/components/Form/profile-card";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Profile</h1>
      <ProfileCard />
      <DeveloperProfileForm />
    </div>
  );
}
