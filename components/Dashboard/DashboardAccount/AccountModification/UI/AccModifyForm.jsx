import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import AccModifyForm_Header from "./SubComps/AccModifyForm_Header";
import AccModifyForm_Footer from "./SubComps/AccModifyForm_Footer";
import AccModifyForm_Body from "./SubComps/AccModifyForm_Body";

const AccModifyForm = ({
  statusDataUploading,
  formMode,
  ownerInfo,
  callback_OnFieldChange,
  callback_OnSubmit_Info,
  callback_OnSubmit_Pass,
  callback_OnSubmit_Photo,
  callback_OnClose,
}) => {
  const [isUploadingData, setIsUploadingData] = useState(statusDataUploading);

  useEffect(() => {
    setIsUploadingData(statusDataUploading);
  }, [statusDataUploading]);

  const OnFieldChange = (e) => {
    callback_OnFieldChange(e);
  };

  const OnFileChange = (e) => {
    callback_OnSubmit_Photo(e);
  };

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
            <AccModifyForm_Header
              iconHeader={GetHeader_Icon(formMode)}
              txtTitle={GetHeader_Title(formMode)}
              txtSubtitle={null}
              showSubtitle={false}
            />

            <AccModifyForm_Body
              formMode={formMode}
              ownerInfo={ownerInfo}
              callback_OnFieldChange={OnFieldChange}
              callback_OnFileChange={OnFileChange}
            />

            <AccModifyForm_Footer
              showBtn_Submit={formMode != "Photo"}
              statusDataUploading={isUploadingData}
              txtSubmitBtn={GetFooter_TxtSubmitBtn(formMode)}
              txtCancelBtn={GetFooter_TxtCancelBtn(formMode)}
              callback_OnSubmit={GetFooter_SubmitCallback(
                formMode,
                callback_OnSubmit_Info,
                callback_OnSubmit_Pass,
                callback_OnSubmit_Photo
              )}
              callback_OnCancel={callback_OnClose}
            />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default AccModifyForm;

function GetHeader_Icon(modeString) {
  if (modeString == "Info") return <UserIcon className="h-5 w-5" />;
  else if (modeString == "Pass") return <KeyIcon className="h-5 w-5" />;
  else return <CameraIcon className="h-5 w-5" />;
}

function GetHeader_Title(modeString) {
  if (modeString == "Info") return "Edit Personal Info";
  else if (modeString == "Pass") return "Change Password";
  else return "Change Profile Photo";
}

function GetFooter_TxtSubmitBtn(modeString) {
  if (modeString == "Info") return "Update Info";
  else if (modeString == "Pass") return "Update Password";
  else return "Update New Photo";
}

function GetFooter_TxtCancelBtn(modeString) {
  if (modeString == "Info") return "Cancel Changes";
  else if (modeString == "Pass") return "Keep Old Password";
  else return "Keep Old Photo";
}

function GetFooter_SubmitCallback(
  modeString,
  callback_SubmitInfo,
  callback_SubmitPass,
  callback_SubmitPhoto
) {
  if (modeString == "Info") return callback_SubmitInfo;
  else if (modeString == "Pass") return callback_SubmitPass;
  else return callback_SubmitPhoto;
}
