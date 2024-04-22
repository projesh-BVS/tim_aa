import GenerateReportsTableData from "@/libs/Report Libs/GenerateReportsTableData";
import { DownloadCSV } from "@/libs/Report Libs/ReportExportLibs";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Product Name", selector: (row) => row.productName, sortable: true },
  { name: "Product ID", selector: (row) => row.productID, sortable: true },
  { name: "Product SKU", selector: (row) => row.productSKU, sortable: true },
  { name: "Views 360", selector: (row) => row.views360, sortable: true },
  { name: "Duration 360", selector: (row) => row.duration360, sortable: true },
  { name: "Loadtime 360", selector: (row) => row.Loadtime360, sortable: true },
  { name: "Views AR", selector: (row) => row.ARviews, sortable: true },
  //{ name: "Duration AR", selector: (row) => row.durationAR, sortable: true },
  //{ name: "Loadtime AR", selector: (row) => row.ARloadtime, sortable: true },
  {
    name: "Wishlist Clicks",
    selector: (row) => row.clicksToWishlist,
    sortable: true,
  },
  {
    name: "Variant Change Clicks",
    selector: (row) => row.clickToColorChange,
    sortable: true,
  },
];

const Export = ({ onExport }) => (
  <button
    className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white text-sm bg-tif-blue hover:bg-tif-lavender transition-all"
    onClick={(e) => onExport(e.target.value)}
  >
    <ArrowDownTrayIcon className="h-5 w-5" />
    <h1>Export Report</h1>
  </button>
);

const ReportsTableContent = ({ analyticsInfo }) => {
  const [analyticsData, setAnalyticsData] = useState(
    GenerateReportsTableData(analyticsInfo)
  );

  const actionsMemo = useMemo(
    () => <Export onExport={() => DownloadCSV(analyticsData)} />,
    [analyticsData]
  );

  return (
    <section className="flex items-center justify-center p-2 gap-2 w-full">
      <section className="flex flex-col w-full items-center justify-center overflow-auto">
        <DataTable
          columns={columns}
          data={analyticsData}
          actions={actionsMemo}
          fixedHeader
          pagination
        ></DataTable>
      </section>
    </section>
  );
};

export default ReportsTableContent;
