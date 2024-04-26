import axios from "axios";
import ModifyNotification from "@/components/Common/ModificationModal/UI/ModifyNotification";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import ProductOffsetModifyWindow from "./UI/ProductOffsetModifyWindow";

const ProductOffsetModifyModal = ({
  showLogs = true,
  doOpen = false,
  productInfo,
  callback_OnClose_Normal,
  callback_OnClose_Notification,
}) => {
  console.log(productInfo);
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(null);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);

  const [fields, setFields] = useState({
    productID: null,
    sizeFactor: null,
    armatureOffsetX: null,
    armatureOffsetY: null,
  });

  useEffect(() => {
    if (productInfo) {
      Log("Setting Product Data: " + JSON.stringify(productInfo), showLogs);
      SetProductData(productInfo);
    }
  }, [productInfo]);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function SetProductData(productInfo) {
    //setFields(JSON.parse(JSON.stringify(productInfo)));
    setFields({
      productID: productInfo.productID,
      sizeFactor: productInfo.sizeFactor,
      armatureOffsetX: productInfo.armatureOffsetX,
      armatureOffsetY: productInfo.armatureOffsetY,
    });
  }

  const IsFormValid = () => {
    Log(
      "Checking form validity. Form Data: " + Object.values(fields),
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

  const HandleSubmit_Edit = async (event) => {
    Log("Initiating submitting offset edit", showLogs);

    event.preventDefault();
    if (IsFormValid()) {
      setIsUploadingData(true);

      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product/offset",
          fields
        );

        if (response.status === 200) {
          Log(
            "Update Offset Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOffsetChangeMsg_Update(true));
        } else {
          Log(
            "Update Offset Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setStatusNotificationContent(GetOffsetChangeMsg_Update(false));
        }
      } catch (err) {
        Log(
          "Update Offset Failed in catch | Error: " + JSON.stringify(err),
          showLogs
        );
        setStatusNotificationContent(GetOffsetChangeMsg_Update(false));
      }
      setIsUploadingData(false);
      setShowStatusNotification(true);
    }
  };

  function OpenModal() {
    Log("Opening Product Offset Modify Modal");
    setIsOpen(true);
  }

  function CloseModal() {
    Log("Closing Product Offset Modify Modal");
    setIsOpen(false);
    setIsUploadingData(false);
    if (showStatusNotification) {
      setShowStatusNotification(false);
      if (callback_OnClose_Notification != null)
        callback_OnClose_Notification();
    } else {
      if (callback_OnClose_Normal != null) callback_OnClose_Normal();
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
            <ProductOffsetModifyWindow
              statusDataUploading={isUploadingData}
              productInfo={productInfo}
              callback_OnFieldValueChange={HandleFieldValueChange}
              callback_OnSubmit={HandleSubmit_Edit}
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

export default ProductOffsetModifyModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}

const msg_Offset_Update_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Product offsets updated successfully!",
  ButtonText: "Close",
};

const msg_Offset_Update_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update product offsets! Please try again",
  ButtonText: "Close",
};

function GetOffsetChangeMsg_Update(isSuccess) {
  return isSuccess ? msg_Offset_Update_Success : msg_Offset_Update_Failure;
}
