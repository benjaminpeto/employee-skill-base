import { ChartConfig } from "@/components/ui/chart";
import { BarChartDataState } from "@/types/charts";

export const fetchChartData = async (
  fetchFunction: () => Promise<BarChartDataState[]>
) => {
  const data = await fetchFunction();
  return data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

export const generateChartConfig = (
  data: BarChartDataState[],
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
