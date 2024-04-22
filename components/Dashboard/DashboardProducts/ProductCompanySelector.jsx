import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

function ProductCompanySelector({ companies, selectedCompany, onChange }) {
  return (
    <section className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-auto">
      {/*<div className="font-semibold text-lg text-gray-500">
        <h1>Company</h1>
      </div>*/}
      <div className="relative font-semibold text-white h-full w-full">
        <select
          className="px-4 py-2 pr-12 rounded-lg bg-tif-blue hover:bg-tif-lavender hover:shadow-md h-full w-full transition-all"
          value={selectedCompany}
          onChange={(e) => {
            const value =
              e.target.value === "-1" ? -1 : parseInt(e.target.value);
            onChange(value);
          }}
        >
          <option value={-1} className="bg-white text-gray-500">
            All Companies
          </option>
          {companies.map((company) => (
            <option
              key={company.companyID}
              value={company.companyID}
              className="bg-white text-gray-500"
            >
              {company.companyName}
            </option>
          ))}
        </select>
        {/*selectedCompany === -1 && (
          <div className="absolute right-6 top-1.5 w-6 h-6">
            <BuildingStorefrontIcon className="w-full h-full text-white" />
          </div>
        )}
        {selectedCompany !== -1 && (
          <div className="absolute right-6 top-1.5 w-6 h-6">
            {companies.find((company) => company.companyID === selectedCompany)
              ?.companyLogo && (
              <Image
                src={
                  companies.find((company) => company.companyID === selectedCompany)
                    ?.companyLogo
                }
                alt="Selected Company Logo"
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

export default ProductCompanySelector;
