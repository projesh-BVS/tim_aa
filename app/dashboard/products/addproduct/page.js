"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import ProductUploadCard_About from "@/components/Dashboard/DashboardProducts/ProductUploadCard_About";
import ProductUploadCard_Sizes from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Sizes";
import ProductUploadCard_Model from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Model";
import ProductUploadCard_Pricing from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Pricing";
import useOwner from "@/hooks/useOwner";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  CloudArrowUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import ModalDialog from "@/components/Common/ModalDialog";

const AddProduct = () => {
  const router = useRouter();
  const { owner, isOwnerLoading, isOwnerError } = useOwner();
  const [isUploading, setIsUploading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showUploadStatus, setShowUploadStatus] = useState(false);

  const uploadMessageSuccess = {
    Title: "Product Upload Successful",
    Description: "Your product was uploaded succesfully.",
    ButtonText: "Continue",
  };
  const uploadMessageError = {
    Title: "Product Upload Failed",
    Description: "Please try again.",
    ButtonText: "Close",
  };

  const [uploadMessageCurrent, setUploadMessageCurrent] =
    useState(uploadMessageError);

  function UploadMsgOnClose() {
    setShowUploadStatus(false);
  }

  const handleDiscard = (event) => {
    event.preventDefault();
    router.push("/dashboard/products");
  };

  const [fields, setFields] = useState({
    productID: -1,
    armatureOffsetX: 0,
    armatureOffsetY: 0,
    bodyPos: "",
    category: "",
    companyID: null,
    currency: "",
    description: "",
    discountedPrice: 0,
    discountPercent: 0,
    materials: "default",
    outletIDs: null,
    poster: "",
    price: null,
    productName: "",
    productSizes: null,
    sizeFactor: 100,
    skeJson: "",
    texJson: "",
    texPng: "",
    poster: "",
  });

  const isFormValid = () => {
    return Object.values(fields).every((value) => value || value === 0); //We accept 0 as valid number input
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  async function handleDropdown(name, value) {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }

  function handleFile(name, value) {
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid()) {
      console.log(fields);
      setIsUploading(true);
      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product",
          fields
        );

        if (response.status === 200) {
          console.log("Uploading done");
          setUploadMessageCurrent(uploadMessageSuccess);
          setShowUploadStatus(true);
        } else {
          console.log("Data saving failed");
          setUploadMessageCurrent(uploadMessageError);
          setShowUploadStatus(true);
        }
      } catch (err) {
        console.log("Server Log " + err);
        console.log("Data saving failed");
        setUploadMessageCurrent(uploadMessageError);
        setShowUploadStatus(true);
      }
      setIsUploading(false);
    } else {
      console.log("Field is incomplete");
    }
  };

  useEffect(() => {
    console.log("form values " + JSON.stringify(fields));
    setIsFormFilled(isFormValid());
  }, [fields]);

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <ModalDialog
        dialogText={uploadMessageCurrent.Title}
        dialogSubtext={uploadMessageCurrent.Description}
        confirmBtnText={"To Products"}
        closeBtnText={uploadMessageCurrent.ButtonText}
        doOpen={showUploadStatus}
        closeCallback={UploadMsgOnClose}
        toProductsCallback={handleDiscard}
      />
      <DashPageHeader
        icon={<PlusCircleIcon className="h-8 w-8" />}
        text="Add Product"
        isLoading={isOwnerLoading}
        showBackBtn={false}
      />
      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Preparing Form</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isOwnerError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <form className="flex flex-col gap-6 items-center w-full h-full overflow-y-auto overflow-x-clip -mt-6">
          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Model handleFile={handleFile} />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_About
              companyList={owner.companyList}
              handleChange={handleChange}
              handleDropdown={handleDropdown}
              //fieldsData={fields}
            />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Sizes
              handleChange={handleChange}
              handleDropdown={handleDropdown}
            />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Pricing
              handleChange={handleChange}
              handleDropdown={handleDropdown}
            />
          </section>

          <section className="flex px-6 pb-6 gap-4 w-full items-center justify-center">
            <button
              disabled={isUploading || isFormFilled === false}
              onClick={handleSubmit}
              type="Submit"
              className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-green-500 hover:bg-green-700 disabled:bg-green-500/40 transition-all"
            >
              {isUploading && (
                <>
                  <LoadingIndicator />
                  <span>Uploading...</span>
                </>
              )}

              {!isUploading && (
                <>
                  <span>
                    <CloudArrowUpIcon className="h-6 w-6" />
                  </span>
                  <span>Upload Product</span>
                </>
              )}
            </button>
            <button
              disabled={isUploading}
              onClick={handleDiscard}
              className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-red-500 hover:bg-red-700 disabled:bg-red-500/40 transition-all"
            >
              <span>
                <TrashIcon className="h-6 w-6" />
              </span>
              <span>Discard</span>
            </button>
          </section>
        </form>
      )}
    </main>
  );
};

export default AddProduct;
