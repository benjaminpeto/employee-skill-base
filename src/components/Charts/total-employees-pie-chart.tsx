"use client";

import { useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { fetchEmployeeData } from "@/utils/chartUtils";
import { useChartData } from "@/hooks/useChartData";

export default function DonutTotalEmployeesChart() {
  const { chartData, chartConfig } = useChartData(
    fetchEmployeeData,
    "employees"
  );

  const totalEmployees = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <DonutChart
      title="Employee Availability"
      description="Current"
      chartData={chartData}
      totalLabel="Employees"
      footerText={`${
        chartData.find((data) => data.label === "Available")?.value
      } employees available.`}
      chartConfig={chartConfig}
      totalValue={totalEmployees}
    />
  );
}
