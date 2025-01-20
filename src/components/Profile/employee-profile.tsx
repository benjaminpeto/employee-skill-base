import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/types/profile";
import { getCountryEmoji } from "@/utils/getCountryEmoji";

interface EmployeeProfileProps {
  profile: Profile;
}

export default function EmployeeProfile({ profile }: EmployeeProfileProps) {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              className="rounded-full"
              src={profile.avatar_url}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <h2 className="text-md text-gray-300 font-mono">
              {profile.job_title || "Unknown position"}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.years_of_experience && (
              <div>
                <h3 className="text-lg font-semibold">Years of Experience</h3>
                <p>{profile.years_of_experience}</p>
              </div>
            )}
            {profile.tools && profile.tools.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.tools.map((tool) => (
                    <Badge className="capitalize" key={tool}>
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {profile.programming_languages &&
              profile.programming_languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">
                    Programming Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.programming_languages.map((lang) => (
                      <Badge className="capitalize" key={lang}>
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            {profile.applications_services &&
              profile.applications_services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">
                    Applications & Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.applications_services.map((service) => (
                      <Badge className="capitalize" key={service}>
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            {profile.spoken_languages &&
              profile.spoken_languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">Spoken Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.spoken_languages.map((language) => (
                      <span
                        key={language}
                        className="inline-block px-3 py-1 rounded-full text-xs text-gray-900 bg-gray-300/80 border border-gray-900"
                      >
                        {getCountryEmoji(language)}{" "}
                        {language
                          .trim()
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            {profile.timezone && (
              <div>
                <h3 className="text-lg font-semibold">Timezone</h3>
                <p className="uppercase">{profile.timezone}</p>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">Current Project</h3>
              <p>{profile.current_project || "No project assigned."}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Availability</h3>
              <p>{profile.availability ? "Available" : "Not Available"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
