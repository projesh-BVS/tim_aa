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
  InformationCircleIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import OwnerCompModifyModal from "@/components/Dashboard/DashboardOwners/OwnerCompModification/OwnerCompModifyModal";
import OwnerSearchSelector from "@/components/Dashboard/DashboardOwners/OwnerSearch/OwnerSearchSelector";
import {
  OwnerCompanySelector,
  OwnerOutletSelector,
} from "@/components/Dashboard/DashboardOwners/OwnerFilter/OwnerFilterSelector";

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
  const [ownerCompanies, setOwnerCompanies] = useState("");
  const [searchQueryCompany, setSearchQueryCompany] = useState("");
  const [searchQueryProduct, setSearchQueryProduct] = useState("");
  const [filterCompanyID, setFilterCompanyID] = useState(-1);
  const [filterOutletID, setFilterOutletID] = useState(-1);
  const [selectedEditCompany, setSelectedEditCompany] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const infoTabs = [
    {
      tabName: "About",
      tabIcon: <InformationCircleIcon className="w-5 h-5" />,
      tabFilters: null,
    },
    {
      tabName: "Companies",
      tabIcon: <BuildingOffice2Icon className="w-5 h-5" />,
      tabFilters: (
        <FiltersOwnerCompanies
          callback_Search={Callback_SearchStringCompany}
          callback_AddCompany={Callback_Modal_Add_OnOpen}
        />
      ),
    },
    {
      tabName: "Products",
      tabIcon: <ShoppingBagIcon className="w-5 h-5" />,
      tabFilters: (
        <FiltersOwnerProducts
          //companyData={owner.companyList}
          companyData={ownerCompanies}
          callback_Search={Callback_SearchStringProduct}
          callback_FilterCompany={Callback_Filter_Company}
          callback_FilterOutlet={Callback_Filter_Outlet}
        />
      ),
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
    Callback_OnTabChange(0);
  }

  function Callback_Modal_Edit_OnOpen(currCompany) {
    setSelectedEditCompany(currCompany);
    setOpenEditModal(true);
  }

  function Callback_Modal_Edit_OnClose_Normal() {
    setOpenEditModal(false);
  }

  function Callback_Modal_Edit_OnClose_Notification() {
    setOpenEditModal(false);
    ownerMutate();
    Callback_OnTabChange(0);
  }

  useEffect(() => {
    if (owner) {
      setOwnerCompanies(owner.companyList);
    }
  }, [owner]);

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

            <OwnerCompModifyModal
              doOpen={openEditModal}
              modalMode="Edit"
              showLogs={true}
              companyInfo={selectedEditCompany}
              callback_OnClose_Normal={Callback_Modal_Edit_OnClose_Normal}
              callback_OnClose_Notification={
                Callback_Modal_Edit_OnClose_Notification
              }
            />

            <OwnerInfoSelector
              infoTabs={infoTabs}
              callback_OnTabChange={Callback_OnTabChange}
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
              <OwnerAccInfoCard ownerInfo={owner.ownerDetails[0]} />
            </Tab>

            <Tab tabIndex={1} selectedTabIndex={currTab}>
              <OwnerCompanyInfoList
                ownerCompanies={owner.companyList}
                searchQuery={searchQueryCompany}
                callback_Company_Edit={Callback_Modal_Edit_OnOpen}
              />
            </Tab>

            <Tab tabIndex={2} selectedTabIndex={currTab}>
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
    HandleChange_Outlet(-1);
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
