"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getYearsOfExperience } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

const fetchYearsOfExperienceData = async () => {
  const data = await getYearsOfExperience();
  return data.map((experience, index) => ({
    ...experience,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const generateChartConfig = (data: BarChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    experience: {
      label: "Experience",
    },
  };

  data.forEach((experience, index) => {
    config[experience.label] = {
      label: experience.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function YearsOfExperienceBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    experience: { label: "Experience" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchYearsOfExperienceData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
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
