import OutletCollectionHeader from "./OutletCollectionHeader";
import OutletCollectionCardList from "./OutletCollectionCardList";
import LoadingIndicator from "@/components/Common/LoadingIndicator";

const OutletCollection = ({
  index,
  companyInfo,
  isValidatingData,
  editOutletCallback,
  deleteOutletCallback,
}) => {
  return (
    <section
      className="animate-slideInSpringedLeft flex flex-col shrink-0 items-center w-full bg-white rounded-2xl shadow-md overflow-clip transition-all"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <OutletCollectionHeader companyInfo={companyInfo} />
      <div className="flex flex-col items-center justify-center w-full">
        {!isValidatingData && (
          <OutletCollectionCardList
            listItems={companyInfo.outletList}
            companyName={companyInfo.companyName}
            editOutletCallback={editOutletCallback}
            deleteOutletCallback={deleteOutletCallback}
          />
        )}
        {isValidatingData && (
          <div className="flex p-4 gap-2 items-center justify-center">
            <LoadingIndicator />
            <h1 className="flex flex-col items-center justify-center font-semibold text-base text-gray-500">
              Reloading Data
              <span className="font-normal text-sm text-gray-400">
                Please Wait
              </span>
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default OutletCollection;
