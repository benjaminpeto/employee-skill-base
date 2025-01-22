"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getApplicationsServices } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function ApplicationsServicesBarChart() {
  const { chartData, chartConfig } = useChartData(
    getApplicationsServices,
    "services"
  );

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
