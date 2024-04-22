"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import OutletCollection from "@/components/Dashboard/DashboardOutlets/OutletCollection/OutletCollection";
import OutletCompanySelector from "@/components/Dashboard/DashboardOutlets/OutletCompanySelector";
import useOwner from "@/hooks/useOwner";
import { BuildingStorefrontIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import OutletModifyModal from "@/components/Dashboard/DashboardOutlets/OutletModification/OutletModifyModal";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Outlets() {
  //const { data: session } = useSession();
  const searchParams = useSearchParams();
  const outletFilterQuery = searchParams.get("outletCompany");
  const initialOutletFilter = outletFilterQuery
    ? parseInt(outletFilterQuery)
    : -1; //Use -1 for "All"

  const {
    owner,
    ownerMutate,
    isOwnerLoading,
    isOwnerError,
    isOwnerValidating,
  } = useOwner(/*session.user.ownerID*/);
  const [selectedCompany, setSelectedCompany] = useState(initialOutletFilter);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [selectedOutletCompany, setSelectedOutletCompany] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function Callback_Modal_Add_OnOpen() {
    console.log(
      "AddOutletCallback called | Sending company index: " +
        selectedOutletCompany
    );
    setOpenAddModal(true);
  }

  function Callback_Modal_Add_OnClose_Normal() {
    setOpenAddModal(false);
  }

  function Callback_Modal_Add_OnClose_Notification() {
    setOpenAddModal(false);
    ownerMutate();
  }

  function Callback_Modal_Edit_OnOpen(outletInfo, companyName) {
    console.log(
      "EditOutletCallback on page called with outletInfo - " +
        JSON.stringify(outletInfo) +
        " | Of company - " +
        companyName
    );
    setSelectedOutlet(outletInfo);
    setSelectedOutletCompany(companyName);
    setOpenEditModal(true);
  }

  function Callback_Modal_Edit_OnClose_Normal() {
    setOpenEditModal(false);
  }

  function Callback_Modal_Edit_OnClose_Notification() {
    setOpenEditModal(false);
    ownerMutate();
  }

  function Callback_Modal_Delete_OnOpen(outletInfo, companyName) {
    console.log(
      "DeleteOutletCallback on page called with outletInfo - " +
        JSON.stringify(outletInfo) +
        " | Of company - " +
        companyName
    );
    setSelectedOutlet(outletInfo);
    setSelectedOutletCompany(companyName);
    setOpenDeleteModal(true);
  }

  function Callback_Modal_Delete_OnClose_Normal() {
    setOpenDeleteModal(false);
  }

  function Callback_Modal_Delete_OnClose_Notification() {
    setOpenDeleteModal(false);
    ownerMutate();
  }

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<BuildingStorefrontIcon className="h-8 w-8" />}
        text="Outlets"
        isLoading={isOwnerLoading}
        showBackBtn={true}
      />

      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Outlets</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isOwnerError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <section className="flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <OutletModifyModal
            doOpen={openAddModal}
            modalMode="Add"
            showLogs={true}
            outletInfo={null}
            companyName={null}
            companySelectedID={selectedCompany}
            companyList={owner.companyList}
            callback_OnClose_Normal={Callback_Modal_Add_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_Add_OnClose_Notification
            }
          />

          <OutletModifyModal
            doOpen={openEditModal}
            modalMode="Edit"
            showLogs={true}
            outletInfo={selectedOutlet}
            companyName={selectedOutletCompany}
            companySelectedID={null}
            companyList={null}
            callback_OnClose_Normal={Callback_Modal_Edit_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_Edit_OnClose_Notification
            }
          />

          <OutletModifyModal
            doOpen={openDeleteModal}
            modalMode="Delete"
            showLogs={true}
            outletInfo={selectedOutlet}
            companyName={selectedOutletCompany}
            companySelectedID={null}
            companyList={null}
            callback_OnClose_Normal={Callback_Modal_Delete_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_Delete_OnClose_Notification
            }
          />

          <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 lg:p-4 gap-2 rounded-xl shadow-md bg-white">
            <OutletCompanySelector
              companies={owner.companyList}
              selectedCompany={selectedCompany}
              onChange={setSelectedCompany}
            />

            <button
              onClick={Callback_Modal_Add_OnOpen}
              className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all"
            >
              <PlusIcon className="h-6 w-6" />
              <h1 className="font-semibold text-md">Add Outlet</h1>
            </button>
          </div>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <section className="flex flex-col px-6 pb-6 gap-4 w-full h-full items-center justify-start overflow-auto">
          {owner.companyList
            .filter(
              (company) =>
                selectedCompany === -1 || company.companyID === selectedCompany
            )
            .map((company, index) => (
              <OutletCollection
                key={company.companyID}
                index={index}
                companyInfo={company}
                isValidatingData={isOwnerValidating}
                editOutletCallback={Callback_Modal_Edit_OnOpen}
                deleteOutletCallback={Callback_Modal_Delete_OnOpen}
              />
            ))}
        </section>
      )}
    </main>
  );
}
