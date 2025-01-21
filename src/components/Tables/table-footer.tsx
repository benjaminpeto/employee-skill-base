import {
  TableRow,
  TableCell,
  TableFooter as Footer,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { columns } from "./columns";

interface TableFooterProps {
  rowsFound: number;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export default function TableFooter({
  rowsFound,
  pageSize,
  setPageSize,
}: TableFooterProps) {
  return (
    <Footer>
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="flex justify-between items-center">
            <span>{`Employees found: ${rowsFound}`}</span>
            <div className="flex items-center space-x-2">
              <span>Rows per page:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value: string) => setPageSize(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Footer>
  );
}
