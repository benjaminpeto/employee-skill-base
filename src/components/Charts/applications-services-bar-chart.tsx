"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import { getApplicationsServices } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";
import { useMemo } from "react";

export default function ApplicationsServicesBarChart() {
  const { chartData, chartConfig } = useChartData(
    getApplicationsServices,
    "services"
  );

  const totalServices = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <CustomBarChart
      title="Applications and Services"
      description="Applications and services employees are familiar with"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText={`${totalServices} applications and services known by employees.`}
    />
  );
}
