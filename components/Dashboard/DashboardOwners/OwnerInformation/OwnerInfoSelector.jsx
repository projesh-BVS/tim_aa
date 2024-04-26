import { useState } from "react";
import OwnerSearchSelector from "../OwnerSearch/OwnerSearchSelector";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  OwnerCompanySelector,
  OwnerOutletSelector,
} from "../OwnerFilter/OwnerFilterSelector";

const OwnerInfoSelector = ({ infoTabs, callback_OnTabChange }) => {
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
            className={`flex items-center justify-center w-full h-10 md:h-12 gap-2 md:gap-4 px-2 font-normal disabled:font-semibold text-white disabled:text-tif-blue bg-tif-blue hover:bg-tif-lavender disabled:bg-white transition-all
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
      <div
        className={`${
          infoTabs[selectedTab].tabFilters == null ? "hidden" : "flex"
        } items-center justify-center p-2 md:p-4 w-full bg-white rounded-b-xl`}
      >
        {infoTabs[selectedTab].tabFilters && infoTabs[selectedTab].tabFilters}
      </div>
    </section>
  );
};

export default OwnerInfoSelector;
