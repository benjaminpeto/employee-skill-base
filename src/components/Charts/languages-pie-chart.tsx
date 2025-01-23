"use client";

import { useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { getSpokenLanguages } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function LanguagesPieChart() {
  const { chartData, chartConfig } = useChartData(
    getSpokenLanguages,
    "languages"
  );

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
    />
  );
}
