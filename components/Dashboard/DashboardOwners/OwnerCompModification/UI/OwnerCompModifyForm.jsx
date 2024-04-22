import ModifyForm_Footer from "@/components/Common/ModificationModal/SubComps/ModifyForm_Footer";
import ModifyForm_Header from "@/components/Common/ModificationModal/SubComps/ModifyForm_Header";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import OwnerCompModifyForm_Body from "./SubComps/OwnerCompModifyForm_Body";

const OwnerCompModifyForm = ({
  companyInfo,
  statusDataUploading,
  formMode,
  callback_OnFieldChange,
  callback_OnSubmit_Add,
  callback_OnSubmit_Edit,
  callback_OnSubmit_Delete,
  callback_OnClose,
}) => {
  const [isUploadingData, setIsUploadingData] = useState(statusDataUploading);

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
            <ModifyForm_Header
              iconHeader={GetHeader_Icon(formMode)}
              txtTitle={GetHeader_Title(formMode)}
              txtSubtitle={null}
              showSubtitle={GetHeader_ShowSubtitle(formMode)}
            />

            {/*<OutletModifyForm_Body
              formMode={formMode}
              outletInfo={outletInfo}
              companyList={companyList}
              comapnySelectedInitialID={companySelectedID}
              onFieldChangeCallback={OnFieldChange}
            />*/}
            <OwnerCompModifyForm_Body
              formMode={formMode}
              companyInfo={companyInfo}
              callback_OnFieldChange={callback_OnFieldChange}
            />

            <ModifyForm_Footer
              statusDataUploading={isUploadingData}
              txtSubmitBtn={GetFooter_TxtSubmitBtn(formMode)}
              txtCancelBtn={GetFooter_TxtCancelBtn(formMode)}
              callback_OnSubmit={GetFooter_SubmitCallback(
                formMode,
                callback_OnSubmit_Add,
                callback_OnSubmit_Edit,
                callback_OnSubmit_Delete
              )}
              callback_OnCancel={callback_OnClose}
            />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default OwnerCompModifyForm;

function GetHeader_Icon(modeString) {
  if (modeString == "Add") return <PlusIcon className="h-5 w-5" />;
  else if (modeString == "Edit") return <PencilIcon className="h-5 w-5" />;
  else return <TrashIcon className="h-5 w-5" />;
}

function GetHeader_Title(modeString) {
  if (modeString == "Add") return "New Company";
  else if (modeString == "Edit") return "Edit Company";
  else return "Delete Company";
}

function GetHeader_ShowSubtitle(modeString) {
  if (modeString == "Edit" || modeString == "Delete") return true;
  else return false;
}

function GetFooter_TxtSubmitBtn(modeString) {
  if (modeString == "Add") return "Add Company";
  else if (modeString == "Edit") return "Update Company";
  else return "Remove Company";
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
