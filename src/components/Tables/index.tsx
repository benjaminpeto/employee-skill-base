"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { columns } from "./columns";
import { arrIncludes, isAvailable } from "../../utils/tableUtils";
import Pagination from "./pagination";
import FiltersContainer from "./filters-container";
import { useTableContext } from "@/contexts/TableContext";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import TableFooter from "./table-footer";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";

export default function DataTable() {
  const {
    profiles,
    columnFilters,
    pagination,
    sorting,
    setColumnFilters,
    setPagination,
    setSorting,
  } = useTableContext();
  const router = useRouter();

  const memoizedColumns = useMemo(() => columns, []);

  const clearFilters = () => {
    table.resetColumnFilters();
  };

  const handleRowClick = (profileId: string) => {
    router.push(`/dashboard/${profileId}`);
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
      sorting,
    },
    onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
    onPaginationChange: setPagination as OnChangeFn<PaginationState>,
    onSortingChange: setSorting as OnChangeFn<SortingState>,
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
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody
          rows={table.getRowModel().rows}
          columnsLength={columns.length}
          handleRowClick={handleRowClick}
        />
        <TableFooter
          rowsFound={table.getFilteredRowModel().rows.length}
          pageSize={pagination.pageSize}
          setPageSize={(size) =>
            setPagination({ ...pagination, pageSize: size })
          }
        />
      </Table>
      <Pagination table={table} />
    </>
  );
}
