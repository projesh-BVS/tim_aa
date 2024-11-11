"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import ReportsCompanySelector from "@/components/Dashboard/DashboardReports/ReportsCompanySelector";
import ReportsTable from "@/components/Dashboard/DashboardReports/ReportsTable";
import useOwner from "@/hooks/useOwner";
import { PresentationChartLineIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Reports() {
  const { owner, isOwnerLoading, isOwnerError } = useOwner();
  const [selectedCompany, setSelectedCompany] = useState(-1); //-1 for All

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<PresentationChartLineIcon className="h-8 w-8" />}
        text="Reports"
        isLoading={isOwnerLoading}
        showBackBtn={true}
      />

      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Reports</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isOwnerError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <section className="flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 lg:p-4 gap-2 rounded-xl shadow-md bg-white">
            <ReportsCompanySelector
              companies={owner.companyList}
              selectedCompany={selectedCompany}
              onChange={setSelectedCompany}
            />
          </div>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <section className="flex flex-col px-6 pb-6 gap-4 w-full h-screen items-center justify-start overflow-auto">          
          {owner.companyList
            .filter(
              (company) =>
                selectedCompany === -1 || company.companyID === selectedCompany
            )
            .map((company, index) => (
              <ReportsTable
                key={company.companyID}
                index={index}
                companyInfo={company}
              />
            ))}
        </section>
      )}
    </main>
  );
}
