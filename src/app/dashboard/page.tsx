"use client";

import DataTable from "@/components/Tables";
import { TableProvider } from "@/contexts/TableContext";

export default function Page() {
  return (
    <div className="p-4">
      <TableProvider>
        <DataTable />
      </TableProvider>
    </div>
  );
}
