"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getTools } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function ToolsBarChart() {
  const { chartData, chartConfig } = useChartData(getTools, "tools");

  return (
    <CustomBarChart
      title="Tools"
      description="Tools employees are familiar with"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total tools known by employees."
      footerParagraph="Showing all tools"
    />
  );
}
