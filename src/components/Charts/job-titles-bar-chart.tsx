"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getJobTitles } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";
import { useMemo } from "react";

export default function JobTitlesBarChart() {
  const { chartData, chartConfig } = useChartData(getJobTitles, "titles");

  const totalTitles = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <CustomBarChart
      title="Job Titles"
      description="Job titles employees have"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText={`${totalTitles} different job titles held by employees.`}
    />
  );
}
