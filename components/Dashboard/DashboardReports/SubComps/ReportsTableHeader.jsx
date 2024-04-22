import {
  PresentationChartLineIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

const ReportsTableHeader = ({
  companyInfo,
  initialViewMode,
  OnViewModeChangeCallback,
}) => {
  const [viewMode, setViewMode] = useState(initialViewMode);

  function ChangeViewState(viewState) {
    setViewMode(viewState);
    if (OnViewModeChangeCallback) OnViewModeChangeCallback(viewState);
  }

  return (
    <section className="flex flex-col md:flex-row p-2 gap-2 items-center justify-between w-full border-b-2 border-tif-blue">
      <div className="flex flex-col w-full text-left">
        <section className="flex gap-4 w-full items-center">
          {/*Logo Div*/}
          <div className="rounded-lg overflow-clip aspect-square h-[4.2rem] shrink-0 relative shadow-inner border-[1px] border-tif-grey">
            <Image
              src={companyInfo.companyLogo}
              blurDataURL={companyInfo.companyLogo}
              alt="Company Logo"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/*Name Div & Address Dic*/}
          <div>
            <h1 className="font-semibold text-md">{companyInfo.companyName}</h1>
            <h2 className="font-medium text-sm text-gray-500 w-full text-ellipsis">
              {companyInfo.companyAddress}
            </h2>
          </div>
        </section>
      </div>

      {/*<div className="flex flex-col md:flex-row gap-1 lg:gap-2 items-center justify-center md:justify-end w-full md:w-fit">
        <button
          className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white bg-tif-blue hover:bg-tif-lavender transition-all"
          onClick={null}
        >
          <ArrowDownTrayIcon className="md:h-7 h-5 md:w-7 w-5" />
          <h1>Export Report</h1>
        </button>
      </div>*/}

      <div className="flex flex-col md:flex-row gap-1 lg:gap-2 items-center justify-center md:justify-end w-full md:w-fit">
        <button
          className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white bg-tif-blue hover:bg-tif-lavender disabled:bg-tif-blue/40 transition-all"
          disabled={viewMode === 0}
          onClick={() => ChangeViewState(0)}
        >
          <PresentationChartLineIcon className="md:h-7 h-5 md:w-7 w-5" />
          <h1 className="whitespace-nowrap">View Graphs</h1>
        </button>

        <button
          className="flex items-center justify-center p-2 gap-2 w-full md:w-fit rounded-lg font-semibold text-white bg-tif-blue hover:bg-tif-lavender disabled:bg-tif-blue/40 transition-all"
          disabled={viewMode === 1}
          onClick={() => ChangeViewState(1)}
        >
          <TableCellsIcon className="md:h-7 h-5 md:w-7 w-5" />
          <h1 className="whitespace-nowrap">View Data</h1>
        </button>
      </div>
    </section>
  );
};

export default ReportsTableHeader;
