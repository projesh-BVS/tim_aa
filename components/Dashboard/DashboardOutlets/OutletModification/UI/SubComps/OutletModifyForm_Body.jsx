import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import OutletUploadFormField from "../../../SubComps/OutletUploadFormField";
import OutletUploadFormListbox from "../../../SubComps/OutletUploadFormListbox";
import { useEffect, useState } from "react";

const OutletModifyForm_Body = ({
  formMode,
  outletInfo,
  companyList,
  comapnySelectedInitialID,
  onFieldChangeCallback,
}) => {
  var formattedCompanyList = companyList
    ? GetFormattedCompanyList(companyList)
    : null;

  var [indexSelectedCompany, useIndexSelectedCompany] = useState(null);

  useEffect(() => {
    if (formattedCompanyList != null) {
      useIndexSelectedCompany(
        GetCompanyIndex(formattedCompanyList, comapnySelectedInitialID)
      );
    }
  }, [formattedCompanyList]);

  const OnFieldChange = (e) => {
    onFieldChangeCallback(e);
  };

  const OnListboxChange = (option) => {
    let target = { name: "", value: "" };
    let e = { target };

    e.target.name = "companyID";
    e.target.value = option.apiVal.companyID;

    onFieldChangeCallback(e);
  };

  return (
    <div className="flex flex-col px-4 pt-2 gap-6 w-full">
      {formMode == "Add" && companyList && (
        <div className="flex items-center justify-center gap-4 w-full">
          <BuildingOffice2Icon className="text-tif-blue h-6 w-6" />

          <OutletUploadFormListbox
            labelText="Company"
            optionsArray={formattedCompanyList}
            initialSelectedIndex={indexSelectedCompany}
            onOptionSelect={OnListboxChange}
          />
        </div>
      )}

      {formMode != "Delete" && (
        <div className="flex items-center justify-center gap-4 w-full">
          <BuildingStorefrontIcon className="text-tif-blue h-6 w-6" />

          <OutletUploadFormField
            fieldID="outletName"
            fieldName="outletName"
            fieldType="text"
            fieldLabel="Outlet Name"
            fieldValue={outletInfo != null ? outletInfo.outletName : null}
            handleChange={OnFieldChange}
          />
        </div>
      )}

      {formMode != "Delete" && (
        <div className="flex items-center justify-center gap-4 w-full">
          <MapPinIcon className="text-tif-blue h-6 w-6" />

          <OutletUploadFormField
            fieldID="outletAddress"
            fieldName="outletAddress"
            fieldType="text"
            fieldLabel="Outlet Address"
            fieldValue={outletInfo != null ? outletInfo.outletAddress : null}
            handleChange={OnFieldChange}
          />
        </div>
      )}

      {formMode == "Delete" && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <ExclamationTriangleIcon className="text-red-500 h-12 w-12" />

          <p className="text-center text-base font-normal italic w-full">
            Are you sure you want to delete outlet{" "}
            <span className="not-italic text-lg font-semibold text-red-500">
              {outletInfo.outletName}
            </span>{" "}
            ?
          </p>
        </div>
      )}
    </div>
  );
};

export default OutletModifyForm_Body;

function GetFormattedCompanyList(companyList) {
  var formattedCompanyList = [];

  formattedCompanyList = companyList.map((company) => ({
    id: company.companyID,
    display: company.companyName,
    apiVal: company,
  }));

  return formattedCompanyList;
}

function GetCompanyIndex(formattedCompanyArray, companyID) {
  for (let index = 0; index < formattedCompanyArray.length; index++) {
    if (formattedCompanyArray[index].id === companyID) {
      return index;
    }
  }
  return null;
}
