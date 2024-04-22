import {
  CloudArrowUpIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import AccModifyFormField from "../../../SubComps/AccModifyFormField";
import { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const AccModifyForm_Body = ({
  formMode,
  ownerInfo,
  callback_OnFieldChange,
  callback_OnFileChange,
}) => {
  const [isVisible_OldPass, setIsVisible_OldPass] = useState(false);
  const [isVisible_NewPass, setIsVisible_NewPass] = useState(false);
  const [isVisible_ConfirmPass, setIsVisible_ConfirmPass] = useState(false);

  function handleFile(name, value) {
    let target = { name: "", value: "" };
    let e = { target };

    e.target.name = name;
    e.target.value = value;

    callback_OnFileChange(e);
  }

  return (
    <>
      {formMode == "Info" && ownerInfo && (
        <div className="flex flex-col px-4 pt-2 gap-6 w-full">
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
        </div>
      )}

      {formMode == "Pass" && ownerInfo && (
        <form className="flex flex-col px-4 pt-2 gap-6 w-full">
          <div className="hidden items-center justify-center gap-4 w-full">
            <EnvelopeIcon className="text-tif-blue h-6 w-6" />

            <AccModifyFormField
              fieldID="username"
              fieldName="username"
              fieldType="email"
              fieldLabel="Email"
              fieldValue={ownerInfo != null ? ownerInfo.email : null}
              autoComplete="username"
              handleChange={null}
            />
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            <LockClosedIcon className="text-tif-blue h-6 w-6" />

            <AccModifyFormField
              fieldID="oldPassword"
              fieldName="oldPassword"
              fieldType={isVisible_OldPass ? "text" : "password"}
              fieldLabel="Old Password"
              //fieldValue={ownerInfo != null ? ownerInfo.ownerName : null}
              fieldValue={null}
              autoComplete="current-password"
              handleChange={callback_OnFieldChange}
            />

            <button
              onClick={(e) => {
                e = e || window.event;
                e.preventDefault();
                setIsVisible_OldPass((prev) => !prev);
              }}
              className="flex items-center justify-center h-11 aspect-square text-tif-blue hover:text-white bg-indigo-50 hover:bg-tif-blue hover:shadow-md rounded-md transition-all"
            >
              {isVisible_OldPass && <EyeIcon className="h-6 w-6" />}
              {!isVisible_OldPass && <EyeSlashIcon className="h-6 w-6" />}
            </button>
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
              {!isVisible_ConfirmPass && <EyeSlashIcon className="h-6 w-6" />}
            </button>
          </div>
        </form>
      )}

      {formMode == "Photo" && ownerInfo && (
        <form className="flex flex-col px-4 pt-2 gap-6 w-full">
          <div className="flex items-center justify-center gap-4 w-full">
            <FileUploadCard
              displayName={"Profile Photo"}
              fileTypes={["png", "webp", "jpeg"]}
              handleFile={handleFile}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default AccModifyForm_Body;

export function FileUploadCard({ displayName, fileTypes, handleFile }) {
  const [file, setFile] = useState(null);
  const [isTypeError, setTypeError] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [isInDropZone, setIsInDropZone] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (file) => {
    setFile(file);
    setTypeError(false);
    console.log("File Dropped " + fileTypes[0]);
    handleUpload("brandlogo", file, fileTypes, setUploadPercent);
  };

  const handleTypeError = (err) => {
    setTypeError(true);
  };

  const handleDragStateChange = (dragging) => {
    setIsInDropZone(dragging);
  };

  const handleUpload = async (
    bucketName,
    file,
    fileType,
    precentageCallback
  ) => {
    const options = {
      headers: { "Content-Type": "image/png" },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let precentage = Math.floor((loaded * 100) / total);

        precentageCallback(precentage);

        console.log("options");
        console.log(precentage);
        if (precentage < 100) {
          console.log(precentage);
        }
      },
    };

    setIsUploading(true);

    // Get signed URL from your backend
    const response = await axios.get(
      "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/get_signed_url",
      {
        params: { bucket_name: bucketName, file_type: fileType[0] },
      }
    );
    const { upload_url } = response.data;
    const { file_key } = response.data;

    console.log("signed url response ");
    console.log(response.data);
    console.log("the file going to be uploaded ");

    console.log(file);

    // Upload file to S3 using signed URL
    const responseUpload = await axios.put(upload_url, file, options); //Check for error - Modal + Make field blank

    console.log("response " + JSON.stringify(responseUpload));
    console.log("response text " + responseUpload.statusText);

    if (responseUpload.statusText === "OK") {
      handleFile(
        "profilePic",
        `https://${bucketName}.s3.amazonaws.com/${file_key}`
      );

      setUploadError(false);
    } else {
      setUploadError(true);
    }
    setIsUploading(false);
  };

  return (
    <FileUploader
      types={fileTypes}
      multiple={false}
      handleChange={handleChange}
      onTypeError={handleTypeError}
      onDraggingStateChange={handleDragStateChange}
      hoverTitle={"Drop " + displayName + " Here"}
      dropMessageStyle={{
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        fontWeight: 900,
        fontSize: 1.25 + "rem",
        textTransform: "capitalize",
        color: "rgb(50 50 50 / 1.0)",
      }}
    >
      <div className={"w-full h-full lg:h-44"}>
        <button
          className={`flex flex-col p-4 gap-6 w-full h-full items-center justify-center rounded-2xl border-2 border-tif-lavender border-dashed hover:bg-tif-blue/20 hover:shadow-md transition-all ${
            isInDropZone ? "bg-tif-blue/20 shadow-md" : ""
          } ${isTypeError || isUploadError ? "bg-red-100" : ""} ${
            file && !isUploadError ? "bg-green-100" : ""
          }`}
        >
          <div
            className={`flex items-center justify-center px-4 py-2 gap-4 text-white bg-gradient-to-br from-tif-blue to-tif-pink rounded-xl shadow-md ${
              isInDropZone ? "blur" : "blur-none bgt"
            }`}
          >
            <CloudArrowUpIcon width={32} />
            <h1 className="font-black text-xl uppercase">{displayName}</h1>
          </div>
          <h1
            className={`hidden lg:flex font-semibold  text-sm text-center text-tif-lavender leading-snug ${
              isInDropZone ? "blur" : "blur-none"
            } ${isTypeError || isUploadError ? "hidden" : ""} ${
              file ? "hidden" : ""
            }`}
          >
            Drag & Drop
            <br />
            - or -
            <br />
            Click To Upload File
          </h1>

          <h1
            className={`lg:hidden font-semibold  text-sm text-center text-tif-lavender leading-snug ${
              isInDropZone ? "blur" : "blur-none"
            } ${isTypeError || isUploadError ? "hidden" : ""} ${
              file ? "hidden" : ""
            }`}
          >
            Tap To Upload Photo
          </h1>
          <ProgressBar progressPercent={uploadPercent} doShow={isUploading} />
          <h1
            className={`px-2 w-full font-semibold text-tif-lavender truncate ${
              file && !isUploadError ? "" : "hidden"
            }`}
          >
            {file ? file.name : ""}
            <br />
            {file ? (file.size / 1024 / 1024).toFixed(2) + " MB" : ""}
          </h1>

          <h1
            className={`font-medium text-red-500 ${
              isTypeError ? "flex" : "hidden"
            }`}
          >
            Unsupported File Type
            <br />
            Please drop a{" "}
            {fileTypes.map(
              (type, index) =>
                type +
                (fileTypes.length > 1 && index != fileTypes.length - 1
                  ? " or "
                  : "")
            )}{" "}
            file
          </h1>

          <h1
            className={`font-medium text-red-500 ${
              isUploadError ? "flex" : "hidden"
            }`}
          >
            Upload Failed! Please try again!
          </h1>
        </button>
      </div>
    </FileUploader>
  );
}

export function ProgressBar({ progressPercent = 0, doShow }) {
  return (
    <div
      className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${
        doShow ? "" : "hidden"
      }`}
    >
      <div
        className={`bg-tif-lavender text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
        style={{ width: `${progressPercent}%` }}
      >
        <h1 className="w-full truncate">{progressPercent + "%"}</h1>
      </div>
    </div>
  );
}
