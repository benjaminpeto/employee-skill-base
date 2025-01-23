"use client";

import CustomBarChart from "@/components/Charts/bar-chart";
import {
  getYearsOfExperience,
  calculateTotalYearsOfExperience,
} from "@/utils/dbUtils";
import { useChartData } from "@/hooks/useChartData";
import { useEffect, useState } from "react";

export default function YearsOfExperienceBarChart() {
  const [totalYearsOfExperience, setTotalYearsOfExperience] = useState(0);
  const { chartData, chartConfig } = useChartData(
    getYearsOfExperience,
    "experience"
  );

  useEffect(() => {
    const fetchTotalYearsOfExperience = async () => {
      const total = await calculateTotalYearsOfExperience();
      setTotalYearsOfExperience(total);
    };

    fetchTotalYearsOfExperience();
  }, []);

  return (
    <CustomBarChart
      title="Years of Experience"
      description="Number of employees for each range of years of experience"
      chartData={chartData}
      chartConfig={chartConfig}
      footerText={`Total experience of all employees: ${totalYearsOfExperience} years.`}
    />
  );
}
