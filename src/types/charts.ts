import { ChartConfig } from "@/components/ui/chart";

export interface DonutChartProps {
  title: string;
  description: string;
  chartData: ChartDataState[];
  totalLabel: string;
  footerText: string;
  chartConfig: ChartConfig;
  totalValue: number;
  footerParagraph?: string;
}

export interface ChartDataState {
  label: string;
  value: number;
  fill?: string;
}

export interface BarChartProps {
  title: string;
  description: string;
  chartData: ChartDataState[];
  chartConfig: ChartConfig;
  footerText: string;
  footerParagraph?: string;
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
  experience_level?: number;
}
