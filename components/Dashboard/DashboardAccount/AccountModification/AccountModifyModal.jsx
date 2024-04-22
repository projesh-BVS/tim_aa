import {
  GetAccountModifyMsg_Info,
  GetAccountModifyMsg_Pass,
  GetAccountModifyMsg_Photo,
} from "@/libs/Account Libs/AccountChangeMsgs";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import AccModifyNotification from "./UI/AccModifyNotification";
import AccModifyForm from "./UI/AccModifyForm";

const AccountModifyModal = ({
  showLogs = true,
  doOpen = false,
  modalMode = "",
  ownerInfo = null,
  callback_OnClose_Normal,
  callback_OnClose_Notification,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [fields, setFields] = useState({
    ownerName: "",
    mobile: "",
  });

  useEffect(() => {
    if (ownerInfo) {
      Log(
        "AccModifyModal -> Setting Owner Data: " + JSON.stringify(ownerInfo),
        showLogs
      );
      SetOwnerData(ownerInfo);
    }
  }, [ownerInfo]);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function SetOwnerData(ownerData) {
    setFields(JSON.parse(JSON.stringify(ownerData)));
  }

  const IsFormValid = () => {
    Log(
      "Checking form validity. Form Data - " + Object.values(fields),
      showLogs
    );
    return Object.values(fields).every((value) => value || value === 0);
  };

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    Log(
      "Handling Field Value Change | Field: " + name + " | Value: " + value,
      showLogs
    );
    setFields({ ...fields, [name]: value });
  };

  const HandleSubmit_Info = async (event) => {
    Log("Initiating submitting personal info edit", showLogs);

    event.preventDefault();

    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/profile/info",
          fields
        );

        if (response.status === 200) {
          Log(
            "Update Profile Info Successful | Response: " +
              JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetAccountModifyMsg_Info(true));
        } else {
          Log(
            "Update Profile Info Failed | Response: " +
              JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetAccountModifyMsg_Info(false));
        }
      } catch (err) {
        Log(
          "Update Profile Info Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetAccountModifyMsg_Info(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Pass = async (event) => {
    Log("Initiating submitting password change", showLogs);

    event.preventDefault();

    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/profile/password",
          fields
        );

        if (response.status === 200) {
          Log(
            "Password Change Successful | Response: " +
              JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetAccountModifyMsg_Pass(true));
        } else if (response.status === 204) {
          Log(
            "Password Change Failed Not Matched | Response: " +
              JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetAccountModifyMsg_Pass(false, false));
        } else {
          Log(
            "Password Change Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetAccountModifyMsg_Pass(false, true));
        }
      } catch (err) {
        Log(
          "Password Change Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetAccountModifyMsg_Pass(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Photo = async (event) => {
    Log("Initiating submitting profile picture", showLogs);

    let apiData = {
      ownerID: ownerInfo.ownerID,
      profilePic: event.target.value,
    };

    Log("Profile Pic Data -> " + JSON.stringify(apiData), showLogs);

    try {
      const response = await axios.patch(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/profile/pic",
        apiData
      );

      if (response.status === 200) {
        Log(
          "Upload Picture Successful | Response: " + JSON.stringify(response),
          showLogs
        );
        setStatusNotificationContent(GetAccountModifyMsg_Photo(true));
      } else {
        Log(
          "Upload Picture Failed | Response: " + JSON.stringify(response),
          showLogs
        );
        setStatusNotificationContent(GetAccountModifyMsg_Photo(false));
      }
    } catch (err) {
      Log(
        "Upload Picture Failed in catch | Error: " + JSON.stringify(err),
        showLogs
      );
      setStatusNotificationContent(GetAccountModifyMsg_Photo(false));
    }
    setIsUploadingData(false);
    setShowStatusNotification(true);
  };

  function OpenModal() {
    Log("Opening Account Modify Modal in mode- " + modalMode, showLogs);
    setIsOpen(true);
  }

  function CloseModal() {
    Log("Closing Account Modify Modal");
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
            <AccModifyForm
              statusDataUploading={isUploadingData}
              formMode={modalMode}
              ownerInfo={ownerInfo}
              callback_OnFieldChange={HandleFieldValueChange}
              //callback_OnSubmit_Info={HandleSubmit_Add}
              //callback_OnSubmit_Pass={HandleSubmit_Edit}
              //callback_OnSubmit_Photo={HandleSubmit_Delete}
              callback_OnSubmit_Info={HandleSubmit_Info}
              callback_OnSubmit_Pass={HandleSubmit_Pass}
              callback_OnSubmit_Photo={HandleSubmit_Photo}
              callback_OnClose={CloseModal}
            />
          )}

          {showStatusNotification && (
            <AccModifyNotification
              notificationContent={statusNotificationContent}
              callback_OnClose={CloseModal}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
};

export default AccountModifyModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
