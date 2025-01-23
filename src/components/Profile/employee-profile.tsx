"use client";

import { useRef } from "react";
import { Profile } from "@/types/profile";
import { getCountryEmoji } from "@/utils/getCountryEmoji";
import { useExportPDF } from "@/hooks/useExportPDF";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";

interface EmployeeProfileProps {
  profile: Profile;
}

export default function EmployeeProfile({ profile }: EmployeeProfileProps) {
  const profileRef = useRef<HTMLDivElement>(null);
  const { exportPDF } = useExportPDF();

  const handleExportPDF = () => {
    exportPDF(profileRef.current, profile.name);
  };

  return (
    <div className="p-4">
      <Card ref={profileRef}>
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
            {profile.linkedin_url && (
              <Link
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 inline-block text-gray-500 hover:text-gray-200 duration-300" />
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.tools && profile.tools.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">Tools</h3>
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
                  <h3 className="text-gray-500 text-lg font-semibold">
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
                  <h3 className="text-gray-500 text-lg font-semibold">
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
                  <h3 className="text-gray-500 text-lg font-semibold">
                    Spoken Languages
                  </h3>
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
            {profile.years_of_experience && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Years of Experience
                </h3>
                <p>{profile.years_of_experience}</p>
              </div>
            )}
            {profile.experience_level && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Experience Level
                </h3>
                <p>{profile.experience_level}</p>
              </div>
            )}
            <div>
              <h3 className="text-gray-500 text-lg font-semibold">
                Current Project
              </h3>
              <p>{profile.current_project || "No project assigned."}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-lg font-semibold">
                Availability
              </h3>
              <p>{profile.availability ? "Available" : "Not Available"}</p>
            </div>
            {profile.bio && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">Bio</h3>
                <p>{profile.bio}</p>
              </div>
            )}
            {profile.professional_experience && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Professional Experience
                </h3>
                <p>{profile.professional_experience}</p>
              </div>
            )}
            {profile.qualifications && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Qualifications
                </h3>
                <p>{profile.qualifications}</p>
              </div>
            )}
            {profile.main_achievements && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Main Achievements
                </h3>
                <p>{profile.main_achievements}</p>
              </div>
            )}
            {profile.core_competencies && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Core Competencies
                </h3>
                <p>{profile.core_competencies}</p>
              </div>
            )}
            {profile.timezone && (
              <div>
                <h3 className="text-gray-500 text-lg font-semibold">
                  Timezone
                </h3>
                <p className="uppercase">{profile.timezone}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleExportPDF} className="mt-4">
        Export as PDF
      </Button>
    </div>
  );
}
