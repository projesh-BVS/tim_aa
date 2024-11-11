import { useState } from "react";
import ReportsTableContent from "./SubComps/ReportsTableContent";
import ReportsTableHeader from "./SubComps/ReportsTableHeader";
import ReportsGraphsContent from "./SubComps/ReportsGraphsContent";
import useAnalytics from "@/hooks/useAnalytics";
import LoadingIndicator from "@/components/Common/LoadingIndicator";

const ReportsTable = ({ index, companyInfo }) => {
  const { analytics, isAnalyticsLoading, isAnalyticsError } = useAnalytics(
    companyInfo.companyID
  );
  const [reportViewMode, setReportViewMode] = useState(0);

  function Callback_OnViewModeChange(viewMode) {
    setReportViewMode(viewMode);
  }

  console.log(analytics);

  return (
    <section
      className="animate-slideInSpringedLeft flex shrink-0 flex-col items-center justify-center w-full rounded-xl shadow-md bg-white overflow-clip"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {isAnalyticsLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <LoadingIndicator />
          <span className="font-semibold lg:text-xl">Loading Reports</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {analytics && analytics.data && analytics.data.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, no analytics data found for{" "}
            <span className="italic text-tif-blue">
              {companyInfo.companyName}
            </span>
          </span>
          <span className="font-light text-xs lg:text-sm">
            This page will show analytics when they have been generated
          </span>
        </section>
      )}

      {isAnalyticsError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {analytics &&
        analytics.data &&
        analytics.data.length > 0 &&
        !isAnalyticsError && (
          <section className="flex flex-col w-full items-center justify-center overflow-auto">
            <ReportsTableHeader
              companyInfo={companyInfo}
              initialViewMode={reportViewMode}
              OnViewModeChangeCallback={Callback_OnViewModeChange}
            />
            {reportViewMode === 1 && (
              <>
                <ReportsTableContent
                  tableName={"Product Report"}
                  analyticsInfo={analytics.data}
                  tableColumns={[
                    {
                      name: "Product Name",
                      selector: (row) => row.productName,
                      sortable: true,
                    },
                    {
                      name: "Product ID",
                      selector: (row) => row.productID,
                      sortable: true,
                    },
                    {
                      name: "Product SKU",
                      selector: (row) => row.productSKU,
                      sortable: true,
                    },
                    {
                      name: "Views AR",
                      selector: (row) => row.ARviews,
                      sortable: true,
                    },
                    {
                      name: "Duration AR",
                      selector: (row) => row.durationAR,
                      sortable: true,
                    },
                    {
                      name: "Loadtime AR",
                      selector: (row) => row.ARloadtime,
                      sortable: true,
                    },
                  ]}
                />

                <ReportsTableContent
                  tableName={"Category Report"}
                  analyticsInfo={analytics.catData}
                  tableColumns={[
                    {
                      name: "Category",
                      selector: (row) => row.catName,
                      sortable: true,
                    },
                    {
                      name: "Views",
                      selector: (row) => row.catView,
                      sortable: true,
                    },                    
                  ]}
                />
              </>
            )}

            {reportViewMode === 0 && (
              <ReportsGraphsContent analyticsInfo={analytics} />
            )}
          </section>
        )}
    </section>
  );
};

export default ReportsTable;
