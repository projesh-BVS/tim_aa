import AccModifyFormField from "@/components/Dashboard/DashboardAccount/SubComps/AccModifyFormField";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const OwnerModifyForm_Body = ({
  formMode,
  ownerInfo,
  callback_OnFieldChange,
}) => {
  const [isVisible_NewPass, setIsVisible_NewPass] = useState(false);
  const [isVisible_ConfirmPass, setIsVisible_ConfirmPass] = useState(false);

  return (
    <div className="flex flex-col px-2 gap-6 w-full">
      {(formMode == "Add" || formMode == "Edit") && (
        <form className="flex flex-col px-4 pt-2 gap-6 w-full">
          <div className="flex items-center justify-center gap-4 w-full">
            <UserIcon className="text-tif-blue h-6 w-6" />

            <AccModifyFormField
              fieldID="ownerName"
              fieldName="ownerName"
              fieldType="text"
              fieldLabel="Name"
              fieldValue={ownerInfo != null ? ownerInfo.ownerName : null}
              handleChange={callback_OnFieldChange}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <PhoneIcon className="text-tif-blue h-6 w-6" />

            <AccModifyFormField
              fieldID="mobile"
              fieldName="mobile"
              fieldType="number"
              fieldLabel="Mobile"
              fieldValue={ownerInfo != null ? ownerInfo.mobile : null}
              handleChange={callback_OnFieldChange}
            />
          </div>

          {formMode == "Add" && (
            <>
              <div className="flex items-center justify-center gap-4 w-full">
                <EnvelopeIcon className="text-tif-blue h-6 w-6" />

                <AccModifyFormField
                  fieldID="username"
                  fieldName="username"
                  fieldType="email"
                  fieldLabel="Email"
                  fieldValue={ownerInfo != null ? ownerInfo.email : null}
                  autoComplete="username"
                  handleChange={callback_OnFieldChange}
                />
              </div>

              <div className="flex items-center justify-center gap-4 w-full">
                <KeyIcon className="text-tif-blue h-6 w-6" />

                <AccModifyFormField
                  fieldID="newPassword"
                  fieldName="newPassword"
                  fieldType={isVisible_NewPass ? "text" : "password"}
                  fieldLabel="New Password"
                  //fieldValue={ownerInfo != null ? ownerInfo.ownerName : null}
                  fieldValue={null}
                  autoComplete="new-password"
                  handleChange={callback_OnFieldChange}
                />

                <button
                  onClick={(e) => {
                    e = e || window.event;
                    e.preventDefault();
                    setIsVisible_NewPass((prev) => !prev);
                  }}
                  className="flex items-center justify-center h-11 aspect-square text-tif-blue hover:text-white bg-indigo-50 hover:bg-tif-blue hover:shadow-md rounded-md transition-all"
                >
                  {isVisible_NewPass && <EyeIcon className="h-6 w-6" />}
                  {!isVisible_NewPass && <EyeSlashIcon className="h-6 w-6" />}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 w-full">
                <KeyIcon className="text-tif-blue h-6 w-6" />

                <AccModifyFormField
                  fieldID="confirmPassword"
                  fieldName="confirmPassword"
                  fieldType={isVisible_ConfirmPass ? "text" : "password"}
                  fieldLabel="Confirm Password"
                  //fieldValue={ownerInfo != null ? ownerInfo.ownerName : null}
                  fieldValue={null}
                  autoComplete="new-password"
                  handleChange={callback_OnFieldChange}
                />

                <button
                  onClick={(e) => {
                    e = e || window.event;
                    e.preventDefault();
                    setIsVisible_ConfirmPass((prev) => !prev);
                  }}
                  className="flex items-center justify-center h-11 aspect-square text-tif-blue hover:text-white bg-indigo-50 hover:bg-tif-blue hover:shadow-md rounded-md transition-all"
                >
                  {isVisible_ConfirmPass && <EyeIcon className="h-6 w-6" />}
                  {!isVisible_ConfirmPass && (
                    <EyeSlashIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default OwnerModifyForm_Body;
