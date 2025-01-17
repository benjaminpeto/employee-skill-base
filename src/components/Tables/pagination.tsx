import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";

export default function Pagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!table.getCanPreviousPage()) return;
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={table.getState().pagination.pageIndex === index}
              onClick={(e) => {
                e.preventDefault();
                table.setPageIndex(index);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!table.getCanNextPage()) return;
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
