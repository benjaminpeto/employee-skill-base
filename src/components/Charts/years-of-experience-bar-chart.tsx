"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getYearsOfExperience } from "@/utils/dbUtils";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";
import { BarChartDataState } from "@/types/charts";

export default function YearsOfExperienceBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    experience: { label: "Experience" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(getYearsOfExperience);
      setChartData(data);
      setChartConfig(generateChartConfig(data, "experience"));
    };

    loadData();
  }, []);

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
