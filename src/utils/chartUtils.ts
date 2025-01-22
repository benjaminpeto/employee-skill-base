import { ChartConfig } from "@/components/ui/chart";
import { ChartDataState } from "@/types/charts";
import { getEmployeeCounts } from "./dbUtils";

/**
 * Fetches chart data using the provided fetch function and adds color fill properties.
 * @param fetchFunction - The function to fetch chart data.
 * @returns An array of chart data with color fill properties.
 */
export const fetchChartData = async (
  fetchFunction: () => Promise<ChartDataState[]>
) => {
  const data = await fetchFunction();
  return data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

/**
 * Generates a chart configuration object from the provided data and label.
 * @param data - The chart data.
 * @param label - The chart label.
 * @returns A chart configuration object.
 */
export const generateChartConfig = (
  data: ChartDataState[],
  label: string
): ChartConfig => {
  const config: ChartConfig = {
    [label]: {
      label: label.charAt(0).toUpperCase() + label.slice(1),
    },
  };

  data.forEach((item, index) => {
    config[item.label] = {
      label: item.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

/**
 * Fetches the count of available and unavailable employees and formats it for chart display.
 * @returns An array of objects with labels and their corresponding counts.
 */
export const fetchEmployeeData = async () => {
  const { available, unavailable } = await getEmployeeCounts();
  return [
    { label: "Available", value: available },
    { label: "Unavailable", value: unavailable },
  ];
};
