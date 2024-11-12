"use client";
import { useState, useEffect } from "react";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import {
  GetDataCurrencyIndex,
  getCurrencyUnits,
} from "@/utils/productUnitsUtils";
import { TagIcon } from "@heroicons/react/24/solid";

const currencyUnits = getCurrencyUnits();

const ProductUploadCard_Pricing = ({
  handleChange,
  handleDropdown,
  fieldsData = null,
  hasExceededProductLimit,
}) => {
  const [selectedCurrUnit, setSelectedCurrUnit] = useState(
    fieldsData === null ||
      fieldsData.currency === null ||
      fieldsData.currency === ""
      ? currencyUnits[0]
      : currencyUnits[GetDataCurrencyIndex(fieldsData.currency)]
  );

  useEffect(() => {
    handleDropdown("currency", selectedCurrUnit.apiVal);
  }, [selectedCurrUnit]);

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl rounded-t-2xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <TagIcon className="h-5 w-5 lg:h-6 lg:w-6" />
        <h1>Product Pricing</h1>
      </div>
      <div className="grid grid-cols-5 p-2 lg:p-4 h-auto gap-4 w-full">
        <div className="col-span-full xl:col-span-1">
          <ProductUploadFormListbox
            labelText="Currency"
            optionsArray={currencyUnits}
            onOptionSelect={setSelectedCurrUnit}
            initialSelected={selectedCurrUnit}
            showBelow={false}
            isDisabled={hasExceededProductLimit}
          />
        </div>
        <div className="col-span-full xl:col-span-3">
          <ProductUploadFormField
            fieldID="productPrice"
            fieldName="price"
            fieldType="number"
            fieldLabel="Price"
            fieldValue={fieldsData === null ? "" : fieldsData.price}
            handleChange={handleChange}
            isDisabled={hasExceededProductLimit}
          />
        </div>
        <div className="col-span-full xl:col-span-1">
          <ProductUploadFormField
            fieldID="discountPercent"
            fieldName="discountPercent"
            fieldType="number"
            fieldLabel="Discount %"
            fieldValue={fieldsData === null ? "" : fieldsData.discountPercent}
            handleChange={handleChange}
            isDisabled={hasExceededProductLimit}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductUploadCard_Pricing;

/*export function GetDataCurrencyIndex(formattedCurrencyArray, dataCurrencyApiVal) {
  console.log(
    "GetDataCurrencyIndex() -> dataCurrencyApiVal: " + dataCurrencyApiVal
  );
  for (let index = 0; index < formattedCurrencyArray.length; index++) {
    console.log(
      "Checking Index: " +
        index +
        " | formattedCurrencyArray[index]: " +
        formattedCurrencyArray[index].apiVal
    );
    if (formattedCurrencyArray[index].apiVal === dataCurrencyApiVal) {
      console.log("Data Returning index: " + index);
      return index;
    }
  }
  return null;
}*/
