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
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import ModalDialog from "@/components/Common/ModalDialog";
import ModalDialogConfirm from "@/components/Common/ModalDialogConfirm";
import useProduct from "@/hooks/useProduct";

const EditProduct = ({ params }) => {
  //const { data: session } = useSession();
  const router = useRouter();

  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );
  //console.log(product);

  useEffect(() => {
    if (product) {
      console.log("Product info loaded: " + JSON.stringify(product.data));
      SetProductData(product);
    }
  }, [product]);

  const { owner, isOwnerLoading, isOwnerError } = useOwner();
  const [isUploading, setIsUploading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showUploadStatus, setShowUploadStatus] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productDeleted, setProductDeleted] = useState(false);

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

  const deleteMessageError = {
    Title: "Product Delete Failed",
    Description: "Please try again.",
    ButtonText: "Close",
  };

  const deleteMessageSuccess = {
    Title: "Product Delete Success",
    Description: "Your product was deleted succesfully.",
    ButtonText: "Close",
  };

  const deleteMessagePromt = {
    Title: "Delete confirmation!",
    Description: "Do you want yo delete this product?",
    YesButtonText: "Yes",
    CloseButtonText: "Close",
  };

  const [uploadMessageCurrent, setUploadMessageCurrent] =
    useState(uploadMessageError);

  function UploadMsgOnClose() {
    setShowUploadStatus(false);
    setShowDeleteConfirmation(false);
    //router.push("/dashboard/products");
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

  function SetProductData(product) {
    //Set fields
    console.log("Product Data" + JSON.stringify(product.data));
    setFields(JSON.parse(JSON.stringify(product.data)));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name " + name + " value " + value);
    setFields({ ...fields, [name]: value });
  };

  async function handleDropdown(name, value) {
    // Do something with name and value
    console.log("drop own updated name " + name + " value " + value);
    //setFields({ ...fields, [name]: value });

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }

  function handleFile(name, value) {
    // Do something with name and value
    //console.log("name " + name + " value " + value);
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = async (event) => {
    // Submit all data to your backend
    console.log("Uploading Form Data - " + JSON.stringify(fields));
    event.preventDefault();
    if (isFormValid()) {
      setIsUploading(true);
      try {
        const response = await axios.patch(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product",
          fields
        );

        if (response.status === 200) {
          setUploadMessageCurrent(uploadMessageSuccess);
          setShowUploadStatus(true);
        } else {
          setUploadMessageCurrent(uploadMessageError);
          setShowUploadStatus(true);
        }
      } catch (err) {
        setUploadMessageCurrent(uploadMessageError);
        setShowUploadStatus(true);
      }
      setIsUploading(false);
    } else {
    }
  };

  const promtDelete = (event) => {
    event.preventDefault();
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async (event) => {
    // Submit all data to your backend
    event.preventDefault();

    setIsUploading(true);
    try {
      const response = await axios.delete(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product?skeJson=" +
          fields.skeJson +
          "&texJson=" +
          fields.texJson +
          "&poster=" +
          fields.poster +
          "&texPng=" +
          fields.texPng +
          "&productID=" +
          fields.productID
      );

      if (response.status === 200) {
        setUploadMessageCurrent(deleteMessageSuccess);
        //setShowDeleteConfirmation(false);
        setShowUploadStatus(true);
        setProductDeleted(true);
        console.log("Modal status " + showUploadStatus);
      } else {
        setUploadMessageCurrent(deleteMessageError);
        setShowDeleteConfirmation(false);
        setShowUploadStatus(true);
      }
    } catch (err) {
      setUploadMessageCurrent(deleteMessageError);
      setShowDeleteConfirmation(false);
      setShowUploadStatus(true);
    }
    setIsUploading(false);
  };

  useEffect(() => {
    console.log("form values " + JSON.stringify(fields));
    setIsFormFilled(isFormValid());
  }, [fields]);

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <ModalDialogConfirm
        dialogText={deleteMessagePromt.Title}
        dialogSubtext={deleteMessagePromt.Description}
        closeBtnText={deleteMessagePromt.CloseButtonText}
        confirmBtnText={deleteMessagePromt.YesButtonText}
        doOpen={showDeleteConfirmation}
        closeCallback={UploadMsgOnClose}
        confirmCallback={handleDelete}
      />
      <ModalDialog
        dialogText={uploadMessageCurrent.Title}
        dialogSubtext={uploadMessageCurrent.Description}
        confirmBtnText={"To Products"}
        closeBtnText={uploadMessageCurrent.ButtonText}
        doOpen={showUploadStatus}
        closeCallback={UploadMsgOnClose}
        toProductsCallback={handleDiscard}
        productDeleted={productDeleted}
      />
      <DashPageHeader
        icon={<PencilSquareIcon className="h-8 w-8" />}
        text={"Editing Product - " + params.productID}
        isLoading={isProductLoading || isOwnerLoading}
        showBackBtn={false}
      />
      {isOwnerLoading ||
        (isProductLoading && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
            <span className="font-semibold lg:text-xl">Preparing Form</span>
            <span className="font-light text-xs lg:text-sm">Please wait</span>
          </section>
        ))}

      {(owner && owner.ownerDetails.length == 0) ||
        (product && product.data == null && !isProductLoading && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
            <span className="font-semibold lg:text-xl">
              Sorry, there was an error while loading data
            </span>
            <span className="font-light text-xs lg:text-sm">
              Please refresh the page if you still see an error after 30 secs
            </span>
          </section>
        ))}

      {isOwnerError ||
        (isProductError && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
            <span className="font-semibold lg:text-xl">
              Sorry, there was an error while loading data
            </span>
            <span className="font-light text-xs lg:text-sm">
              Please refresh the page if you still see an error after 30 secs
            </span>
          </section>
        ))}

      {owner &&
        owner.ownerDetails.length > 0 &&
        !isOwnerError &&
        product &&
        product.data != null &&
        !isProductError &&
        fields.companyID != "" &&
        owner.companyList && (
          <form className="flex flex-col gap-6 items-center w-full h-full overflow-auto -mt-6">
            <section className="flex px-6 gap-4 w-full items-center justify-center">
              <ProductUploadCard_Model
                handleFile={handleFile}
                fieldsData={fields}
              />
            </section>

            <section className="flex px-6 gap-4 w-full items-center justify-center">
              <ProductUploadCard_About
                companyList={owner.companyList}
                handleChange={handleChange}
                handleDropdown={handleDropdown}
                fieldsData={fields}
              />
            </section>

            <section className="flex px-6 gap-4 w-full items-center justify-center">
              <ProductUploadCard_Sizes
                handleChange={handleChange}
                handleDropdown={handleDropdown}
                fieldsData={fields}
              />
            </section>

            <section className="flex px-6 gap-4 w-full items-center justify-center">
              <ProductUploadCard_Pricing
                handleChange={handleChange}
                handleDropdown={handleDropdown}
                fieldsData={fields}
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
                    <span>Please Wait...</span>
                  </>
                )}

                {!isUploading && (
                  <>
                    <span>
                      <CloudArrowUpIcon className="h-6 w-6" />
                    </span>
                    <span>Update Product</span>
                  </>
                )}
              </button>
              <button
                disabled={isUploading}
                onClick={promtDelete}
                className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-red-500 hover:bg-red-700 disabled:bg-red-500/40 transition-all"
              >
                {isUploading && (
                  <>
                    <LoadingIndicator />
                    <span>Please Wait...</span>
                  </>
                )}

                {!isUploading && (
                  <>
                    <span>
                      <TrashIcon className="h-6 w-6" />
                    </span>
                    <span>Delete</span>
                  </>
                )}
              </button>
            </section>
          </form>
        )}
    </main>
  );
};

export default EditProduct;
