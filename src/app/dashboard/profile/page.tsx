import { DeveloperProfileForm } from "@/components/Form/developer-profile-form";
import { ProfileCard } from "@/components/Form/profile-card";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-2">Developer Profile</h1>
          <p className="text-gray-400 text-md">
            When filling out the form, it is important to provide accurate and
            detailed information to ensure that your profile is comprehensive
            and up-to-date. This helps in showcasing your skills, experience,
            and qualifications effectively. By providing detailed and accurate
            information in each section, you can create a strong and
            comprehensive profile that effectively showcases your skills and
            experience.
          </p>
        </div>
        <ProfileCard />
      </div>
      <Separator className="mb-4" />
      <DeveloperProfileForm />
    </div>
  );
}
