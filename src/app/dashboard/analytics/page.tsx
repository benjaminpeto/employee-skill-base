import ApplicationsServicesBarChart from "@/components/Charts/applications-services-bar-chart";
import JobTitlesBarChart from "@/components/Charts/job-titles-bar-chart";
import LanguagesPieChart from "@/components/Charts/languages-pie-chart";
import ProgrammingLanguagesBarChart from "@/components/Charts/programming-languages-bar-chart";
import ProjectsPieChart from "@/components/Charts/projects-pie-chart";
import ToolsBarChart from "@/components/Charts/tools-bar-chart";
import DonutTotalEmployeesChart from "@/components/Charts/total-employees-pie-chart";
import YearsOfExperienceBarChart from "@/components/Charts/years-of-experience-bar-chart";

export default async function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Insights</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DonutTotalEmployeesChart />
        <ProjectsPieChart />
        <LanguagesPieChart />
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        <ProgrammingLanguagesBarChart />
        <ApplicationsServicesBarChart />
      </div>
      <ToolsBarChart />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <YearsOfExperienceBarChart />
        <JobTitlesBarChart />
      </div>
    </div>
  );
}
