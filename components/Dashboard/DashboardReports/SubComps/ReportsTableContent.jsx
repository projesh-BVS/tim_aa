import GenerateReportsTableData from "@/libs/Report Libs/GenerateReportsTableData";
import { DownloadCSV } from "@/libs/Report Libs/ReportExportLibs";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const Export = ({ onExport }) => (
  <button
    className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white text-sm bg-tif-blue hover:bg-tif-lavender transition-all"
    onClick={(e) => onExport(e.target.value)}
  >
    <ArrowDownTrayIcon className="h-5 w-5" />
    <h1>Export Report</h1>
  </button>
);

const ReportsTableContent = ({ tableName, analyticsInfo, tableColumns }) => {
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
          title={tableName}
          columns={tableColumns}
          data={analyticsData}
          actions={actionsMemo}
          dense
          fixedHeader
          pagination
        ></DataTable>
      </section>
    </section>
  );
};

export default ReportsTableContent;
