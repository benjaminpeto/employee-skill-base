"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";
import { getTools } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

export default function ToolsBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    tools: { label: "Tools" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(getTools);
      setChartData(data);
      setChartConfig(generateChartConfig(data, "tools"));
    };

    loadData();
  }, []);

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
