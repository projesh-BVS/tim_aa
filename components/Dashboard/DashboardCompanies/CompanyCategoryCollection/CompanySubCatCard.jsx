import {
  ArrowSmallRightIcon,
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import CompanyUploadFormField from "../SubComps/CompanyUploadFormField";

const CompanySubCatCard = ({
  showLogs = false,
  subCatName,
  subCatIndex,
  showSeperator = false,
  editSubCatCallback,
  deleteSubCatCallback,
}) => {
  const [subCatNameEditted, setSubCatNameEditted] = useState(subCatName);
  const [IsEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    setSubCatNameEditted(subCatName);
  }, [subCatName]);

  const OnEditModeOpenBtnClicked = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  const OnEditModeSaveBtnClicked = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    editSubCatCallback(subCatNameEditted, subCatIndex);
  };

  const HandleFieldChange = (e) => {
    Log(
      "Handling Field Change: " + e.target.name + ": " + e.target.value,
      showLogs
    );
    setSubCatNameEditted(e.target.value);
  };

  return (
    <section
      className={`${
        showSeperator ? "border-b-2" : ""
      } flex items-center justify-center p-2 w-full`}
    >
      <section className="relative flex gap-4 w-full items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          {/*Sub Category Icon*/}
          <div className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm whitespace-nowrap transition-all">
            <ArrowSmallRightIcon className="h-5 w-5" />
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
              fieldID="subCategory"
              fieldName="subCategory"
              fieldType="text"
              fieldLabel="Sub Category Name"
              fieldValue={subCatNameEditted}
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
                subCatNameEditted == subCatName ? "" : "italic"
              } font-semibold text-md`}
            >
              {subCatNameEditted}
              {subCatNameEditted != subCatName && (
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
              : "-translate-x-36 opacity-0"
          } absolute right-0 flex items-center justify-center gap-2 transition-all ease-in-out`}
        >
          {/*Save Edit Button*/}
          <button
            className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-green-400 hover:bg-green-500 hover:shadow-md whitespace-nowrap transition-all"
            onClick={OnEditModeSaveBtnClicked}
          >
            <CheckIcon className="h-5 w-5" />
          </button>
        </div>

        {/*Primary Buttons*/}
        <div
          className={`${
            IsEditMode
              ? "translate-x-36 opacity-0"
              : "translate-x-0 opacity-100"
          } relative flex items-center justify-center gap-2 transition-all ease-in-out`}
        >
          {/*Edit Sub Category Button*/}
          <button
            className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-yellow-400 hover:bg-yellow-500 hover:shadow-md whitespace-nowrap transition-all"
            onClick={OnEditModeOpenBtnClicked}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>

          {/*Delete Sub Category Button*/}
          <button
            className="flex items-center justify-center p-2 rounded-lg h-[2.5rem] w-[2.5rem] text-sm text-white bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap transition-all"
            //onClick={() => deleteOutletCallback(outletInfo, companyName)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </section>
    </section>
  );
};

export default CompanySubCatCard;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
