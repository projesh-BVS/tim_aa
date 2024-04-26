import OutletUploadFormField from "@/components/Dashboard/DashboardOutlets/SubComps/OutletUploadFormField";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid";

const OwnerCompModifyForm_Body = ({
  formMode,
  companyInfo,
  callback_OnFieldChange,
}) => {
  return (
    <div className="flex flex-col px-4 pt-2 gap-6 w-full">
      {formMode == "Add" && (
        <>
          <div className="flex items-center justify-center gap-4 w-full">
            <BuildingOffice2Icon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              fieldID="companyName"
              fieldName="companyName"
              fieldType="text"
              fieldLabel="Company Name"
              fieldValue={companyInfo != null ? companyInfo.companyName : null}
              handleChange={callback_OnFieldChange}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <MapPinIcon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              fieldID="companyAddress"
              fieldName="companyAddress"
              fieldType="text"
              fieldLabel="Company Address"
              fieldValue={
                companyInfo != null ? companyInfo.companyAddress : null
              }
              handleChange={callback_OnFieldChange}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <ReceiptPercentIcon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              fieldID="companyGST"
              fieldName="companyGST"
              fieldType="number"
              fieldLabel="GSTIN"
              fieldValue={companyInfo != null ? companyInfo.companyGST : null}
              handleChange={callback_OnFieldChange}
            />
          </div>
        </>
      )}

      {formMode == "Edit" && (
        <>
          <div className="flex items-center justify-center gap-4 w-full">
            <BuildingOffice2Icon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              disabled={true}
              fieldID="companyName"
              fieldName="companyName"
              fieldType="text"
              fieldLabel="Company Name"
              fieldValue={companyInfo != null ? companyInfo.companyName : null}
              handleChange={callback_OnFieldChange}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <MapPinIcon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              disabled={true}
              fieldID="companyAddress"
              fieldName="companyAddress"
              fieldType="text"
              fieldLabel="Company Address"
              fieldValue={
                companyInfo != null ? companyInfo.companyAddress : null
              }
              handleChange={callback_OnFieldChange}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <ReceiptPercentIcon className="text-tif-blue h-6 w-6" />

            <OutletUploadFormField
              fieldID="companyGST"
              fieldName="companyGST"
              fieldType="number"
              fieldLabel="GSTIN"
              fieldValue={companyInfo != null ? companyInfo.companyGST : null}
              handleChange={callback_OnFieldChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerCompModifyForm_Body;
