"use client";

import { useEffect, useState, useMemo } from "react";
import { Profile } from "@/types/profile";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { arrIncludes, isAvailable } from "./utils";
import Pagination from "./pagination";
import FiltersContainer from "./filters-container";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    filterVariant?: string;
  }
}

export default function DataTable() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        toast({
          title: "Error",
          description: "There was an error fetching employee profiles.",
          variant: "destructive",
        });
        console.error("Error fetching profiles:", error);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, [supabase, toast]);

  const memoizedColumns = useMemo(() => columns, []);

  const clearFilters = () => {
    table.resetColumnFilters();
  };

  const handleRowClick = (profileId: string) => {
    router.push(`/dashboard/user/${profileId}`);
  };

  const table = useReactTable({
    data: profiles,
    columns: memoizedColumns,
    filterFns: {
      arrIncludes,
      isAvailable,
    },
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <FiltersContainer
        columns={table.getAllColumns()}
        clearFilters={clearFilters}
      />
      <Table className="text-xs font-mono">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
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
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(row.original.auth_user_id)}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </>
  );
}
