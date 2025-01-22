"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getJobTitles } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

const fetchJobTitlesData = async () => {
  const data = await getJobTitles();
  return data.map((title, index) => ({
    ...title,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const generateChartConfig = (data: BarChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    titles: {
      label: "Titles",
    },
  };

  data.forEach((title, index) => {
    config[title.label] = {
      label: title.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function JobTitlesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    titles: { label: "Titles" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchJobTitlesData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
    };

    loadData();
  }, []);

  return (
    <CustomBarChart
      title="Job Titles"
      description="Job titles employees have"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total job titles known by employees."
      footerParagraph="Showing all job titles"
    />
  );
}
