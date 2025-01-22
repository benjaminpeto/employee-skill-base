"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getJobTitles } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function JobTitlesBarChart() {
  const { chartData, chartConfig } = useChartData(getJobTitles, "titles");

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
