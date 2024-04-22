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
  let [isOpen, setIsOpen] = useState(doOpen);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showStatusNotification, setShowStatusNotification] = useState(null);
  const [statusNotificationContent, setStatusNotificationContent] =
    useState(null);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

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
              callback_OnSubmit={null}
              callback_OnClose={null}
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
