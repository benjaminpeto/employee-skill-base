"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getTools } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

const fetchToolsData = async () => {
  const data = await getTools();
  return data.map((tool, index) => ({
    ...tool,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const generateChartConfig = (data: BarChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    tools: {
      label: "Tools",
    },
  };

  data.forEach((tool, index) => {
    config[tool.label] = {
      label: tool.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function ToolsBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    tools: { label: "Tools" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchToolsData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
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
