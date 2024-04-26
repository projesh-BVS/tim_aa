import {
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

const OwnerCompanyInfoList = ({
  ownerCompanies,
  searchQuery,
  callback_Company_Edit,
}) => {
  return (
    <section
      className={`flex flex-col items-center justify-start w-full gap-4`}
    >
      {ownerCompanies
        .filter((company) =>
          company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((company) => (
          <OwnerCompanyInfoCard
            key={"company" + company.companyID}
            companyInfo={company}
            callback_Company_Edit={callback_Company_Edit}
          />
        ))}
    </section>
  );
};

export default OwnerCompanyInfoList;

const OwnerCompanyInfoCard = ({ companyInfo, callback_Company_Edit }) => {
  const [showOutlets, setShowOutlets] = useState(false);
  const [currOutletPageIndex, setCurrOutletPageIndex] = useState(0);

  function OnClick_PageLeft() {
    setCurrOutletPageIndex((cp) => cp - 1);
  }

  function OnClick_PageRight() {
    setCurrOutletPageIndex((cp) => cp + 1);
  }

  return (
    <div className="flex flex-col items-center justify-between w-full bg-white rounded-xl shadow-lg overflow-clip">
      {/* Header Div */}
      <div
        className={`flex flex-col md:flex-row items-center justify-between p-2 w-full gap-2 border-tif-blue ${
          showOutlets ? "border-b-2" : "border-none"
        }`}
      >
        <div className="flex items-center justify-start w-full h-14 gap-4">
          <div className="overflow-clip aspect-square h-[105%] shrink-0 relative rounded-lg bg-white">
            <Image
              src={companyInfo.companyLogo}
              blurDataURL={companyInfo.companyLogo}
              alt="Profile Picture"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-base">{companyInfo.companyName}</h1>
            <h1 className="text-xs">{companyInfo.companyAddress}</h1>
          </div>
        </div>

        <button
          className="flex items-center justify-center p-2 pr-4 gap-2 w-full md:w-auto h-auto md:h-full bg-tif-blue hover:bg-tif-lavender hover:shadow-md text-white rounded-md transition-all"
          onClick={() => callback_Company_Edit(companyInfo)}
        >
          <PencilSquareIcon className="w-5 h-5" />
          <h1>Edit</h1>
        </button>

        <button
          className="flex items-center justify-center p-2 gap-2 w-full md:w-auto h-auto md:h-full bg-tif-blue hover:bg-tif-lavender hover:shadow-md text-white rounded-md transition-all"
          onClick={() => setShowOutlets((prev) => !prev)}
        >
          <BuildingStorefrontIcon className="w-5 h-5" />
          <h1>Outlets</h1>
          <ChevronDownIcon
            className={`w-4 h-4 transition-all ${
              showOutlets ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Body Div */}
      <div
        className={`${
          showOutlets ? "h-32" : "h-0"
        } flex flex-col w-full transition-all overflow-clip`}
      >
        {/* Outlet Card Section */}
        <div className="relative w-full h-full">
          {companyInfo.outletList.length > 0 &&
            companyInfo.outletList.map((outlet, index) => (
              <OwnerOutletInfoCard
                key={
                  "company" + companyInfo.companyID + "outlet" + outlet.outletID
                }
                outletInfo={outlet}
                cardIndex={index}
                currPageIndex={currOutletPageIndex}
              />
            ))}

          {companyInfo.outletList.length == 0 && (
            <h1 className="flex items-center justify-center p-2 w-full h-full font-semibold text-sm text-gray-400">
              No outlets added
            </h1>
          )}
        </div>

        {/* Pagination Section */}
        {companyInfo.outletList.length > 0 && (
          <div className="w-full border-t-2 border-tif-gray">
            <div className="flex items-center justify-center p-1 gap-4 w-full">
              <h1 className="text-sm">
                Viewing Outlet {currOutletPageIndex + 1} of{" "}
                {companyInfo.outletList.length}
              </h1>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-300 transition-all"
                  disabled={currOutletPageIndex == 0}
                  onClick={OnClick_PageLeft}
                >
                  <ChevronLeftIcon className="w-9 h-9 p-2" />
                </button>
                <button
                  className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-300 transition-all"
                  disabled={
                    currOutletPageIndex + 1 == companyInfo.outletList.length
                  }
                  onClick={OnClick_PageRight}
                >
                  <ChevronRightIcon className="w-9 h-9 p-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OwnerOutletInfoCard = ({ outletInfo, cardIndex, currPageIndex }) => {
  let xPos = (cardIndex - currPageIndex) * 100;

  return (
    <div
      className={`absolute flex items-center justify-center p-2 gap-4 w-full h-full transition-all duration-300 ease-out-spring`}
      style={{ transform: `translateX(${xPos}%)` }}
    >
      <div className="flex items-center justify-center h-full aspect-square bg-gradient-to-br from-tif-blue to-tif-pink text-white rounded-lg">
        <BuildingStorefrontIcon className="w-7 h-7" />
      </div>
      <div className="flex flex-col items-start justify-center gap-1 w-full">
        <h1 className="font-medium text-base">{outletInfo.outletName}</h1>
        <h1 className="font-normal text-sm">{outletInfo.outletAddress}</h1>
      </div>
    </div>
  );
};
