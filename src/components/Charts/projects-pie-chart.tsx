"use client";

import { useState, useEffect, useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getProjectAssignments } from "@/utils/dbUtils";
import { ChartDataState } from "@/types/charts";

const fetchProjectData = async () => {
  const data = await getProjectAssignments();
  return data.map((project) => ({
    ...project,
    fill: `var(--color-${project.label.toLowerCase().replace(/\s+/g, "-")})`,
  }));
};

const generateChartConfig = (data: ChartDataState[]): ChartConfig => {
  const config: ChartConfig = {
    projects: {
      label: "Projects",
    },
  };

  data.forEach((project, index) => {
    config[project.label] = {
      label: project.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return config;
};

export default function ProjectsPieChart() {
  const [chartData, setChartData] = useState<ChartDataState[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    projects: { label: "Projects" },
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjectData();
      setChartData(data);
      setChartConfig(generateChartConfig(data));
    };

    loadData();
  }, []);

  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <DonutChart
      title="Project Assignments"
      description="Developers per project"
      chartData={chartData}
      totalLabel="Projects"
      footerText={`Total developers assigned to projects.`}
      chartConfig={chartConfig}
      totalValue={totalValue}
      footerParagraph="Showing all projects"
    />
  );
}
