"use client";

import { useState, useEffect, useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getSpokenLanguages } from "@/utils/dbUtils";
import { PieChartDataState } from "@/types/charts";

const fetchLanguageData = async () => {
  const data = await getSpokenLanguages();
  return data.map((language, index) => ({
    ...language,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const config: ChartConfig = {
  languages: {
    label: "Languages",
  },
};

export default function LanguagesPieChart() {
  const [chartData, setChartData] = useState<PieChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    languages: { label: "Languages" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchLanguageData();
      setChartData(data);
      setChartConfig(config);
    };

    loadData();
  }, []);

  const totalLanguages = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <DonutChart
      title="Languages Spoken"
      description="Languages spoken by the team"
      chartData={chartData}
      totalLabel="Languages"
      footerText={`Total languages spoken by the team.`}
      chartConfig={chartConfig}
      totalValue={totalLanguages}
      footerParagraph="Showing all languages"
    />
  );
}
