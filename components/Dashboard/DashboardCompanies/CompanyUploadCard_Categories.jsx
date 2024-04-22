import {
  CheckIcon,
  ListBulletIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import CompanyCategoryCollection from "./CompanyCategoryCollection/CompanyCategoryCollection";
import { useState } from "react";
import CompanyUploadFormField from "./SubComps/CompanyUploadFormField";

const CompanyUploadCard_Categories = ({
  fieldsData = null,
  onCatOnly_AddCallback,
  onCatOnly_EditCallback,
  onCatOnly_DeleteCallback,
  onFieldChangeCallback,
}) => {
  const [showSubCats, setShowSubCats] = useState(false);
  const [fieldsDataEditted, setFieldsDataEditted] = useState(
    fieldsData.categories
  );
  const [IsAddMode, setIsAddMode] = useState(false);
  const [addCategoryName, setAddCategoryName] = useState(null);

  const OnAddModeBtnClicked_Open = (e) => {
    e.preventDefault();
    setIsAddMode(true);
  };

  const OnAddModeBtnClicked_Save = (e) => {
    e.preventDefault();
    setIsAddMode(false);
    onCatOnly_AddCallback(addCategoryName);
  };

  const OnAddModeBtnClicked_Cancel = (e) => {
    e.preventDefault();
    setIsAddMode(false);
  };

  const HandleAddFieldChange = (e) => {
    console.log(
      "Handle Add Field Change: " + e.target.name + ": " + e.target.value
    );
    setAddCategoryName(e.target.value);
  };

  function HandleCatOnlyEdit(catData) {
    onCatOnly_EditCallback(catData);
  }

  function HandleCatOnlyDelete(catData) {
    onCatOnly_DeleteCallback(catData);
  }

  function HandleCatCollectionEdit(catCollectionData, catCollectionIndex) {
    console.log(
      "Handle Category Collection Edit | Data:" +
        JSON.stringify(catCollectionData) +
        " | Index:" +
        catCollectionIndex
    );

    let catCollectionEditted = fieldsDataEditted;
    catCollectionEditted[catCollectionIndex] = catCollectionData;
    setFieldsDataEditted(catCollectionEditted);
    console.log(JSON.stringify(catCollectionEditted));

    let target = { name: "", value: "" };
    let e = { target };

    e.target.name = "categories";
    e.target.value = catCollectionEditted;

    onFieldChangeCallback(e);
  }

  return (
    <section className="flex flex-col items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <ListBulletIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>Company Categories</h1>
      </div>

      <div className="flex flex-col p-2 lg:p-4 gap-2 lg:gap-4 w-full">
        <div className="relative flex items-center justify-center h-11 w-full">
          <div
            className={`${
              IsAddMode
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            } absolute left-0 right-0 m-auto transition-all ease-in-out`}
          >
            <button
              onClick={(e) => OnAddModeBtnClicked_Open(e)}
              className={`flex items-center justify-center p-2 gap-4 w-full font-semibold text-md text-white bg-green-500 hover:bg-green-600 hover:shadow-md rounded-lg transition-all`}
            >
              <PlusIcon className="h-5 w-5" />
              <h1>Add Category</h1>
            </button>
          </div>

          <div
            className={`${
              IsAddMode
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            } absolute left-0 right-0 m-auto transition-all ease-in-out`}
          >
            <div className={`flex items-center justify-center gap-4 w-full`}>
              <div className="flex items-center justify-center p-2 h-[2.5rem] w-[2.5rem] bg-gradient-to-br from-tif-blue to-tif-pink text-white rounded-lg">
                <PlusIcon className="w-5 h-5" />
              </div>

              <CompanyUploadFormField
                fieldID="addCategory"
                fieldName="addCategory"
                fieldType="text"
                fieldLabel="Add Category"
                fieldValue={addCategoryName}
                miniField={true}
                handleChange={HandleAddFieldChange}
              />

              <div
                className={`flex items-center justify-center gap-2 transition-all ease-in-out`}
              >
                {/*Save Add Button*/}
                <button
                  className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-green-400 hover:bg-green-500 hover:shadow-md whitespace-nowrap transition-all"
                  onClick={OnAddModeBtnClicked_Save}
                >
                  <CheckIcon className="h-5 w-5" />
                </button>

                {/*Cancel Add Button*/}
                <button
                  className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap transition-all"
                  onClick={OnAddModeBtnClicked_Cancel}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-between h-auto w-full ${
            showSubCats ? "gap-4" : "gap-1"
          } ${IsAddMode ? "pointer-events-none opacity-50" : ""}`}
        >
          {fieldsData.categories.map((category, index) => (
            <CompanyCategoryCollection
              key={Object.keys(category) + index}
              showLogs={true}
              showSubCategories={showSubCats}
              categoryInfo={category}
              categoryIndex={index}
              categoriesLength={fieldsData.categories.length}
              editCatOnlyCallback={HandleCatOnlyEdit}
              deleteCatOnlyCallback={HandleCatOnlyDelete}
              editCatCollectionCallback={HandleCatCollectionEdit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyUploadCard_Categories;
