"use client";

import { useState, useEffect, useMemo } from "react";
import DonutChart from "@/components/Charts/pie-chart";
import { ChartConfig } from "@/components/ui/chart";
import { getEmployeeCounts } from "@/utils/dbUtils";
import { PieChartDataState } from "@/types/charts";

const fetchEmployeeData = async () => {
  const { available, unavailable } = await getEmployeeCounts();
  return [
    { label: "Available", value: available, fill: "var(--color-available)" },
    {
      label: "Unavailable",
      value: unavailable,
      fill: "var(--color-unavailable)",
    },
  ];
};

const chartConfig = {
  employees: {
    label: "Employees",
  },
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  unavailable: {
    label: "Unavailable",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DonutTotalEmployeesChart() {
  const [chartData, setChartData] = useState<PieChartDataState[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmployeeData();
      setChartData(data);
    };

    loadData();
  }, []);

  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <DonutChart
      title="Employee Availability"
      description="Current"
      chartData={chartData}
      totalLabel="Employees"
      footerText={`Currently ${
        chartData.find((data) => data.label === "Unavailable")?.value
      } employees are available.`}
      chartConfig={chartConfig}
      totalValue={totalValue}
      footerParagraph="Showing all employees"
    />
  );
}
