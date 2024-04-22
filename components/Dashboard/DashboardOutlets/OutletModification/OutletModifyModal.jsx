import {
  GetOutletChangeMsg_Delete,
  GetOutletChangeMsg_Update,
  GetOutletChangeMsg_Upload,
} from "@/libs/Outlet Libs/OutletChangeMsgs";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import OutletModifyNotification from "./UI/OutletModifyNotification";
import OutletModifyForm from "./UI/OutletModifyForm";

const OutletModifyModal = ({
  doOpen = false,
  modalMode = "",
  showLogs = false,
  outletInfo = null,
  companyName = null,
  companySelectedID = null,
  companyList = null,
  callback_OnClose_Normal,
  callback_OnClose_Notification,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(false);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);
  const [fields, setFields] = useState({
    outletID: outletInfo != null ? outletInfo.outletID : -1, //If no outlet info is present, assume modal is in "Add" mode, and send -1 as outletID
    companyID: outletInfo != null ? outletInfo.companyID : null, //If no outlet info is present, provide companyID before validation
    outletName: "",
    outletAddress: "",
  });

  useEffect(() => {
    if (outletInfo) {
      Log("Setting Outlet Data: " + JSON.stringify(outletInfo), showLogs);
      SetOutletData(outletInfo);
    }
  }, [outletInfo]);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function SetOutletData(outletInfo) {
    setFields(JSON.parse(JSON.stringify(outletInfo)));
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
    //setFields({ ...fields, ["outletID"]: -555 }); //FOR CHECKING ERROR RESPONSE
  };

  const HandleSubmit_Add = async (event) => {
    Log("Initiating submitting outlet add", showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/outlet",
          fields
        );

        if (response.status === 200) {
          Log(
            "Add Outlet Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOutletChangeMsg_Upload(true));
        } else {
          Log("Add Outlet Failed", showLogs);
          setStatusNotificationContent(GetOutletChangeMsg_Upload(false));
        }
      } catch (err) {
        Log("Add Outlet Failed", showLogs);
        setStatusNotificationContent(GetOutletChangeMsg_Upload(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Edit = async (event) => {
    Log("Initiating submitting outlet edit", showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/outlet",
          fields
        );

        if (response.status === 200) {
          Log(
            "Update Outlet Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOutletChangeMsg_Update(true));
        } else {
          Log(
            "Update Outlet Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOutletChangeMsg_Update(false));
        }
      } catch (err) {
        Log("Update Outlet Failed | Error: " + JSON.stringify(err), showLogs);
        setStatusNotificationContent(GetOutletChangeMsg_Update(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  const HandleSubmit_Delete = async (event) => {
    Log("Initiating submitting outlet delete", showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.delete(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/outlet",
          { data: fields }
        );

        if (response.status === 200) {
          Log(
            "Delete Outlet Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOutletChangeMsg_Delete(true));
        } else if (response.status === 204) {
          console.log(
            "Cannot Delete Outlet, Items exist | Response: " +
              JSON.stringify(response)
          );
          setStatusNotificationContent(
            GetOutletChangeMsg_Delete(false, "PRODUCT")
          );
        } else if (response.status === 275) {
          console.log(
            "Cannot Delete Outlet, Only outlet | Response: " +
              JSON.stringify(response)
          );
          setStatusNotificationContent(
            GetOutletChangeMsg_Delete(false, "OUTLET")
          );
        } else {
          Log(
            "Delete Outlet Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOutletChangeMsg_Delete(false, "API"));
        }
      } catch (err) {
        Log("Delete Outlet Failed | Error: " + JSON.stringify(err), showLogs);
        setStatusNotificationContent(GetOutletChangeMsg_Delete(false, "API"));
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
            <OutletModifyForm
              companyName={companyName}
              companyList={companyList}
              companySelectedID={companySelectedID}
              outletInfo={outletInfo}
              statusDataUploading={isUploadingData}
              formMode={modalMode}
              onFieldChangeCallback={HandleFieldValueChange}
              onSubmitAddCallback={HandleSubmit_Add}
              onSubmitEditCallback={HandleSubmit_Edit}
              onSubmitDeleteCallback={HandleSubmit_Delete}
              onCloseCallback={CloseModal}
            />
          )}

          {showStatusNotification && (
            <OutletModifyNotification
              notificationContent={statusNotificationContent}
              onCloseCallback={CloseModal}
            />
          )}
        </Dialog>
      </Transition>
    </>
  );
};

export default OutletModifyModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
