import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import CompanyEditNotification from "./UI/CompanyEditNotification";

const CompanyEditNotifyModal = ({
  doOpen = false,
  statusNotificationContent,
  callback_OnClose_Notification,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function OpenModal() {
    setIsOpen(true);
  }

  function CloseModal() {
    setIsOpen(false);
    if (callback_OnClose_Notification != null) {
      callback_OnClose_Notification();
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
          <CompanyEditNotification
            notificationContent={statusNotificationContent}
            callback_OnClose={CloseModal}
          />
        </Dialog>
      </Transition>
    </>
  );
};

export default CompanyEditNotifyModal;
