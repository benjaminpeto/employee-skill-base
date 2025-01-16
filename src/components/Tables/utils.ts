import { FilterFn } from "@tanstack/react-table";

export const arrIncludes: FilterFn<{
  getValue: (columnId: string) => string[];
}> = (
  row: { getValue: (columnId: string) => string[] },
  columnId: string,
  filterValue: string
) => {
  const cellValue = row.getValue(columnId) as string[];
  if (!filterValue) return true;
  if (!Array.isArray(cellValue)) return false;
  return cellValue.some((item) =>
    item.toLowerCase().includes(filterValue.toLowerCase())
  );
};

export const isAvailable: FilterFn<{
  getValue: (columnId: string) => boolean;
}> = (
  row: { getValue: (columnId: string) => boolean },
  columnId: string,
  filterValue: string
) => {
  if (!filterValue) return true;
  const cellValue = row.getValue(columnId) as boolean;
  return filterValue === "true" ? cellValue === true : cellValue === false;
};
