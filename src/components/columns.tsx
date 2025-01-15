"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Profile } from "@/types/profile";

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "years_of_experience",
    header: "Years of Experience",
  },
  {
    accessorKey: "tools",
    header: "Tools",
    cell: ({ row }) => row.original.tools.join(", "),
  },
  {
    accessorKey: "programming_languages",
    header: "Programming Languages",
    cell: ({ row }) => row.original.programming_languages.join(", "),
  },
  {
    accessorKey: "applications_services",
    header: "Applications/Services",
    cell: ({ row }) => row.original.applications_services.join(", "),
  },
  {
    accessorKey: "spoken_languages",
    header: "Spoken Languages",
    cell: ({ row }) => row.original.spoken_languages.join(", "),
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
  },
  {
    accessorKey: "current_project",
    header: "Current Project",
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) =>
      row.original.availability ? "Available" : "Unavailable",
  },
];
