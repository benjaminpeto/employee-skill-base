import { ChartConfig } from "@/components/ui/chart";

export interface DonutChartProps {
  title: string;
  description: string;
  chartData: PieChartDataState[];
  totalLabel: string;
  footerText: string;
  chartConfig: ChartConfig;
  totalValue: number;
  footerParagraph?: string;
}

export interface PieChartDataState {
  label: string;
  value: number;
  fill: string;
}

export interface BarChartProps {
  title: string;
  description: string;
  chartData: BarChartDataState[];
  chartConfig: ChartConfig;
  footerText: string;
  footerParagraph: string;
}

export interface BarChartDataState {
  label: string;
  value: number;
}
