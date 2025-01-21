import { ChartConfig } from "@/components/ui/chart";

export interface DonutChartProps {
  title: string;
  description: string;
  chartData: ChartDataState[];
  totalLabel: string;
  footerText: string;
  chartConfig: ChartConfig;
  totalValue: number;
}

export interface ChartDataState {
  label: string;
  value: number;
  fill: string;
}
