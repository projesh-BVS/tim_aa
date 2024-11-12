import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { useState, useEffect } from "react";
import ProductUploadFormListboxMulti from "./SubComps/ProductUploadFormListboxMulti";

const ProductUploadCard_About = ({
  companyList,
  handleChange,
  handleDropdown,
  fieldsData = null,
  callback_hasExceededProductLimit = null,
}) => {
  var formattedCompanyList = GetFormattedCompanies(companyList);
  const [hasExceededProductLimit, setHasExceededProductLimit] = useState(false);

  const [currSelectedCompany, setCurrSelectedCompany] = useState(
    fieldsData === null ||
      fieldsData.companyID === null ||
      fieldsData.companyID === ""
      ? formattedCompanyList[0]
      : formattedCompanyList[
          GetDataCompanyIndex(formattedCompanyList, fieldsData.companyID)
        ]
  );

  var formattedCategoryList = GetFormattedCategories(currSelectedCompany);
  var formattedOutletList = GetFormattedOutlets(currSelectedCompany);
  console.log("OUTLET LIST: " + JSON.stringify(formattedOutletList));

  const [currSelectedCategory, setCurrSelectedCategory] = useState(
    fieldsData === null
      ? formattedCategoryList[0]
      : formattedCategoryList[
          GetDataCategoryIndex(formattedCategoryList, fieldsData.category)
        ]
  );

  const [currSelectedOutlet, setCurrSelectedOutlet] = useState(
    GetDataOutletSelectedArray(
      formattedOutletList,
      fieldsData === null ||
        fieldsData.outletIDs === null ||
        fieldsData.outletIDs === ""
        ? ""
        : fieldsData.outletIDs
    )
  );

  function HandleProductLimitCalc() {
    if(!callback_hasExceededProductLimit) return;
    console.log("Product Limit: " + currSelectedCompany.apiVal.productLimitLeft);
    setHasExceededProductLimit(currSelectedCompany.apiVal.productLimitLeft <= 0);
  }

  useEffect(() => {
    if(callback_hasExceededProductLimit) callback_hasExceededProductLimit(hasExceededProductLimit);
  }, [hasExceededProductLimit])

  useEffect(() => {
    HandleProductLimitCalc();
    handleDropdown("companyID", currSelectedCompany.id);
  }, [currSelectedCompany]);

  useEffect(() => {
    handleDropdown("category", currSelectedCategory.display);
  }, [currSelectedCategory]);

  useEffect(() => {
    let outletIDsArray = [];
    for (let i = 0; i < currSelectedOutlet.length; i++) {
      outletIDsArray.push(currSelectedOutlet[i].id);
    }
    handleDropdown("outletIDs", outletIDsArray);
  }, [currSelectedOutlet]);

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>About Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-4 h-auto gap-4 w-full">
        {/* Company Dropdown */}
        <ProductUploadFormListbox
          labelText="Company"
          optionsArray={formattedCompanyList}
          onOptionSelect={setCurrSelectedCompany}
          initialSelected={currSelectedCompany}
          isDisabled={false}
        />

        {/* Outlet Dropdown */}
        <ProductUploadFormListboxMulti
          labelText="Outlets"
          optionsArray={formattedOutletList}
          onOptionSelect={setCurrSelectedOutlet}
          initialSelected={currSelectedOutlet}
          isDependant={true}
          isMultiSelect={true}
          isDisabled={hasExceededProductLimit}
        />

        {/* Category Dropdown */}
        <ProductUploadFormListbox
          labelText="Category"
          optionsArray={formattedCategoryList}
          onOptionSelect={setCurrSelectedCategory}
          initialSelected={currSelectedCategory}
          isDependant={true}
          isDisabled={hasExceededProductLimit}
        />

        <ProductUploadFormField
          fieldID="productSKU"
          fieldName="productSKU"
          fieldType="text"
          fieldLabel="Product SKU"
          fieldValue={
            fieldsData === null
              ? ""
              : fieldsData.productSKU
              ? fieldsData.productSKU
              : null
          }
          handleChange={handleChange}
          isDisabled={hasExceededProductLimit}
        />

        <div className="col-span-full">
          <ProductUploadFormField
            fieldID="productName"
            fieldName="productName"
            fieldType="text"
            fieldLabel="Product Name"
            fieldValue={fieldsData === null ? "" : fieldsData.productName}
            handleChange={handleChange}
            isDisabled={hasExceededProductLimit}
          />
        </div>

        <div className="col-span-full">
          <ProductUploadFormField
            fieldID="productDescription"
            fieldName="description"
            fieldType="text"
            fieldLabel="Product Description"
            multiline={true}
            fieldValue={fieldsData === null ? "" : fieldsData.description}
            handleChange={handleChange}
            isDisabled={hasExceededProductLimit}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductUploadCard_About;

export function GetFormattedCompanies(companyList) {
  var formattedCompanies = [];

  formattedCompanies = companyList.map((company) => ({
    id: company.companyID,
    display: company.companyName,
    apiVal: company,
  }));

  return formattedCompanies;
}

export function GetFormattedCategories(company, doLog = false) {
  const defaultCat = {
    id: company.apiVal.companyID.toString() + "All",
    display: "Not Defined",
    apiVal: ["None"],
  };
  var formattedCategories = [];
  formattedCategories.length = 0;
  var companyID = company.apiVal.companyID;
  formattedCategories = company.apiVal.categories.map((category, index) => ({
    id: companyID.toString() + index.toString(),
    display: Object.keys(category).toString(),
    apiVal: category,
  }));

  formattedCategories.splice(0, 0, defaultCat);

  if (doLog) {
    console.log(
      "---------GetFormattedCategory(" + company.display + ")-------"
    );
    for (let i = 0; i < formattedCategories.length; i++) {
      console.log("Index: " + i + " | " + formattedCategories[i].display);
    }
    console.log("---------END FOR-------");
  }

  return formattedCategories;
}

export function GetFormattedOutlets(company, doLog = false) {
  var formattedOutlets = [];
  formattedOutlets.length = 0;

  formattedOutlets = company.apiVal.outletList.map((outlet, index) => ({
    id: outlet.outletID,
    display: outlet.outletName,
    apiVal: outlet,
  }));

  return formattedOutlets;
}

export function GetDataCompanyIndex(formattedCompanyArray, dataCompanyID) {
  for (let index = 0; index < formattedCompanyArray.length; index++) {
    if (formattedCompanyArray[index].id === dataCompanyID) {
      return index;
    }
  }
  return null;
}

export function GetDataCategoryIndex(formatttedCategoryArray, category) {
  for (let index = 0; index < formatttedCategoryArray.length; index++) {
    console.log(
      "Checking Index: " +
        index +
        " | formatttedCategoryArray[index]: " +
        formatttedCategoryArray[index].display +
        " look for " +
        category
    );
    if (formatttedCategoryArray[index].display === category) {
      console.log("Data Returning index: " + index);
      return index;
    }
  }
  return 0;
}

export function GetDataOutletSelectedArray(
  formattedOutletsArray,
  productOutletIDs
) {
  console.log("PRODUCT OUTLET IDS - " + JSON.stringify(productOutletIDs));
  let dataSelectedArray = [];
  dataSelectedArray.length = 0;

  for (let index = 0; index < formattedOutletsArray.length; index++) {
    for (
      let productOutletIndex = 0;
      productOutletIndex < productOutletIDs.length;
      productOutletIndex++
    ) {
      console.log(
        "Checking Index: " +
          index +
          " | formattedOutletArray[index]: " +
          formattedOutletsArray[index].id +
          " look for " +
          productOutletIDs[productOutletIndex]
      );
      if (
        formattedOutletsArray[index].id === productOutletIDs[productOutletIndex]
      ) {
        dataSelectedArray.push(formattedOutletsArray[index]);
      }
    }
  }

  console.log("Current Selected Outlets Length - " + dataSelectedArray.length);
  if (dataSelectedArray.length > 0) return dataSelectedArray;
  else return formattedOutletsArray;
}
