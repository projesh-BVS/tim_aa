import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import OutletModifyForm_Footer from "./SubComps/OutletModifyForm_Footer";
import OutletModifyForm_Header from "./SubComps/OutletModifyForm_Header";
import OutletModifyForm_Body from "./SubComps/OutletModifyForm_Body";

const OutletModifyForm = ({
  companyName,
  companyList,
  companySelectedID,
  outletInfo,
  statusDataUploading,
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
            <OutletModifyForm_Header
              iconHeader={GetHeader_Icon(formMode)}
              txtTitle={GetHeader_Title(formMode)}
              txtSubtitle={GetHeader_Subtitle(formMode, companyName)}
              showSubtitle={GetHeader_ShowSubtitle(formMode)}
            />

            <OutletModifyForm_Body
              formMode={formMode}
              outletInfo={outletInfo}
              companyList={companyList}
              comapnySelectedInitialID={companySelectedID}
              onFieldChangeCallback={OnFieldChange}
            />

            <OutletModifyForm_Footer
              statusDataUploading={isUploadingData}
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

export default OutletModifyForm;

function GetHeader_Icon(modeString) {
  if (modeString == "Add") return <PlusIcon className="h-5 w-5" />;
  else if (modeString == "Edit") return <PencilIcon className="h-5 w-5" />;
  else return <TrashIcon className="h-5 w-5" />;
}

function GetHeader_Title(modeString) {
  if (modeString == "Add") return "New Outlet";
  else if (modeString == "Edit") return "Edit Outlet";
  else return "Delete Outlet";
}

function GetHeader_Subtitle(modeString, companyName) {
  if (modeString == "Edit" || modeString == "Delete") return companyName;
  else return null;
}

function GetHeader_ShowSubtitle(modeString) {
  if (modeString == "Edit" || modeString == "Delete") return true;
  else return false;
}

function GetFooter_TxtSubmitBtn(modeString) {
  if (modeString == "Add") return "Add Outlet";
  else if (modeString == "Edit") return "Update Outlet";
  else return "Remove Outlet";
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
