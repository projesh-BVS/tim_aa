"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import AccountInfoCard from "@/components/Dashboard/DashboardAccount/AccountInfoCard";
import AccountModifyModal from "@/components/Dashboard/DashboardAccount/AccountModification/AccountModifyModal";
import useOwner from "@/hooks/useOwner";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Account() {
  //const { data: session } = useSession();
  const {
    owner,
    ownerMutate,
    isOwnerLoading,
    isOwnerError,
    isOwnerValidating,
  } = useOwner(/*session.user.ownerID*/);
  const [openModal_AccPhoto, setOpenModal_AccPhoto] = useState(false);
  const [openModal_AccInfo, setOpenModal_AccInfo] = useState(false);
  const [openModal_AccPass, setOpenModal_AccPass] = useState(false);

  function Callback_Modal_AccInfo_OnOpen() {
    setOpenModal_AccInfo(true);
  }

  function Callback_Modal_AccInfo_OnClose_Normal() {
    setOpenModal_AccInfo(false);
  }

  function Callback_Modal_AccInfo_OnClose_Notification() {
    setOpenModal_AccInfo(false);
    ownerMutate();
  }

  function Callback_Modal_AccPass_OnOpen() {
    setOpenModal_AccPass(true);
  }

  function Callback_Modal_AccPass_OnClose_Normal() {
    setOpenModal_AccPass(false);
  }

  function Callback_Modal_AccPass_OnClose_Notification() {
    setOpenModal_AccPass(false);
    ownerMutate();
  }

  function Callback_Modal_AccPhoto_OnOpen() {
    setOpenModal_AccPhoto(true);
  }

  function Callback_Modal_AccPhoto_OnClose_Normal() {
    setOpenModal_AccPhoto(false);
  }

  function Callback_Modal_AccPhoto_OnClose_Notification() {
    setOpenModal_AccPhoto(false);
    ownerMutate();
  }

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<UserIcon className="h-8 w-8" />}
        text="My Account"
        isLoading={isOwnerLoading}
        showBackBtn={true}
      />

      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Account Info</span>
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
          <AccountModifyModal
            doOpen={openModal_AccInfo}
            modalMode="Info"
            ownerInfo={owner.ownerDetails[0]}
            callback_OnClose_Normal={Callback_Modal_AccInfo_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_AccInfo_OnClose_Notification
            }
          />

          <AccountModifyModal
            doOpen={openModal_AccPass}
            modalMode="Pass"
            ownerInfo={owner.ownerDetails[0]}
            callback_OnClose_Normal={Callback_Modal_AccPass_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_AccPass_OnClose_Notification
            }
          />

          <AccountModifyModal
            doOpen={openModal_AccPhoto}
            modalMode="Photo"
            ownerInfo={owner.ownerDetails[0]}
            callback_OnClose_Normal={Callback_Modal_AccPhoto_OnClose_Normal}
            callback_OnClose_Notification={
              Callback_Modal_AccPhoto_OnClose_Notification
            }
          />

          <AccountInfoCard
            ownerData={owner}
            callback_Edit_AccInfo={Callback_Modal_AccInfo_OnOpen}
            callback_Edit_AccPass={Callback_Modal_AccPass_OnOpen}
            callback_Edit_AccPhoto={Callback_Modal_AccPhoto_OnOpen}
          />
        </section>
      )}
    </main>
  );
}
