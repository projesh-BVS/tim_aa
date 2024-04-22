import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import CompanyUploadFormField from "./SubComps/CompanyUploadFormField";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import axios from "axios";

const CompanyUploadCard_About = ({
  fieldsData = null,
  onFieldChangeCallback,
  onFileChangeCallback,
}) => {
  const [logoFile, setLogoFile] = useState(null);

  const fileSelected = (file, fileType) => {
    switch (fileType[0]) {
      case "png":
        setLogoFile(file);
        break;
      case "webp":
        setLogoFile(file);
        break;
      default:
        console.log("File type not found - " + fileType[0]);
    }
  };
  function handleFile(name, value) {
    let target = { name: "", value: "" };
    let e = { target };

    e.target.name = name;
    e.target.value = value;

    onFileChangeCallback(e);
  }

  useEffect(() => {
    if (fieldsData != null) {
      setLogoFile(fieldsData.companyLogo);
    }
  }, [fieldsData]);

  return (
    <section className="flex flex-col gap-4 items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>About Company</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between px-2 lg:px-4 h-auto gap-4 w-full">
        <div className="h-full">
          <LogoShowcaseCard logoLink={logoFile} />
        </div>
        <div className="w-full">
          <FileUploadCard
            displayName={"Logo"}
            fileTypes={["png", "webp"]}
            fileSelectedCallback={fileSelected}
            handleFile={handleFile}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-2 lg:p-4 h-auto gap-4 w-full">
        <CompanyUploadFormField
          fieldID="companyName"
          fieldName="companyName"
          fieldType="text"
          fieldLabel="Company Name"
          fieldValue={fieldsData.companyName}
          handleChange={onFieldChangeCallback}
        />

        <CompanyUploadFormField
          fieldID="companyAddress"
          fieldName="companyAddress"
          fieldType="text"
          fieldLabel="Company Address"
          multiline={true}
          fieldValue={fieldsData.companyAddress}
          handleChange={onFieldChangeCallback}
        />
      </div>
    </section>
  );
};

export default CompanyUploadCard_About;

export function LogoShowcaseCard({ logoLink }) {
  if (logoLink) {
    return (
      <section className="flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full xl:col-span-1 h-auto xl:h-auto">
        <div className="rounded-2xl overflow-clip aspect-square h-44 shrink-0 relative shadow-inner border-[1px] border-tif-grey">
          <Image
            src={logoLink}
            blurDataURL={logoLink}
            alt="Company Logo"
            placeholder="blur"
            quality={100}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    );
  } else {
    return (
      <section className="flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full xl:col-span-1 h-44 w-44">
        <div className="flex flex-col gap-4 font-semibold text-center text-sm">
          <div
            className={`flex items-center gap-2 ${
              logoLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {logoLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>Logo uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>Logo not uploaded</h1>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export function FileUploadCard({
  displayName,
  fileTypes,
  fileSelectedCallback,
  handleFile,
}) {
  const [file, setFile] = useState(null);
  const [isTypeError, setTypeError] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [isInDropZone, setIsInDropZone] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const handleChange = (file) => {
    setFile(file);
    setTypeError(false);
    console.log("file dropped " + fileTypes[0]);
    if (fileTypes[0] == "glb" || fileTypes[0] == "usdz")
      handleUpload("tryitproductmodels", file, fileTypes, setUploadPercent);
    else if (fileTypes[0] == "webp" || fileTypes[0] == "png")
      handleUpload("tryitproductimages", file, fileTypes, setUploadPercent);
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

    /*const result = await axios.put(url, file, {
      withCredentials: true,
      headers: { "Content-Type": "image/png" },
    });*/
    console.log("response " + JSON.stringify(responseUpload));
    console.log("response text " + responseUpload.statusText);

    if (responseUpload.statusText === "OK") {
      handleFile(
        "companyLogo",
        `https://${bucketName}.s3.amazonaws.com/${file_key}`
      );

      fileSelectedCallback(
        `https://${bucketName}.s3.amazonaws.com/${file_key}`,
        fileTypes
      );

      setUploadError(false);
    } else {
      setUploadError(true);
    }
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
          className={`hidden lg:flex flex-col p-4 gap-6 w-full h-full items-center justify-center rounded-2xl border-2 border-tif-lavender border-dashed hover:bg-tif-blue/20 hover:shadow-md transition-all ${
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
            className={`font-semibold  text-sm text-center text-tif-lavender leading-snug ${
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
          <ProgressBar
            progressPercent={uploadPercent}
            doShow={uploadPercent > 0 && uploadPercent < 100}
          />
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

        <button className="lg:hidden flex w-full h-full items-center justify-center px-4 py-2 gap-4 rounded-xl text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md transition-all">
          <CloudArrowUpIcon
            width={24}
            className={`${isInDropZone ? "blur" : "blur-none"}`}
          />
          <h1
            className={`font-black text-md uppercase ${
              isInDropZone ? "blur" : "blur-none"
            }`}
          >
            {displayName}
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
