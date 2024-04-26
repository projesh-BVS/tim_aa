import ModifyNotification from "@/components/Common/ModificationModal/UI/ModifyNotification";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import OwnerCompModifyForm from "./UI/OwnerCompModifyForm";
import {
  GetCompanyChangeMsg_Add,
  GetCompanyChangeMsg_Info_Update,
} from "@/libs/Company Libs/CompanyChangeMsgs";
import axios from "axios";

const OwnerCompModifyModal = ({
  doOpen = false,
  modalMode = "",
  showLogs = false,
  companyInfo = null,
  callback_OnClose_Normal,
  callback_OnClose_Notification,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [addFields, setAddFields] = useState({
    companyName: companyInfo ? companyInfo.companyName : "",
    companyAddress: companyInfo ? companyInfo.companyAddress : "",
    ownerID: companyInfo ? companyInfo.ownerID : -1,
    companyGST: companyInfo ? companyInfo.companyGST : "",
  });

  const [editFields, setEditFields] = useState({
    companyID: companyInfo ? companyInfo.companyID : "",
    companyLogo: companyInfo ? companyInfo.companyLogo : "",
    companyName: companyInfo ? companyInfo.companyName : "",
    companyAddress: companyInfo ? companyInfo.companyAddress : "",
    ownerID: companyInfo ? companyInfo.ownerID : -1,
    companyGST: companyInfo ? companyInfo.companyGST : "",
    categories: companyInfo ? companyInfo.categories : "",
  });

  useEffect(() => {
    if (companyInfo) {
      Log(
        "Modal Mode: " +
          modalMode +
          " | Setting Company Data: " +
          JSON.stringify(companyInfo),
        showLogs
      );
      if (modalMode == "Add") SetCompanyDataAdd(companyInfo);
      if (modalMode == "Edit") SetCompanyDataEdit(companyInfo);
    }
  }, [companyInfo]);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function SetCompanyDataAdd(companyInfo) {
    console.log("COMPANY INFO- " + JSON.stringify(companyInfo));
    setAddFields({
      companyName: companyInfo ? companyInfo.companyName : "",
      companyAddress: companyInfo ? companyInfo.companyAddress : "",
      ownerID: companyInfo ? companyInfo.ownerID : -1,
      companyGST: companyInfo ? companyInfo.companyGST : "",
    });
  }

  function SetCompanyDataEdit(companyInfo) {
    console.log("COMPANY INFO- " + JSON.stringify(companyInfo));
    setEditFields({
      companyID: companyInfo ? companyInfo.companyID : "",
      companyLogo: companyInfo ? companyInfo.companyLogo : "",
      companyName: companyInfo ? companyInfo.companyName : "",
      companyAddress: companyInfo ? companyInfo.companyAddress : "",
      ownerID: companyInfo ? companyInfo.ownerID : -1,
      companyGST: companyInfo ? companyInfo.companyGST : "",
      categories: companyInfo ? companyInfo.categories : "",
    });
  }

  const IsFormValid = () => {
    if (modalMode == "Add") {
      Log(
        "Checking form validity. Form Data - " + Object.values(addFields),
        showLogs
      );
      return Object.values(addFields).every((value) => value || value === 0);
    }

    if (modalMode == "Edit") {
      Log(
        "Checking form validity. Form Data - " + Object.values(editFields),
        showLogs
      );
      return Object.values(editFields).every((value) => value || value === 0);
    }
  };

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    Log(
      "Handling Field Value Change | Field: " + name + " | Value: " + value,
      showLogs
    );
    if (modalMode == "Add") setAddFields({ ...addFields, [name]: value });
    if (modalMode == "Edit") setEditFields({ ...editFields, [name]: value });
  };

  const HandleSubmit_Add = async (event) => {
    Log("Initiating submitting company add", showLogs);

    Log("Add Form Data- " + JSON.stringify(addFields), showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/company",
          addFields
        );

        if (response.status === 200) {
          Log(
            "Add Company Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Add(true));
        } else {
          Log(
            "Add Company Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Add(false));
        }
      } catch (err) {
        Log(
          "Add Company Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetCompanyChangeMsg_Add(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Edit = async (event) => {
    Log("Initiating submitting company edit", showLogs);

    Log("Edit Form Data- " + JSON.stringify(editFields), showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/company",
          editFields
        );

        if (response.status === 200) {
          Log(
            "Edit Company Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(true));
        } else {
          Log(
            "Edit Company Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(false));
        }
      } catch (err) {
        Log(
          "Edit Company Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetCompanyChangeMsg_Info_Update(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  function OpenModal() {
    setIsOpen(true);
  }

  function CloseModal() {
    setIsOpen(false);
    setIsUploadingData(false);
    if (showStatusNotification) {
      setShowStatusNotification(false);
      if (callback_OnClose_Notification != null) {
        callback_OnClose_Notification();
      }
    } else {
      if (callback_OnClose_Normal != null) {
        callback_OnClose_Normal();
      }
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={CloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>
          {!showStatusNotification && (
            <OwnerCompModifyForm
              companyInfo={companyInfo}
              statusDataUploading={isUploadingData}
              formMode={modalMode}
              callback_OnFieldChange={HandleFieldValueChange}
              callback_OnSubmit_Add={HandleSubmit_Add}
              callback_OnSubmit_Edit={HandleSubmit_Edit}
              callback_OnSubmit_Delete={null}
              callback_OnClose={CloseModal}
            />
          )}

          {showStatusNotification && (
            <ModifyNotification
              notificationContent={statusNotificationContent}
              callback_OnClose={CloseModal}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
};

export default OwnerCompModifyModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
