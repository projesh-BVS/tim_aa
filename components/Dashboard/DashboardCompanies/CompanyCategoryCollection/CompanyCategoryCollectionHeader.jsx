import {
  CheckIcon,
  ListBulletIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import CompanyUploadFormField from "../SubComps/CompanyUploadFormField";

const CompanyCategoryCollectionHeader = ({
  showLogs = false,
  showSubCats = false,
  categoryName,
  categoryIndex,
  editCategoryCallback,
  deleteCategoryCallback,
}) => {
  const [categoryNameEditted, setCategoryNameEditted] = useState(categoryName);
  const [IsEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    setCategoryNameEditted(categoryName);
  }, [categoryName]);

  const OnEditModeOpenBtnClicked = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  const OnEditModeSaveBtnClicked = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    editCategoryCallback(Object.values(categoryName)[0], categoryNameEditted);
  };

  const OnEditModeCancelBtnClicked = (e) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  const HandleFieldChange = (e) => {
    Log(
      "Handling Field Change: " + e.target.name + ": " + e.target.value,
      showLogs
    );
    setCategoryNameEditted(e.target.value);
  };

  const OnDeleteBtnClicked = (e) => {
    e.preventDefault();
    deleteCategoryCallback(Object.values(categoryName)[0]);
  };

  return (
    <section
      className={`relative flex p-2 gap-2 items-center justify-between w-full border-b-2 border-tif-blue shadow-md ${
        showSubCats ? "border-b-2 border-tif-blue" : "border-none"
      }`}
    >
      <div className="relative flex items-center justify-center gap-4">
        {/*Category Icon*/}
        <div
          className={`${
            IsEditMode
              ? "translate-x-36 opacity-0"
              : "translate-x-0 opacity-100"
          } absolute left-0 flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-gradient-to-br from-tif-blue to-tif-pink whitespace-nowrap transition-all ease-in-out`}
        >
          <ListBulletIcon className="h-5 w-5" />
        </div>

        <div
          className={`${
            IsEditMode
              ? "translate-x-0 opacity-100"
              : "-translate-x-36 opacity-0"
          } absolute left-0 flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-gradient-to-br from-tif-blue to-tif-pink whitespace-nowrap transition-all ease-in-out`}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </div>

        {/*Field Div*/}
        <div
          className={`${
            IsEditMode
              ? "translate-x-0 opacity-100"
              : "-translate-x-36 opacity-0"
          } absolute left-14 w-64 md:w-96 transition-all ease-in-out`}
        >
          <CompanyUploadFormField
            fieldID="category"
            fieldName="category"
            fieldType="text"
            fieldLabel="Category Name"
            fieldValue={categoryNameEditted}
            miniField={true}
            handleChange={HandleFieldChange}
          />
        </div>

        {/*Name Div*/}
        <div
          className={`${
            IsEditMode
              ? "translate-x-36 opacity-0 -z-10"
              : "translate-x-0 opacity-100 z-0"
          } absolute left-14 w-52 md:w-96 transition-all ease-in-out`}
        >
          <h1
            className={`${
              categoryNameEditted == categoryName ? "" : "italic"
            } font-semibold text-md`}
          >
            {categoryNameEditted}
            {categoryNameEditted != categoryName && (
              <span className="text-red-500">*</span>
            )}
          </h1>
        </div>
      </div>

      {/*Edit Mode Buttons*/}
      <div
        className={`${
          IsEditMode
            ? "translate-x-0 opacity-100"
            : "-translate-x-36 opacity-0 pointer-events-none"
        } absolute right-2 flex items-center justify-center gap-2 transition-all ease-in-out`}
      >
        {/*Save Edit Button*/}
        <button
          className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-green-400 hover:bg-green-500 hover:shadow-md whitespace-nowrap transition-all"
          onClick={OnEditModeSaveBtnClicked}
        >
          <CheckIcon className="h-5 w-5" />
        </button>

        {/*Cancel Edit Button*/}
        <button
          className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap transition-all"
          onClick={OnEditModeCancelBtnClicked}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/*Primary Buttons*/}
      <div
        className={`${
          IsEditMode ? "translate-x-36 opacity-0" : "translate-x-0 opacity-100"
        } relative flex items-center justify-center gap-2 transition-all ease-in-out`}
      >
        {/*Add Sub-Category Button*/}
        {/*<button
          className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-green-400 hover:bg-green-500 hover:shadow-md whitespace-nowrap transition-all"
          //onClick={() => editOutletCallback(outletInfo, companyName)}
        >
          <PlusIcon className="h-5 w-5" />
        </button>*/}

        {/*Edit Category Button*/}
        <button
          className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-yellow-400 hover:bg-yellow-500 hover:shadow-md whitespace-nowrap transition-all"
          //onClick={() => editOutletCallback(outletInfo, companyName)}
          onClick={OnEditModeOpenBtnClicked}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>

        {/*Delete Category Button*/}
        <button
          className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap transition-all"
          onClick={OnDeleteBtnClicked}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default CompanyCategoryCollectionHeader;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
