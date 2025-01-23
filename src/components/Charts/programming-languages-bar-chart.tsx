"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getProgrammingLanguages } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";
import { useMemo } from "react";

export default function ProgrammingLanguagesBarChart() {
  const { chartData, chartConfig } = useChartData(
    getProgrammingLanguages,
    "languages"
  );

  const totalLanguages = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <CustomBarChart
      title="Programming Languages"
      description="Programming languages employees are skilled at"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText={`${totalLanguages} programming languages known by employees.`}
    />
  );
}
