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

export interface ProfileForAnalytics {
  availability?: boolean;
  current_project?: string;
  spoken_languages?: string[];
  programming_languages?: string[];
  applications_services?: string[];
  tools?: string[];
  years_of_experience?: number;
  job_title?: string;
}
