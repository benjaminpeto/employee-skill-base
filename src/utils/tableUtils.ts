import { FilterFn } from "@tanstack/react-table";

/**
 * Custom filter function to check if an array includes a specified filter value.
 * @param row - The row object containing the cell value.
 * @param columnId - The column ID to filter on.
 * @param filterValue - The value to filter by.
 * @returns True if the array includes the filter value, otherwise false.
 */
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

/**
 * Custom filter function to check if a boolean value matches the specified filter value.
 * @param row - The row object containing the cell value.
 * @param columnId - The column ID to filter on.
 * @param filterValue - The value to filter by.
 * @returns True if the boolean value matches the filter value, otherwise false.
 */
export const isAvailable: FilterFn<{
  getValue: (columnId: string) => boolean;
}> = (
  row: { getValue: (columnId: string) => boolean },
  columnId: string,
  filterValue: string
) => {
  if (!filterValue || filterValue === "all") return true;
  const cellValue = row.getValue(columnId) as boolean;
  return filterValue === "true" ? cellValue === true : cellValue === false;
};
