import { flexRender, Row } from "@tanstack/react-table";
import { TableRow, TableCell, TableBody as Body } from "@/components/ui/table";
import { Profile } from "@/types/profile";

interface TableBodyProps {
  rows: Row<Profile>[];
  columnsLength: number;
  handleRowClick: (profileId: string) => void;
}

export default function TableBody({
  rows,
  columnsLength,
  handleRowClick,
}: TableBodyProps) {
  return (
    <Body>
      {rows.length ? (
        rows.map((row) => (
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
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </Body>
  );
}
