import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const useExportPDF = () => {
  const { toast } = useToast();

  const exportPDF = async (
    element: HTMLDivElement | null,
    fileName: string
  ) => {
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        logging: true,
        onclone: (document) => {
          // Ensure external resources like images are loaded
          const images = document.querySelectorAll("img");
          images.forEach((img) => {
            if (!img.complete) {
              img.onload = () => {};
              img.onerror = () => {};
            }
          });
        },
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.width;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF", error);
      toast({
        title: "Error",
        description: "There was an error exporting the profile as a PDF.",
        variant: "destructive",
      });
    }
  };

  return { exportPDF };
};
