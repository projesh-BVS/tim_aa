import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import OwnerModifyForm_Header from "./SubComps/OwnerModifyForm_Header";
import OwnerModifyForm_Footer from "./SubComps/OwnerModifyForm_Footer";
import OwnerModifyForm_Body from "./SubComps/OwnerModifyForm_Body";

const OwnerModifyForm = ({
  ownerInfo,
  statusDataUploading,
  statusFormFilled,
  formMode,
  onFieldChangeCallback,
  onSubmitAddCallback,
  onSubmitEditCallback,
  onSubmitDeleteCallback,
  onCloseCallback,
}) => {
  const [isUploadingData, setIsUploadingData] = useState(statusDataUploading);

  const OnFieldChange = (e) => {
    onFieldChangeCallback(e);
  };

  useEffect(() => {
    setIsUploadingData(statusDataUploading);
  }, [statusDataUploading]);

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
          <Dialog.Panel className="flex flex-col gap-4 w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
            <OwnerModifyForm_Header
              iconHeader={GetHeader_Icon(formMode)}
              txtTitle={GetHeader_Title(formMode)}
              showSubtitle={false}
            />

            <OwnerModifyForm_Body
              formMode={formMode}
              ownerInfo={ownerInfo}
              callback_OnFieldChange={onFieldChangeCallback}
            />

            <OwnerModifyForm_Footer
              statusDataUploading={isUploadingData}
              statusFormFilled={statusFormFilled}
              txtSubmitBtn={GetFooter_TxtSubmitBtn(formMode)}
              txtCancelBtn={GetFooter_TxtCancelBtn(formMode)}
              onSubmitCallback={GetFooter_SubmitCallback(
                formMode,
                onSubmitAddCallback,
                onSubmitEditCallback,
                onSubmitDeleteCallback
              )}
              onCancelCallback={onCloseCallback}
            />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default OwnerModifyForm;

function GetHeader_Icon(modeString) {
  if (modeString == "Add") return <PlusIcon className="h-5 w-5" />;
  else if (modeString == "Edit") return <PencilIcon className="h-5 w-5" />;
  else return <TrashIcon className="h-5 w-5" />;
}

function GetHeader_Title(modeString) {
  if (modeString == "Add") return "New Owner";
  else if (modeString == "Edit") return "Edit Owner";
  else return "Delete Owner";
}

function GetFooter_TxtSubmitBtn(modeString) {
  if (modeString == "Add") return "Add Owner";
  else if (modeString == "Edit") return "Update Owner";
  else return "Remove Owner";
}

function GetFooter_TxtCancelBtn(modeString) {
  if (modeString == "Add") return "Don't Add";
  else if (modeString == "Edit") return "Cancel Editing";
  else return "Don't Remove";
}

function GetFooter_SubmitCallback(
  modeString,
  callback_SubmitAdd,
  callback_SubmitEdit,
  callback_SubmitDelete
) {
  if (modeString == "Add") return callback_SubmitAdd;
  else if (modeString == "Edit") return callback_SubmitEdit;
  else return callback_SubmitDelete;
}
