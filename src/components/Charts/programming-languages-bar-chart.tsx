"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getProgrammingLanguages } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function ProgrammingLanguagesBarChart() {
  const { chartData, chartConfig } = useChartData(
    getProgrammingLanguages,
    "languages"
  );

  return (
    <CustomBarChart
      title="Programming Languages"
      description="Programming languages employees are skilled at"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total programming languages known by employees."
      footerParagraph="Showing all programming languages"
    />
  );
}
