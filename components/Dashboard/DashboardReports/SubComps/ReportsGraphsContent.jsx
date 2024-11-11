import GenerateReportsGraphData from "@/libs/Report Libs/GenerateReportsGraphData";
import BarChart from "./BarChart";

const ReportsGraphsContent = ({ analyticsInfo }) => {
  const graphData_ViewsAR = GenerateReportsGraphData(
    "Views AR",
    analyticsInfo.data,
    "productSKU",
    "ARviews",
    "rgba(34, 197, 94, 0.5)"
  );  

  const graphData_LoadtimeAR = GenerateReportsGraphData(
    "Loadtime AR",
    analyticsInfo.data,
    "productSKU",
    "ARloadtime",
    "rgba(234, 179, 8, 0.5)"    
  );

  const graphData_DurationAR = GenerateReportsGraphData(
    "Duration AR",
    analyticsInfo.data,
    "productSKU",
    "durationAR",
    "rgba(253, 224, 71, 0.5)"
  );

  const graphData_CategoryViews = GenerateReportsGraphData(
    "Category Views",
    analyticsInfo.catData,
    "catName",
    "catView",
    "rgba(234, 179, 8, 0.5)"   
  )

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 p-2 gap-2 w-full bg-tif-blue">      
      <BarChart graphData={graphData_ViewsAR} />      
      <BarChart graphData={graphData_LoadtimeAR} />
      <BarChart graphData={graphData_DurationAR} />
      <BarChart graphData={graphData_CategoryViews} />
    </section>
  );
};

export default ReportsGraphsContent;
