import { useState } from "react";
import OwnerSearchSelector from "../OwnerSearch/OwnerSearchSelector";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  OwnerCompanySelector,
  OwnerOutletSelector,
} from "../OwnerFilter/OwnerFilterSelector";

const OwnerInfoSelector = ({
  infoTabs,
  dataCompanies,
  callback_OnTabChange,
  callback_SearchStringCompany,
  callback_SearchStringProduct,
  callback_FilterCompany,
  callback_FilterOutlet,
  callback_AddCompany,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (selectedIndex) => {
    setSelectedTab(selectedIndex);
    callback_OnTabChange(selectedIndex);
  };

  {
    /*return (
    <section className="flex items-center justify-center w-full h-12 gap-4 md:gap-6">
      {infoTabs.map((tab, index) => (
        <button
          disabled={index == selectedTab}
          className={`flex items-center justify-center w-full h-full gap-4 rounded-lg text-white bg-tif-blue hover:bg-tif-lavender disabled:bg-tif-blue/40 transition-all
          }`}
          onClick={() => handleTabSelect(index)}
          key={"OwnerInfoTab" + index}
        >
          {tab.tabIcon}
          {tab.tabName}
        </button>
      ))}
    </section>
  );*/
  }

  return (
    <section className="flex flex-col items-center justify-center w-full rounded-xl shadow-lg overflow-clip">
      {/* Tab Buttons */}
      <div className="flex items-center justify-center w-full">
        {infoTabs.map((tab, index) => (
          <button
            disabled={index == selectedTab}
            className={`flex items-center justify-center w-full h-10 md:h-12 gap-4 font-normal disabled:font-semibold text-white disabled:text-tif-blue bg-tif-blue hover:bg-tif-lavender disabled:bg-white transition-all
          }`}
            onClick={() => handleTabSelect(index)}
            key={"OwnerInfoTab" + index}
          >
            {tab.tabIcon}
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-center p-2 md:p-4 w-full bg-white rounded-b-xl">
        {infoTabs[selectedTab].tabName == "Companies" && (
          <FiltersOwnerCompanies
            callback_Search={callback_SearchStringCompany}
            callback_AddCompany={callback_AddCompany}
          />
        )}

        {infoTabs[selectedTab].tabName == "Products" && (
          <FiltersOwnerProducts
            companyData={dataCompanies}
            callback_Search={callback_SearchStringProduct}
            callback_FilterCompany={callback_FilterCompany}
            callback_FilterOutlet={callback_FilterOutlet}
          />
        )}
      </div>
    </section>
  );
};

export default OwnerInfoSelector;

const FiltersOwnerCompanies = ({ callback_Search, callback_AddCompany }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
      <OwnerSearchSelector
        isAutoSearch={true}
        fieldID={"owner-company-search"}
        fieldName={"OwnerCompanySearch"}
        fieldType={"text"}
        fieldLabel={"Company Name"}
        callback_SearchString={callback_Search}
      />

      <div className="w-full md:w-auto">
        <button
          disabled={false}
          onClick={callback_AddCompany}
          className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white disabled:pointer-events-none disabled:bg-tif-blue/40 bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all"
        >
          <PlusIcon className="h-6 w-6" />
          <h1 className="font-semibold text-md">Add Company</h1>
        </button>
      </div>
    </div>
  );
};

const FiltersOwnerProducts = ({
  companyData,
  callback_Search,
  callback_FilterCompany,
  callback_FilterOutlet,
}) => {
  const [selectedCompany, setSeletedCompany] = useState(-1);
  const [selectedOutlet, setSelectedOutlet] = useState(-1);
  const [outletData, setOutletData] = useState(GenerateOutletData(-1));

  function GenerateOutletData(companyID) {
    if (companyID == -1) {
      return null;
    } else {
      for (let i = 0; i < companyData.length; i++) {
        if (companyData[i].companyID == companyID) {
          return [...companyData[i].outletList];
        }
      }
    }
  }

  function HandleChange_Company(companyID) {
    setSeletedCompany(companyID);
    setOutletData(GenerateOutletData(companyID));
    callback_FilterCompany(companyID);
  }

  function HandleChange_Outlet(outletID) {
    setSelectedOutlet(outletID);
    callback_FilterOutlet(outletID);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
      <OwnerSearchSelector
        isAutoSearch={true}
        fieldID={"owner-product-search"}
        fieldName={"OwnerProductSearch"}
        fieldType={"text"}
        fieldLabel={"Product Name"}
        callback_SearchString={callback_Search}
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:w-auto">
        <OwnerCompanySelector
          companies={companyData}
          selectedCompany={selectedCompany}
          callback_OnChange={HandleChange_Company}
        />

        <OwnerOutletSelector
          outlets={outletData}
          selectedOutlet={selectedOutlet}
          callback_OnChange={HandleChange_Outlet}
        />
      </div>
    </div>
  );
};
