import { useEffect, useState } from "react";
import CompanySubCatCard from "./CompanySubCatCard";

const CompanySubCatCardList = ({
  showLogs = false,
  listItems,
  editSubCatCallback,
  deleteSubCatCallback,
}) => {
  const [listItemsEditted, setListItemsEditted] = useState(listItems);
  useEffect(() => {
    Log("Re rendering sub cat card list", showLogs);
    setListItemsEditted(listItems);
  }, [listItems]);

  function HandleEdit(subCatName, subCatIndex) {
    Log("Handle Edit | " + subCatName + " | [" + subCatIndex + "]", showLogs);
    let edittedList = listItemsEditted;
    edittedList[subCatIndex] = subCatName;
    setListItemsEditted(edittedList);

    Log("Editted List: " + edittedList, showLogs);
    editSubCatCallback(edittedList);
  }

  return (
    <div className="flex flex-col items-center w-full">
      {listItems.length == 0 && (
        <h1 className="flex items-center justify-center p-2 font-semibold text-gray-400 w-full">
          No sub categories added
        </h1>
      )}

      {listItems.length > 0 &&
        listItems.map((subCat, index) => (
          <CompanySubCatCard
            key={subCat + index}
            showLogs={true}
            subCatName={subCat}
            subCatIndex={index}
            showSeperator={index != listItems.length - 1}
            editSubCatCallback={HandleEdit}
            deleteSubCatCallback={deleteSubCatCallback}
          />
        ))}
    </div>
  );
};

export default CompanySubCatCardList;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
