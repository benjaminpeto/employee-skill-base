import { Column, Header, Table } from "@tanstack/react-table";
import { Profile } from "@/types/profile";
import Filter from "./filter";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FiltersContainer({
  columns,
  clearFilters,
}: {
  columns: Column<Profile, unknown>[];
  clearFilters: () => void;
}) {
  return (
    <div className="rounded-md mb-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-xl pt-0">
            Filters
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 items-end p-1">
              {columns.map((column) => (
                <div key={column.id}>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {typeof column.columnDef.header === "function"
                      ? column.columnDef.header({
                          column: column,
                          header: {} as Header<Profile, unknown>,
                          table: {} as Table<Profile>,
                        })
                      : column.columnDef.header}
                  </label>
                  <Filter column={column} />
                </div>
              ))}
              <Button onClick={clearFilters} variant="destructive">
                Clear Filters
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
