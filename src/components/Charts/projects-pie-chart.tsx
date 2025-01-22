"use client";

import { useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { getProjectAssignments } from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";

export default function ProjectsPieChart() {
  const { chartData, chartConfig } = useChartData(
    getProjectAssignments,
    "projects"
  );

  const totalProjects = useMemo(() => {
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
      totalValue={totalProjects}
      footerParagraph="Showing all projects"
    />
  );
}
