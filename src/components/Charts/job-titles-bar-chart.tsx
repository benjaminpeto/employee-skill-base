"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";
import { getJobTitles } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

export default function JobTitlesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    titles: { label: "Titles" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(getJobTitles);
      setChartData(data);
      setChartConfig(generateChartConfig(data, "titles"));
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
