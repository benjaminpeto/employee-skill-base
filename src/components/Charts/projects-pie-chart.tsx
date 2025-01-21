"use client";

import { useState, useEffect, useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getProjectAssignments } from "@/utils/dbUtils";
import { PieChartDataState } from "@/types/charts";

const fetchProjectData = async () => {
  const data = await getProjectAssignments();
  return data.map((project) => ({
    ...project,
    fill: `var(--color-${project.label.toLowerCase().replace(/\s+/g, "-")})`,
  }));
};

const generateChartConfig = (data: PieChartDataState[]): ChartConfig => {
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
  const [chartData, setChartData] = useState<PieChartDataState[]>([]);
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

  const totalProject = useMemo(() => {
    return chartData.length;
  }, [chartData]);

  return (
    <DonutChart
      title="Project Assignments"
      description="Developers per project"
      chartData={chartData}
      totalLabel="Projects"
      footerText={`Total developers assigned to projects.`}
      chartConfig={chartConfig}
      totalValue={totalProject}
      footerParagraph="Showing all projects"
    />
  );
}
