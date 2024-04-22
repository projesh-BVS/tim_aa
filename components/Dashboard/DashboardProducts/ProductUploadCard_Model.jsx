"use client";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const ProductUploadCard_Model = ({ handleFile, fieldsData = null }) => {
  const [texJSONFile, setTexJSONFile] = useState(null);
  const [skeJSONFile, setSkeJSONFile] = useState(null);
  const [texPNGFile, setTexPNGFile] = useState(null);
  const [posterPNGFile, setPosterPNGFile] = useState(null);
  const [statusIsUploading, setStatusIsUploading] = useState(false);
  const [currentUploadingCardName, setCurrentUploadingCardName] = useState("");

  useEffect(() => {
    if (fieldsData != null) {
      setTexJSONFile(fieldsData.texJson);
      setSkeJSONFile(fieldsData.skeJson);
      setTexPNGFile(fieldsData.texPng);
      setPosterPNGFile(fieldsData.poster);
    }
  }, [fieldsData]);

  const fileSelected = (file, fileType, fileSuffix) => {
    console.log("FILE SELECTED" + file);
    console.log("FILE TYPE - " + fileType);
    console.log("FILE SUFFIX - " + fileSuffix);

    switch (fileType[0]) {
      case "json":
        if (fileSuffix === "_tex") setTexJSONFile(file);
        else if (fileSuffix === "_ske") setSkeJSONFile(file);
        break;
      case "png":
        if (fileSuffix === "_tex") setTexPNGFile(file);
        else if (fileSuffix === "_img") setPosterPNGFile(file);
        break;
      default:
        console.log(
          "File type not found - 'fileSelected(" +
            file +
            ", " +
            fileType +
            ", " +
            fileSuffix +
            ")' [switch statement]"
        );
        break;
    }
  };

  function callback_IsUploading(isUploading, displayName) {
    console.log(
      "CARD UPLOADING: " + isUploading + " | CARD NAME: " + displayName
    );
    setStatusIsUploading(isUploading);
    setCurrentUploadingCardName(displayName);
  }

  return (
    <section className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 h-auto gap-4 w-full">
        <ApparelShowcaseCard
          texJsonLink={texJSONFile}
          skeJsonLink={skeJSONFile}
          texPngLink={texPNGFile}
          posterLink={posterPNGFile}
        />
        <FileUploadCard
          displayName={"TEX JSON"}
          fileTypes={["json"]}
          fileSuffix={"_tex"}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
          isUploadingCallback={callback_IsUploading}
          statusIsUploading={statusIsUploading}
          uploadingCardName={currentUploadingCardName}
        />
        <FileUploadCard
          displayName={"SKE JSON"}
          fileTypes={["json"]}
          fileSuffix={"_ske"}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
          isUploadingCallback={callback_IsUploading}
          statusIsUploading={statusIsUploading}
          uploadingCardName={currentUploadingCardName}
        />
        <FileUploadCard
          displayName={"TEX PNG"}
          fileTypes={["png"]}
          fileSuffix={"_tex"}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
          isUploadingCallback={callback_IsUploading}
          statusIsUploading={statusIsUploading}
          uploadingCardName={currentUploadingCardName}
        />
        <FileUploadCard
          displayName={"IMG PNG"}
          fileTypes={["png"]}
          fileSuffix={"_img"}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
          isUploadingCallback={callback_IsUploading}
          statusIsUploading={statusIsUploading}
          uploadingCardName={currentUploadingCardName}
        />
      </div>
    </section>
  );
};

export default ProductUploadCard_Model;

export function ApparelShowcaseCard({
  texJsonLink,
  skeJsonLink,
  texPngLink,
  posterLink,
}) {
  if (texJsonLink && skeJsonLink && texPngLink && posterLink) {
    return (
      <section className="relative flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full h-60">
        <Image
          src={posterLink}
          blurDataURL={posterLink}
          alt="Product Image"
          placeholder="blur"
          quality={100}
          fill
          sizes="15rem"
          style={{ objectFit: "contain" }}
        />
      </section>
    );
  } else {
    return (
      <section className="flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full h-60">
        <div className="flex flex-col gap-4 font-semibold text-center text-sm">
          <div
            className={`flex items-center gap-2 ${
              texJsonLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {texJsonLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>_tex JSON uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>_tex JSON not uploaded</h1>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              skeJsonLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {skeJsonLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>_ske JSON uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>_ske JSON not uploaded</h1>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              texPngLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {texPngLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>_tex PNG uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>_tex PNG not uploaded</h1>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              posterLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {posterLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>_img PNG uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>_img PNG not uploaded</h1>
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
  fileSuffix = null,
  fileTypes,
  fileSelectedCallback,
  isUploadingCallback,
  statusIsUploading,
  uploadingCardName,
  handleFile,
}) {
  const [file, setFile] = useState(null);
  const [isTypeError, setTypeError] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [isInDropZone, setIsInDropZone] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const isCardDisabled = statusIsUploading && uploadingCardName != displayName;

  const handleChange = (file) => {
    if (!fileSuffix) {
      setFile(file);
      setTypeError(false);
      if (fileTypes[0] == "json")
        handleUpload(
          "tryitfirstdress",
          file,
          fileTypes,
          "application/json",
          setUploadPercent
        );
      else if (fileTypes[0] == "png")
        handleUpload(
          "tryitfirstdress",
          file,
          fileTypes,
          "image/png",
          setUploadPercent
        );
    } else {
      let fileName = file.name.split(".")[0];
      let currFileSuffix = fileName.substring(
        fileName.length - 4,
        fileName.length
      );

      console.log("---------SUFFIX---------------");
      console.log(
        "Checking for suffix: " +
          fileSuffix +
          " | Actual suffix: " +
          currFileSuffix
      );

      if (currFileSuffix == fileSuffix) {
        setFile(file);
        setTypeError(false);
        if (fileTypes[0] == "json")
          handleUpload(
            "tryitfirstdress",
            file,
            fileTypes,
            currFileSuffix,
            "application/json",
            setUploadPercent
          );
        else if (fileTypes[0] == "png")
          handleUpload(
            "tryitfirstdress",
            file,
            fileTypes,
            currFileSuffix,
            "image/png",
            setUploadPercent
          );
      } else {
        setTypeError(true);
      }
    }
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
    fileSuffix,
    contentType,
    precentageCallback
  ) => {
    if (isUploadingCallback) isUploadingCallback(true, displayName);

    const options = {
      headers: { "Content-Type": contentType },
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
    console.log("response " + JSON.stringify(responseUpload));
    console.log("response text " + responseUpload.statusText);

    if (responseUpload.statusText === "OK") {
      if (fileTypes[0] == "json") {
        if (fileSuffix == "_tex") {
          handleFile(
            "texJson",
            `https://${bucketName}.s3.amazonaws.com/${file_key}`
          );
        } else if (fileSuffix == "_ske") {
          handleFile(
            "skeJson",
            `https://${bucketName}.s3.amazonaws.com/${file_key}`
          );
        }
      } else if (fileTypes[0] == "png") {
        if (fileSuffix == "_tex") {
          handleFile(
            "texPng",
            `https://${bucketName}.s3.amazonaws.com/${file_key}`
          );
        } else if (fileSuffix == "_img") {
          handleFile(
            "poster",
            `https://${bucketName}.s3.amazonaws.com/${file_key}`
          );
        }
      }

      fileSelectedCallback(
        `https://${bucketName}.s3.amazonaws.com/${file_key}`,
        fileTypes,
        fileSuffix
      );

      setUploadError(false);
    } else {
      setUploadError(true);
    }
    if (isUploadingCallback) isUploadingCallback(false, displayName);
  };

  return (
    <>
      {!isCardDisabled && (
        <FileUploader
          disabled={isCardDisabled}
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
          <div className={"w-full h-full"}>
            <button
              disabled={isCardDisabled}
              className={`hidden lg:flex flex-col p-4 gap-6 w-full h-full items-center justify-center rounded-2xl border-2 border-tif-lavender border-dashed hover:bg-tif-blue/20 hover:shadow-md transition-all ${
                isInDropZone ? "bg-tif-blue/20 shadow-md" : ""
              } ${isTypeError || isUploadError ? "bg-red-100" : ""} ${
                file && !isUploadError ? "bg-green-100" : ""
              } ${
                isCardDisabled ? "pointer-events-none" : "pointer-events-auto"
              }`}
            >
              <div
                className={`flex items-center justify-center px-4 py-2 gap-4 text-white bg-gradient-to-br from-tif-blue to-tif-pink rounded-xl shadow-md ${
                  isInDropZone ? "blur" : "blur-none bgt"
                }`}
              >
                <CloudArrowUpIcon width={20} />
                <h1 className="font-black text-base uppercase">
                  {displayName}
                </h1>
              </div>
              <h1
                className={`font-semibold  text-xs text-center text-tif-lavender leading-snug ${
                  isInDropZone ? "blur" : "blur-none"
                } ${isTypeError || isUploadError ? "hidden" : ""} ${
                  file ? "hidden" : ""
                }`}
              >
                {!isCardDisabled && (
                  <>
                    Drag & Drop
                    <br />
                    - or -
                    <br />
                    Click To Upload File
                  </>
                )}
                {isCardDisabled && <>Please wait</>}
              </h1>
              <ProgressBar
                progressPercent={uploadPercent}
                //doShow={uploadPercent > 0 && uploadPercent < 100}
                doShow={statusIsUploading && uploadingCardName == displayName}
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
                className={`font-medium text-red-500 text-sm ${
                  isTypeError ? "flex" : "hidden"
                }`}
              >
                Unsupported File Type:
                <br />
                Please drop a supported .
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

            <button
              disabled={isCardDisabled}
              className={`${
                isCardDisabled ? "pointer-events-none" : "pointer-events-auto"
              } lg:hidden flex w-full h-full items-center justify-center px-4 py-2 gap-4 rounded-xl text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md transition-all`}
            >
              <CloudArrowUpIcon
                width={24}
                className={`${isInDropZone ? "blur" : "blur-none"} ${
                  isCardDisabled ? "pointer-events-none" : "pointer-events-auto"
                }`}
              />
              <h1
                className={`font-black text-md uppercase ${
                  isInDropZone ? "blur" : "blur-none"
                }
            ${isCardDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
              >
                {!isCardDisabled && displayName}
                {isCardDisabled && "Please wait"}
              </h1>
              <ProgressBar
                progressPercent={uploadPercent}
                //doShow={uploadPercent > 0 && uploadPercent < 100}
                doShow={statusIsUploading && uploadingCardName == displayName}
              />
            </button>
          </div>
        </FileUploader>
      )}

      {isCardDisabled && (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-red-200 text-red-900 rounded-2xl">
          <h1>Please wait for</h1>
          <h1>{uploadingCardName + " to finish uploading"}</h1>
        </div>
      )}
    </>
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
