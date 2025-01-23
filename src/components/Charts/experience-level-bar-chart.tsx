"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { useChartData } from "@/hooks/useChartData";
import { getExperienceLevels } from "@/utils/dbUtils";

export default function ExperienceLevelBarChart() {
  const { chartData, chartConfig } = useChartData(
    getExperienceLevels,
    "experience_level"
  );

  return (
    <CustomBarChart
      title="Experience Levels"
      description="Experience levels of employees"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total experience levels of employees."
      footerParagraph="Showing all experience levels"
    />
  );
}
