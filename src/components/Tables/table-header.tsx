import { flexRender, HeaderGroup } from "@tanstack/react-table";
import {
  TableRow,
  TableHead,
  TableHeader as Header,
} from "@/components/ui/table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Profile } from "@/types/profile";

interface TableHeaderProps {
  headerGroups: HeaderGroup<Profile>[];
}

export default function TableHeader({ headerGroups }: TableHeaderProps) {
  return (
    <Header>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none flex items-center justify-between"
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() &&
                    (header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </Header>
  );
}
