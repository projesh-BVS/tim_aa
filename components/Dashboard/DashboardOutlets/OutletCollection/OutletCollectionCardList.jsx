import OutletCollectionCard from "./OutletCollectionCard";

const OutletCollectionCardList = ({
  listItems,
  companyName,
  editOutletCallback,
  deleteOutletCallback,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      {listItems.length == 0 && (
        <h1 className="flex items-center justify-center p-2 font-semibold text-gray-400 w-full">
          No outlets added
        </h1>
      )}

      {listItems.length > 0 &&
        listItems.map((outlet, index) => (
          <OutletCollectionCard
            key={outlet.outletID}
            outletInfo={outlet}
            companyName={companyName}
            showSeperator={index != listItems.length - 1}
            editOutletCallback={editOutletCallback}
            deleteOutletCallback={deleteOutletCallback}
          />
        ))}
    </div>
  );
};

export default OutletCollectionCardList;
