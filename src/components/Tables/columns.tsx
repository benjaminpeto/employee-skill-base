import { ColumnDef } from "@tanstack/react-table";
import { Profile } from "@/types/profile";
import { getCountryEmoji } from "../../utils/getCountryEmoji";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "avatar_url",
    header: "Avatar",
    enableSorting: false,
    cell: ({ row }) => (
      <Avatar className="h-8 w-8 rounded-full">
        <AvatarImage
          className="h-8 w-8 rounded-full"
          src={row.original.avatar_url}
          alt={row.original.name}
        />
        <AvatarFallback className="rounded-full bg-slate-700 h-8 w-8 flex items-center justify-center">
          {row.original.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-bold">{row.original.name}</span>,
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.job_title}</span>
    ),
  },
  {
    accessorKey: "experience_level",
    header: "Experience Level",
    cell: ({ row }) => (
      <span className="flex justify-center font-bold">
        {row.original.experience_level}
      </span>
    ),
  },
  {
    accessorKey: "years_of_experience",
    header: "Years of Experience",
    cell: ({ row }) => (
      <span className="flex justify-center">
        {row.original.years_of_experience}
      </span>
    ),
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "tools",
    header: "Tools",
    cell: ({ row }) =>
      row.original.tools
        .map((tool) => tool.charAt(0).toUpperCase() + tool.slice(1))
        .join(", "),
    filterFn: "arrIncludes",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "programming_languages",
    header: "Programming Languages",
    cell: ({ row }) =>
      row.original.programming_languages
        .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
        .join(", "),
    filterFn: "arrIncludes",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "applications_services",
    header: "Applications/Services",
    cell: ({ row }) =>
      row.original.applications_services
        .map((app) => app.charAt(0).toUpperCase() + app.slice(1))
        .join(", "),
    filterFn: "arrIncludes",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "spoken_languages",
    header: "Spoken Languages",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 w-[120px]">
        {row.original.spoken_languages.map((language) => (
          <span
            key={language}
            className="inline-block px-3 rounded-full text-xs text-gray-900 bg-gray-300/80 border border-gray-900"
          >
            {getCountryEmoji(language)}{" "}
            {language
              .trim()
              .toLowerCase()
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        ))}
      </div>
    ),
    filterFn: "arrIncludes",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs ${
          row.original.availability
            ? "text-green-700 bg-green-200 border border-green-700"
            : "text-red-700 bg-red-200 border border-red-700"
        }`}
      >
        {row.original.availability ? "Available" : "Unavailable"}
      </span>
    ),
    filterFn: "isAvailable",
    meta: {
      filterVariant: "select",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="text-blue-500 underline"
      >
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
    cell: ({ row }) => (
      <span className="uppercase">{row.original.timezone}</span>
    ),
  },
  {
    accessorKey: "current_project",
    header: "Current Project",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.current_project}</span>
    ),
  },
];
