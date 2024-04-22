import { useState } from "react";
import CompanyCategoryCollectionHeader from "./CompanyCategoryCollectionHeader";
import CompanySubCatCardList from "./CompanySubCatCardList";

const CompanyCategoryCollection = ({
  showLogs = false,
  showSubCategories = false,
  categoryInfo,
  categoryIndex,
  categoriesLength,
  editCatOnlyCallback,
  deleteCatOnlyCallback,
  editCatCollectionCallback,
}) => {
  const isRoundedTop = categoryIndex == 0 ? "rounded-t-lg" : "rounded-t-none";
  const isRoundedBottom =
    categoriesLength === 1 || categoryIndex === categoriesLength - 1
      ? "rounded-b-lg"
      : "rounded-b-none";

  let catNameEditted = Object.keys(categoryInfo);

  function HandleCategoryEdit(oldCategoryName, newCategoryName) {
    Log(
      "Handle Category Edit | Old Cat Name: " +
        oldCategoryName +
        " | New Cat Name: " +
        newCategoryName +
        " | [" +
        categoryIndex +
        "]",
      showLogs
    );
    Log(
      "Handle Category Edit => categoryInfo | " + JSON.stringify(categoryInfo),
      showLogs
    );
    Log("CAT INFO" + JSON.stringify(categoryInfo), showLogs);
    let edittedCatObj = {};
    edittedCatObj[newCategoryName] = Object.values(categoryInfo)[0];
    Log(JSON.stringify(edittedCatObj), showLogs);
    catNameEditted = newCategoryName;

    editCatCollectionCallback(edittedCatObj, categoryIndex);

    UploadCategoryEdit(oldCategoryName, newCategoryName);
  }

  function HandleSubCategoryEdit(subCatList) {
    Log("Handle Sub Category Edit | " + subCatList, showLogs);
    HandleCategoryEdit(catNameEditted);
  }

  function HandleCategoryDelete(catName) {
    deleteCatOnlyCallback(catName);
  }

  const UploadCategoryEdit = (oldCatName, newCatName) => {
    let catData = {
      oldCat: oldCatName,
      newCat: newCatName,
    };

    Log("Only category edit data - " + JSON.stringify(catData), showLogs);

    editCatOnlyCallback(catData);
  };

  return (
    <section
      className={`flex flex-col shrink-0 items-center w-full bg-white border-2 border-tif-blue overflow-clip transition-all ${
        showSubCategories ? "rounded-lg" : isRoundedTop + " " + isRoundedBottom
      }`}
    >
      <CompanyCategoryCollectionHeader
        showLogs={true}
        showSubCats={showSubCategories}
        categoryName={Object.keys(categoryInfo)}
        categoryIndex={categoryIndex}
        editCategoryCallback={HandleCategoryEdit}
        deleteCategoryCallback={HandleCategoryDelete}
      />
      {showSubCategories && (
        <div className="flex flex-col items-center justify-center w-full">
          <CompanySubCatCardList
            showLogs={true}
            listItems={Object.values(categoryInfo)[0]}
            editSubCatCallback={HandleSubCategoryEdit}
            deleteSubCatCallback={null}
          />
        </div>
      )}
    </section>
  );
};

export default CompanyCategoryCollection;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
//Object.keys(categoryInfo[0]);
//Object.values(categoryInfo[0])[0][1];

//JSON.stringify(categoryInfo);
//categoryInfo && Object.keys(categoryInfo);
//categoryInfo && Object.values(categoryInfo)[0][0];
