import { useState, useEffect } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { ChartDataState } from "@/types/charts";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";

export const useChartData = (
  fetchFunction: () => Promise<ChartDataState[]>,
  label: string
) => {
  const [chartData, setChartData] = useState<ChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    [label]: { label: label.charAt(0).toUpperCase() + label.slice(1) },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(fetchFunction);
      setChartData(data);
      setChartConfig(generateChartConfig(data, label));
    };

    loadData();
  }, [fetchFunction, label]);

  return { chartData, chartConfig };
};
