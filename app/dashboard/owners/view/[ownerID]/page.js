"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import OwnerAccInfoCard from "@/components/Dashboard/DashboardOwners/OwnerInformation/OwnerAccInfoCard";
import OwnerCompanyInfoList from "@/components/Dashboard/DashboardOwners/OwnerInformation/OwnerCompanyInfoList";
import OwnerInfoSelector from "@/components/Dashboard/DashboardOwners/OwnerInformation/OwnerInfoSelector";
import OwnerProductInfoList from "@/components/Dashboard/DashboardOwners/OwnerInformation/OwnerProductInfoList";
import { useAllProducts } from "@/hooks/useAllProducts";
import useOwner from "@/hooks/useOwner";
import axios from "axios";
import {
  BuildingOffice2Icon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import OwnerCompModifyModal from "@/components/Dashboard/DashboardOwners/OwnerCompModification/OwnerCompModifyModal";

const OwnerView = ({ params }) => {
  const {
    owner,
    ownerMutate,
    isOwnerLoading,
    isOwnerError,
    isOwnerValidating,
  } = useOwner(params.ownerID, false);

  const { companies, products, isAllProductsLoading, isAllProductsError } =
    useAllProducts(params.ownerID, false);

  const [currTab, setCurrTab] = useState(0);
  const [searchQueryCompany, setSearchQueryCompany] = useState("");
  const [searchQueryProduct, setSearchQueryProduct] = useState("");
  const [filterCompanyID, setFilterCompanyID] = useState(-1);
  const [filterOutletID, setFilterOutletID] = useState(-1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const infoTabs = [
    {
      tabName: "Companies",
      tabIcon: <BuildingOffice2Icon className="w-5 h-5" />,
    },
    {
      tabName: "Products",
      tabIcon: <ShoppingBagIcon className="w-5 h-5" />,
    },
  ];

  function Callback_OnTabChange(index) {
    setSearchQueryCompany("");
    setSearchQueryProduct("");
    setFilterCompanyID(-1);
    setFilterOutletID(-1);
    setCurrTab(index);
  }

  function Callback_SearchStringCompany(searchString) {
    setSearchQueryCompany(searchString);
  }

  function Callback_SearchStringProduct(searchString) {
    setSearchQueryProduct(searchString);
  }

  function Callback_Filter_Company(id) {
    setFilterCompanyID(id);
  }

  function Callback_Filter_Outlet(id) {
    setFilterOutletID(id);
  }

  function Callback_Modal_Add_OnOpen() {
    setOpenAddModal(true);
  }

  function Callback_Modal_Add_OnClose_Normal() {
    setOpenAddModal(false);
  }

  function Callback_Modal_Add_OnClose_Notification() {
    setOpenAddModal(false);
    ownerMutate();
  }

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<UserIcon className="h-8 w-8" />}
        text={"Viewing Owner - " + params.ownerID}
        isLoading={isOwnerLoading}
        showBackBtn={true}
      />

      {isOwnerLoading ||
        (isAllProductsLoading && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
            <span className="font-semibold lg:text-xl">
              Loading Owner Information
            </span>
            <span className="font-lignt text-xs lg:text-sm">Please wait</span>
          </section>
        ))}

      {isOwnerError ||
        (isAllProductsError && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
            <span className="font-semibold lg:text-xl">
              Sorry, there was an error while loading data
            </span>
            <span className="font-lignt text-xs lg:text-sm">
              Please refresh the page if you still see an error after 30 secs
            </span>
          </section>
        ))}

      {owner &&
        products &&
        owner.ownerDetails.length > 0 &&
        !isOwnerLoading &&
        !isOwnerError &&
        !isAllProductsLoading &&
        !isAllProductsError && (
          <section className="flex flex-col px-6 gap-4 -mt-6 w-full items-center justify-center">
            <OwnerCompModifyModal
              doOpen={openAddModal}
              modalMode="Add"
              showLogs={true}
              companyInfo={{
                companyName: "",
                companyAddress: "",
                ownerID: parseInt(params.ownerID),
              }}
              callback_OnClose_Normal={Callback_Modal_Add_OnClose_Normal}
              callback_OnClose_Notification={
                Callback_Modal_Add_OnClose_Notification
              }
            />
            <OwnerAccInfoCard ownerInfo={owner.ownerDetails[0]} />
            <OwnerInfoSelector
              infoTabs={infoTabs}
              dataCompanies={owner.companyList}
              callback_OnTabChange={Callback_OnTabChange}
              callback_SearchStringCompany={Callback_SearchStringCompany}
              callback_SearchStringProduct={Callback_SearchStringProduct}
              callback_FilterCompany={Callback_Filter_Company}
              callback_FilterOutlet={Callback_Filter_Outlet}
              callback_AddCompany={Callback_Modal_Add_OnOpen}
            />
          </section>
        )}

      {owner &&
        products &&
        owner.ownerDetails.length > 0 &&
        !isOwnerLoading &&
        !isOwnerError &&
        !isAllProductsLoading &&
        !isAllProductsError && (
          <section className="relative flex flex-col px-6 pb-6 gap-4 w-full h-full items-center justify-start overflow-clip">
            <Tab tabIndex={0} selectedTabIndex={currTab}>
              <OwnerCompanyInfoList
                ownerCompanies={owner.companyList}
                searchQuery={searchQueryCompany}
              />
            </Tab>

            <Tab tabIndex={1} selectedTabIndex={currTab}>
              <OwnerProductInfoList
                productList={products}
                searchQuery={searchQueryProduct}
                filterCompanyID={filterCompanyID}
                filterOutletID={filterOutletID}
              />
            </Tab>
          </section>
        )}
    </main>
  );
};

export default OwnerView;

const Tab = ({ tabIndex, selectedTabIndex, children }) => {
  let xPos = (tabIndex - selectedTabIndex) * 110;

  return (
    <div
      className="absolute flex w-full px-6 pb-6 h-full items-start justify-center overflow-y-auto transition-all duration-300 ease-out-spring"
      style={{
        transform: `translateX(${xPos}%)`,
      }}
    >
      {children}
    </div>
  );
};
