import LoadingIndicator from "@/components/Common/LoadingIndicator";
import OwnerCollectionBody from "./OwnerCollectionBody";
import OwnerCollectionHeader from "./OwnerCollectionHeader";

const OwnerCollection = ({
  index,
  ownerData,
  isValidatingData,
  editOwnerCallback,
}) => {
  return (
    <section
      className="animate-slideInSpringedLeft flex flex-col shrink-0 items-center w-full bg-white rounded-2xl shadow-md overflow-clip transition-all"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {!isValidatingData && (
        <>
          <OwnerCollectionHeader
            index={index}
            ownerInfo={ownerData.ownerDetails[0]}
            editOwnerCallback={editOwnerCallback}
          />
          <OwnerCollectionBody index={index} ownerData={ownerData} />
        </>
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
    </section>
  );
};

export default OwnerCollection;
