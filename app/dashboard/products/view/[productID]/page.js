"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import useCompany from "@/hooks/useCompany";
import useProduct from "@/hooks/useProduct";
import MagentoClipboardCopy from "@/libs/Common Libs/MagentoClipboardCopy";
import { getFormattedPrice } from "@/utils/productInfoUtils";
import {
  ClipboardIcon,
  CodeBracketIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductView = ({ params }) => {
  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );
  const { company, isCompanyLoading, isCompanyError } = useCompany(
    product ? product.data.companyID : null
  );

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<ShoppingBagIcon className="h-8 w-8" />}
        text={"Viewing Product - " + params.productID}
        isLoading={isProductLoading}
        showBackBtn={true}
      />

      {isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Product</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {product && product.data == null && !isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isProductError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {product && product.data != null && !isProductError && (
        <section className="flex flex-col px-6 gap-4 -mt-6 w-full">
          <div className="flex flex-col xl:flex-row gap-4 w-full">
            <div className="relative flex flex-col justify-center items-center w-full xl:w-1/2 h-full min-h-[15rem] gap-4 bg-white shadow-md rounded-lg overflow-clip">
              <Image
                src={product.data.poster}
                blurDataURL={product.data.poster}
                alt="Product Image"
                placeholder="blur"
                quality={100}
                fill
                sizes="15rem"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full text-gray-500">
              <h1 className="text-md xl:text-2xl font-semibold">
                {product.data.productName}
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="text-md xl:text-xl font-semibold text-white bg-tif-blue w-max p-2 rounded-md">
                  {getFormattedPrice(product.data.currency, product.data.price)}
                </h2>
                <div className="flex items-center justify-start w-full h-full gap-2 overflow-x-auto overflow-y-clip">
                  {product.data.productSizes.map((size, index) => (
                    <div
                      key={"ProductSize " + index + size}
                      className="flex items-center justify-center text-sm xl:text-lg font-semibold text-white bg-gray-700 w-max h-full p-2 rounded-md"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm xl:text-lg font-medium italic">
                {product.data.description}
              </p>
            </div>
          </div>

          {
            <div className="flex flex-col w-full bg-gradient-to-br from-tif-blue to-tif-pink font-semibold text-white rounded-lg overflow-clip shadow-md">
              <div className="flex p-2 w-full h-14 items-center justify-between">
                <div className="flex items-center justify-start w-full gap-2">
                  <InformationCircleIcon className="w-6 h-6" />
                  <h1 className="w-full">Additional Info</h1>
                </div>
              </div>

              <div className="flex flex-col w-full text-slate-600 bg-white font-normal">
                <div className="flex w-full items-center justify-between border-b-2">
                  <h1 className="w-1/2 p-4 border-r-2">
                    <span className="font-semibold">ID - </span>
                    {product.data.productID}
                  </h1>
                  <h1 className="w-1/2 p-4">
                    <span className="font-semibold">SKU - </span>
                    {product.data.productSKU
                      ? product.data.productSKU
                      : "Server Error"}
                  </h1>
                </div>
                <div className="flex w-full items-center justify-between border-b-2">
                  {isCompanyLoading && (
                    <div className="p-4">
                      <LoadingIndicator />
                    </div>
                  )}
                  {!isCompanyLoading && company.company && (
                    <h1 className="w-full p-4">
                      <span className="font-semibold">Company - </span>
                      {company?.company[0]?.companyName
                        ? company.company[0].companyName
                        : "Server Error"}
                    </h1>
                  )}
                </div>
                <div className="flex w-full items-center justify-between border-b-2">
                  {isCompanyLoading && (
                    <div className="p-4">
                      <LoadingIndicator />
                    </div>
                  )}
                  {!isCompanyLoading && (
                    <h1 className="w-full p-4">
                      <span className="font-semibold">Outlets - </span>
                      {company?.outletList
                        ? GetOutletNames(
                            product.data.outletIDs,
                            company.outletList
                          )
                        : "Server Error"}
                    </h1>
                  )}
                </div>
                <div className="flex w-full items-center justify-between">
                  <h1 className="w-full p-4">
                    <span className="font-semibold">Category - </span>
                    {product.data.category
                      ? product.data.category
                      : "Server Error"}
                  </h1>
                </div>
              </div>
            </div>
          }

          <div className="flex flex-col w-full bg-gradient-to-br from-tif-blue to-tif-pink font-semibold text-white rounded-lg overflow-clip shadow-md">
            <div className="flex p-2 w-full h-14 items-center justify-between">
              <div className="flex items-center justify-start w-full gap-2">
                <CodeBracketIcon className="w-6 h-6" />
                <h1 className="w-full">Magento Code</h1>
              </div>
              <button
                className="flex items-center justify-center gap-2 p-2 text-white bg-green-500 hover:bg-green-600 hover:shadow-md border-2 border-white/50 rounded-md"
                onClick={() =>
                  MagentoClipboardCopy(
                    product.data.glb,
                    product.data.usdz,
                    product.data.poster
                  )
                }
              >
                <ClipboardIcon className="h-5 w-5" />
                <h1>Copy</h1>
              </button>
            </div>
            {/*<code className="flex p-4 bg-slate-600 text-white font-light">
              &lt;iframe src="https://main.d1vhqgytpq3fa1.amplifyapp.com?src=
              {product.data.glb}&poster={product.data.poster}
              &environmentImage=https://brandlogo.s3.ap-south-1.amazonaws.com/moon_1k.hdr"
              width="px" height="400px" allow="camera" &gt;&lt;/iframe&gt;
            </code>*/}
            <code className="flex p-4 bg-slate-600 text-white font-light">
              &lt;placeholder&gt; "This is a placeholder" &lt;/placeholder&gt;
            </code>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductView;

function GetOutletNames(productOutletIDs, outletList) {
  let outletNames = [];

  for (let outletID of productOutletIDs) {
    const outlet = outletList.find((outlet) => outlet.outletID === outletID);

    if (outlet) {
      outletNames.push(outlet.outletName);
    }
  }

  for (let i = 0; i < outletNames.length - 1; i++) {
    outletNames[i] = outletNames[i] + ", ";
  }

  return outletNames;
}
