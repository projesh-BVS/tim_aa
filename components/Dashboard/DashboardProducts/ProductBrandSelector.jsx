import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

function ProductBrandSelector({ brands, selectedBrand, onChange }) {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      {/*<div className="font-semibold text-lg text-gray-500">
        <h1>Brand</h1>
      </div>*/}
      <div className="relative font-semibold text-white h-full w-full">
        <select
          className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
          value={selectedBrand}
          onChange={(e) => {
            const value =
              e.target.value === "-1" ? -1 : parseInt(e.target.value);
            onChange(value);
          }}
        >
          <option value={-1} className="bg-white text-gray-500">
            All Companies
          </option>
          {brands.map((brand) => (
            <option
              key={brand.brandID}
              value={brand.brandID}
              className="bg-white text-gray-500"
            >
              {brand.brandName}
            </option>
          ))}
        </select>
        {/*selectedBrand === -1 && (
          <div className="absolute right-6 top-1.5 w-6 h-6">
            <BuildingStorefrontIcon className="w-full h-full text-white" />
          </div>
        )}
        {selectedBrand !== -1 && (
          <div className="absolute right-6 top-1.5 w-6 h-6">
            {brands.find((brand) => brand.brandID === selectedBrand)
              ?.brandLogo && (
              <Image
                src={
                  brands.find((brand) => brand.brandID === selectedBrand)
                    ?.brandLogo
                }
                alt="Selected Brand Logo"
                width={24}
                height={24}
              />
            )}
          </div>
            )*/}
      </div>
    </section>
  );
}

export default ProductBrandSelector;
