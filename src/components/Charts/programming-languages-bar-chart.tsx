"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";
import { getProgrammingLanguages } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

export default function ProgrammingLanguagesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    languages: { label: "Languages" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(getProgrammingLanguages);
      setChartData(data);
      setChartConfig(generateChartConfig(data, "languages"));
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
