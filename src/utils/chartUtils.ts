import { ChartConfig } from "@/components/ui/chart";
import { ChartDataState } from "@/types/charts";
import { getEmployeeCounts } from "./dbUtils";

export const fetchChartData = async (
  fetchFunction: () => Promise<ChartDataState[]>
) => {
  const data = await fetchFunction();
  return data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

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

export const fetchEmployeeData = async () => {
  const { available, unavailable } = await getEmployeeCounts();
  return [
    { label: "Available", value: available },
    { label: "Unavailable", value: unavailable },
  ];
};
