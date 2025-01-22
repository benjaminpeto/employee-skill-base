"use client";

import { useState, useEffect } from "react";
import CustomBarChart from "@/components/Charts/bar-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getApplicationsServices } from "@/utils/dbUtils";
import { BarChartDataState } from "@/types/charts";

const fetchApplicationsServicesData = async () => {
  const data = await getApplicationsServices();
  return data.map((service, index) => ({
    ...service,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
};

const generateChartConfig = (data: BarChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    services: {
      label: "Services",
    },
  };

  data.forEach((service, index) => {
    config[service.label] = {
      label: service.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function ApplicationsServicesBarChart() {
  const [chartData, setChartData] = useState<BarChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    services: { label: "Services" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchApplicationsServicesData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
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
