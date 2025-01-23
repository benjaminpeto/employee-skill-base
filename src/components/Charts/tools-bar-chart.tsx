"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getTools } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";
import { useMemo } from "react";

export default function ToolsBarChart() {
  const { chartData, chartConfig } = useChartData(getTools, "tools");

  const totalTools = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <CustomBarChart
      title="Tools"
      description="Tools employees are familiar with"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText={`${totalTools} tools known by employees.`}
    />
  );
}
