"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Profile } from "@/types/profile";
import { getCountryEmoji } from "../../utils/getCountryEmoji";

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-bold">{row.original.name}</span>,
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
    accessorKey: "job_title",
    header: "Job Title",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.job_title}</span>
    ),
  },
  {
    accessorKey: "years_of_experience",
    header: "Years of Experience",
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
      <div className="flex flex-wrap gap-1">
        {row.original.spoken_languages.map((language) => (
          <span
            key={language}
            className="inline-block px-3 rounded-full text-sm text-gray-700 bg-gray-200 border border-gray-700"
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
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => (
      <span
        className={`inline-block px-3 rounded-full text-sm ${
          row.original.availability
            ? "text-green-700 bg-green-200 border border-green-700"
            : "text-red-700 bg-red-200 border border-red-700"
        }`}
      >
        {row.original.availability ? "Available" : "Unavailable"}
      </span>
    ),
    // filterFn: "isAvailable",
    meta: {
      filterVariant: "select",
    },
  },
];
