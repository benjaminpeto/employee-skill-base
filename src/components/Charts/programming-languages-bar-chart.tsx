"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getProgrammingLanguages } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

const fetchProgrammingLanguagesData = async () => {
  const data = await getProgrammingLanguages();
  return data.map((language, index) => ({
    ...language,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const generateChartConfig = (data: BarChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    languages: {
      label: "Languages",
    },
  };

  data.forEach((language, index) => {
    config[language.label] = {
      label: language.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function ProgrammingLanguagesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    languages: { label: "Languages" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProgrammingLanguagesData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
    };

    loadData();
  }, []);

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
