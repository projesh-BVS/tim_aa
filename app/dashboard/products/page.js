"use client";
import React, { useEffect, useState } from "react";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import { PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useSearchParams } from "next/navigation";
import ProductCompanySelector from "@/components/Dashboard/DashboardProducts/ProductCompanySelector";
import Link from "next/link";
import ProductCard from "@/components/Dashboard/DashboardProducts/ProductCard";
import ProductOffsetModifyModal from "@/components/Dashboard/DashboardProducts/ProductOffsetModification/ProductOffsetModifyModal";

function Products() {
  const [product_OffsetEdit, setProduct_OffsetEdit] = useState(null);
  const [openModal_ProductOffsetEdit, setOpenModal_ProductOffsetEdit] =
    useState(false);

  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.get("model-viewer") ||
          customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.

  const searchParams = useSearchParams();
  const productFilterQuery = searchParams.get("productCompany");
  const initialProductFilter = productFilterQuery
    ? parseInt(productFilterQuery)
    : -1; // Use -1 for "All"

  const { companies, products, isAllProductsLoading, isAllProductsError } =
    useAllProducts();

  const [selectedCompany, setSelectedCompany] = useState(initialProductFilter);

  function Callback_OnEditOffset(product) {
    setProduct_OffsetEdit(product);
    console.log("Product to edit offset set to- " + product.productName);
    Callback_Modal_ProductEditOffset_Open();
  }

  function Callback_Modal_ProductEditOffset_Open() {
    setOpenModal_ProductOffsetEdit(true);
  }

  function Callback_Modal_ProductEditOffset_OnClose_Normal() {
    setOpenModal_ProductOffsetEdit(false);
  }

  function Callback_Modal_ProductEditOffset_OnClose_Notification() {
    setOpenModal_ProductOffsetEdit(false);
  }

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<ShoppingBagIcon className="h-8 w-8" />}
        text="Products"
        isLoading={isAllProductsLoading}
        showBackBtn={true}
      />

      {isAllProductsLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Products</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {isAllProductsError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {!isAllProductsLoading && !isAllProductsError && (
        <section className="relative flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <ProductOffsetModifyModal
            doOpen={openModal_ProductOffsetEdit}
            productInfo={product_OffsetEdit}
            callback_OnClose_Normal={
              Callback_Modal_ProductEditOffset_OnClose_Normal
            }
            callback_OnClose_Notification={
              Callback_Modal_ProductEditOffset_OnClose_Notification
            }
          />

          <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 lg:p-4 gap-2 rounded-xl shadow-md bg-white">
            <ProductCompanySelector
              companies={companies}
              selectedCompany={selectedCompany}
              onChange={setSelectedCompany}
            />

            <Link
              href={"/dashboard/products/addproduct/"}
              className="w-full md:w-auto"
            >
              <button className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                <PlusIcon className="h-6 w-6" />
                <h1 className="font-semibold text-md">Add Product</h1>
              </button>
            </Link>
          </div>
        </section>
      )}

      {!isAllProductsLoading && !isAllProductsError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 pb-24 gap-4 w-full overflow-auto">
          {products
            .filter(
              (product) =>
                selectedCompany === -1 || product.companyID === selectedCompany
            )
            .map((product, index) => (
              <ProductCard
                key={product.productID}
                index={index}
                productInfo={product}
                display3D={false}
                callback_OnEditOffset={Callback_OnEditOffset}
              />
            ))}
        </div>
      )}
    </main>
  );
}

export default Products;
