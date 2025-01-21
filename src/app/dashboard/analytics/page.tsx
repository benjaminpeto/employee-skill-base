import ProjectsPieChart from "@/components/Charts/projects-pie-chart";
import DonutTotalEmployeesChart from "@/components/Charts/total-employees-pie-chart";

export default async function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Insights</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
          <DonutTotalEmployeesChart />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <ProjectsPieChart />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50"></div>
      </div>
    </div>
  );
}
