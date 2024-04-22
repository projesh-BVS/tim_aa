import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const OwnerModifyNotification = ({ notificationContent, onCloseCallback }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
            <div
              className={`flex flex-col justify-between p-4 bg-gradient-to-br ${
                notificationContent.Type === "Success"
                  ? "from-green-500 to-green-600"
                  : "from-red-500 to-red-600"
              }`}
            >
              <Dialog.Title
                as="div"
                className="flex p-2 items-center justify-center gap-2 text-lg font-medium text-white"
              >
                {notificationContent.Type === "Success" && (
                  <CheckCircleIcon className="h-8 w-8" />
                )}
                {notificationContent.Type === "Error" && (
                  <XCircleIcon className="h-8 w-8" />
                )}
                <h1>{notificationContent.Title}</h1>
              </Dialog.Title>
            </div>

            <div className={`flex p-6 items-center justify-center w-full`}>
              <p
                className={`${
                  notificationContent.Type === "Success"
                    ? "text-green-800"
                    : "text-red-800"
                } text-base`}
              >
                {notificationContent.Description}
              </p>
            </div>

            <div className="w-full p-2 pt-0">
              <button
                onClick={() => onCloseCallback()}
                className="flex p-2 items-center justify-center w-full font-semibold text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-lg transition-all"
              >
                {notificationContent.ButtonText}
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default OwnerModifyNotification;
