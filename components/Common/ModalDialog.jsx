import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const ModalDialog = ({
  dialogText,
  dialogSubtext,
  confirmBtnText,
  closeBtnText,
  doOpen,
  closeCallback = null,
  toProductsCallback = null,
  productDeleted=false,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);

  function closeModal() {
    setIsOpen(false);
    if (closeCallback != null) closeCallback();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (doOpen) openModal();
    else closeModal();
  }, [doOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="flex flex-col p-4 gap-4 w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl shadow-2xl transition-all">
                  <div className="flex flex-col justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {dialogText}
                    </Dialog.Title>
                    <div className={`mt-2 ${dialogSubtext ? "" : "hidden"}`}>
                      <p className="text-sm text-gray-500">{dialogSubtext}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full items-center justify-center">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center px-4 py-2 rounded-lg bg-tif-blue text-white font-semibold font-sm hover:bg-tif-lavender hover:shadow-md transition-all"
                      onClick={toProductsCallback}
                    >
                      {confirmBtnText}
                    </button>

                    {!productDeleted&&<button
                      type="button"
                      className="flex w-full items-center justify-center px-4 py-2 rounded-lg bg-tif-blue text-white font-semibold font-sm hover:bg-tif-lavender hover:shadow-md transition-all"
                      onClick={closeModal}
                    >
                      {closeBtnText}
                    </button>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDialog;
