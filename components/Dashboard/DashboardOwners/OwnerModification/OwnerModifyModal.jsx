import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OwnerModifyForm from "./UI/OwnerModifyForm";
import {
  GetOwnerMsg_Add,
  GetOwnerMsg_Edit,
} from "@/libs/Owner Libs/OwnerChangeMsgs";
import OwnerModifyNotification from "./UI/OwnerModifyNotification";

const OwnerModifyModal = ({
  doOpen = false,
  modalMode = "",
  showLogs = false,
  ownerInfo = null,
  callback_OnClose_Normal,
  callback_OnClose_Notification,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [fields, setFields] = useState({
    ownerID: ownerInfo != null ? ownerInfo.ownerID : -1,
    ownerName: ownerInfo != null ? ownerInfo.ownerName : "",
    mobile: ownerInfo != null ? ownerInfo.mobile : "",
    username: ownerInfo != null ? ownerInfo.email : "",
    newPassword: "",
  });

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

  useEffect(() => {
    if (ownerInfo) {
      Log("Setting Owner Data: " + JSON.stringify(ownerInfo), showLogs);
      SetOwnerData(ownerInfo);
    }
  }, [ownerInfo]);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function SetOwnerData(ownerInfo) {
    setFields(JSON.parse(JSON.stringify(ownerInfo)));
    setIsFormFilled(true);
  }

  const IsFormValid = (checkData = fields) => {
    Log(
      "Checking form validity. Form Data - " + Object.values(checkData),
      showLogs
    );
    return Object.values(checkData).every((value) => value || value === 0);
  };

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    Log(
      "Handling Field Value Change | Field: " + name + " | Value: " + value,
      showLogs
    );
    setFields({ ...fields, [name]: value });
    setIsFormFilled(IsFormValid());
  };

  const HandleSubmit_Add = async (event) => {
    Log("Initiating submitting owner add", showLogs);

    event.preventDefault();

    let apiData = {
      action: "signup",
      role: "admin",
      email: fields.username,
      password: fields.newPassword,
      name: fields.ownerName,
      mobile: fields.mobile,
    };

    if (IsFormValid(apiData)) {
      setIsUploadingData(true);

      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/auth",
          apiData
        );

        if (response.status === 200) {
          Log(
            "Adding Owner Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOwnerMsg_Add(true));
        } else {
          Log(
            "Adding Owner Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOwnerMsg_Add(false));
        }
      } catch (err) {
        Log(
          "Adding Owner Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetOwnerMsg_Add(false));
      }

      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Edit = async (event) => {
    Log("Initiating submitting owner info edit", showLogs);

    event.preventDefault();

    if (IsFormValid(fields)) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/profile/info",
          fields
        );

        if (response.status === 200) {
          Log(
            "Editing Owner Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOwnerMsg_Edit(true));
        } else {
          Log(
            "Editing Owner Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOwnerMsg_Edit(false));
        }
      } catch (err) {
        Log(
          "Editing Owner Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetOwnerMsg_Edit(false));
      }

      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

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
            <OwnerModifyForm
              ownerInfo={ownerInfo}
              statusDataUploading={isUploadingData}
              statusFormFilled={isFormFilled}
              formMode={modalMode}
              onFieldChangeCallback={HandleFieldValueChange}
              onSubmitAddCallback={HandleSubmit_Add}
              onSubmitEditCallback={HandleSubmit_Edit}
              onSubmitDeleteCallback={null}
              onCloseCallback={CloseModal}
            />
          )}

          {showStatusNotification && (
            <OwnerModifyNotification
              notificationContent={statusNotificationContent}
              onCloseCallback={CloseModal}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
};

export default OwnerModifyModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
