"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getYearsOfExperience } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function YearsOfExperienceBarChart() {
  const { chartData, chartConfig } = useChartData(
    getYearsOfExperience,
    "experience"
  );

  return (
    <CustomBarChart
      title="Years of Experience"
      description="Number of employees for each range of years of experience"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total years of experience known by employees."
      footerParagraph="Showing all years of experience"
    />
  );
}
