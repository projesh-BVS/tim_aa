import {
  BuildingStorefrontIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const OutletCollectionCard = ({
  outletInfo,
  companyName,
  showSeperator = false,
  editOutletCallback,
  deleteOutletCallback,
}) => {
  return (
    <section
      className={`${
        showSeperator ? "border-b-2" : ""
      } flex items-center justify-center p-2 w-full`}
    >
      <section className="flex gap-4 w-full items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          {/*Outlet Icon*/}
          <div className="flex items-center justify-center p-2 rounded-lg h-[4rem] w-[4.2rem] text-sm text-white bg-gradient-to-br from-tif-blue to-tif-pink whitespace-nowrap transition-all">
            <BuildingStorefrontIcon className="h-7 w-7" />
          </div>

          {/*Name Div & Address Dic*/}
          <div>
            <h1 className="font-semibold text-md">{outletInfo.outletName}</h1>
            <h2 className="font-medium text-sm text-gray-500 w-full text-ellipsis">
              {outletInfo.outletAddress}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {/*Edit Outlet Button*/}
          <button
            className="flex items-center justify-center p-2 rounded-lg h-[4rem] w-[4.2rem] text-sm text-white bg-yellow-400 hover:bg-yellow-500 hover:shadow-md whitespace-nowrap transition-all"
            onClick={() => editOutletCallback(outletInfo, companyName)}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>

          {/*Delete Outlet Button*/}
          <button
            className="flex items-center justify-center p-2 rounded-lg h-[4rem] w-[4.2rem] text-sm text-white bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap transition-all"
            onClick={() => deleteOutletCallback(outletInfo, companyName)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </section>
    </section>
  );
};

export default OutletCollectionCard;
