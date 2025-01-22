"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { generateChartConfig, fetchChartData } from "@/utils/chartUtils";
import { getApplicationsServices } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

export default function ApplicationsServicesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    services: { label: "Services" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChartData(getApplicationsServices);
      setChartData(data);
      setChartConfig(generateChartConfig(data, "services"));
    };

    loadData();
  }, []);

  return (
    <CustomBarChart
      title="Applications and Services"
      description="Applications and services employees are familiar with"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText="Total applications and services known by employees."
      footerParagraph="Showing all applications and services"
    />
  );
}
