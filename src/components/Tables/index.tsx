"use client";

import DataTable from "@/components/Tables/table";
import { TableProvider } from "@/contexts/TableContext";

export default function Table() {
  return (
    <div className="p-4">
      <TableProvider>
        <DataTable />
      </TableProvider>
    </div>
  );
}
