"use client";
import { useState, useEffect } from "react";
import { CubeIcon } from "@heroicons/react/24/solid";
import {
  GetDataBodyPos,
  GetDataSizeIndex,
  getBodyPositions,
  getSizeUnits,
  getSizeUnitsAPIVals,
} from "@/utils/productUnitsUtils";
import ProductUploadFormListboxMulti from "./SubComps/ProductUploadFormListboxMulti";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";

const sizeUnits = getSizeUnits();
const sizeUnitApiVals = getSizeUnitsAPIVals();
const bodyPositions = getBodyPositions();

const ProductUploadCard_Sizes = ({
  handleChange,
  handleDropdown,
  fieldsData = null,
}) => {
  const [selectedSizeUnit, setSelectedSizeUnit] = useState(
    fieldsData === null ||
      fieldsData.productSizes === null ||
      fieldsData.productSizes === ""
      ? sizeUnits
      : GetDataSizeIndex(fieldsData.productSizes)
  );

  const [selectedBodyPos, setSelectedBodyPos] = useState(
    fieldsData === null ||
      fieldsData.bodyPos === null ||
      fieldsData.bodyPos === ""
      ? getBodyPositions()[0]
      : bodyPositions[GetDataBodyPos(fieldsData.bodyPos)]
  );

  useEffect(() => {
    let sizeUnitsArray = [];
    for (let i = 0; i < selectedSizeUnit.length; i++) {
      sizeUnitsArray.push(selectedSizeUnit[i].apiVal);
    }
    handleDropdown("productSizes", sizeUnitsArray);
  }, [selectedSizeUnit]);

  useEffect(() => {
    handleDropdown("bodyPos", selectedBodyPos.apiVal);
  }, [selectedBodyPos]);

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="flex w-full items-center gap-4 px-4 rounded-t-2xl py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <CubeIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>Product Sizes</h1>
      </div>
      <div className="grid grid-cols-1 p-2 lg:p-4 h-auto gap-4 w-full">
        <div className="col-span-full">
          <ProductUploadFormListbox
            labelText="Body Position"
            optionsArray={bodyPositions}
            onOptionSelect={setSelectedBodyPos}
            initialSelected={selectedBodyPos}
          />
        </div>
        <div className="col-span-full">
          <ProductUploadFormListboxMulti
            labelText="Available Sizes"
            optionsArray={sizeUnits}
            onOptionSelect={setSelectedSizeUnit}
            initialSelected={selectedSizeUnit}
            msg_NotSelected="No Sizes Specified"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductUploadCard_Sizes;
