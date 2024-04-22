import ModifyForm_Footer from "@/components/Common/ModificationModal/SubComps/ModifyForm_Footer";
import ModifyForm_Header from "@/components/Common/ModificationModal/SubComps/ModifyForm_Header";
import { Dialog, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment, useEffect, useState } from "react";
import ProductViewMirror from "../../ProductViewMirror/ProductViewMirror";
import { useSearchParams } from "next/navigation";

const ProductOffsetModifyWindow = ({
  statusDataUploading,
  productInfo,
  callback_OnSubmit,
  callback_OnClose,
}) => {
  const searchParams = useSearchParams();
  const debugMode = searchParams.get("debug");

  const [showControls, setShowControls] = useState(true);
  const [isUploadingData, setIsUploadingData] = useState(statusDataUploading);
  const [currSize, setCurrSize] = useState(productInfo.sizeFactor);
  const [currOffsetX, setCurrOffsetX] = useState(productInfo.armatureOffsetX);
  const [currOffsetY, setCurrOffsetY] = useState(productInfo.armatureOffsetY);

  useEffect(() => {
    setIsUploadingData(statusDataUploading);
  }, [statusDataUploading]);

  function Callback_OnSizeChange(val) {
    setCurrSize(val);
  }

  function Callback_OnOffsetChange_Vertical(val) {
    setCurrOffsetY(val);
  }

  function Callback_OnOffsetChange_Horizontal(val) {
    setCurrOffsetX(val);
  }

  function Callback_OnToggleControls(e) {
    e.preventDefault();
    setShowControls((prev) => !prev);
  }

  return (
    <div className="fixed inset-0 lg:left-64 overflow-y-auto">
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
          <Dialog.Panel className="flex flex-col gap-0 w-full lg:max-w-5xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
            <ModifyForm_Header
              iconHeader={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
              txtTitle={"Edit Offset"}
              txtSubtitle={productInfo.productName}
              showSubtitle={true}
            />

            <section className="relative flex items-center justify-center mb-2 w-full aspect-video bg-gray-500">
              <OffsetControls
                showControls={showControls}
                offset_Vertical_Max={100}
                offset_Vertical_Curr={currOffsetY}
                offset_Horizontal_Max={100}
                offset_Horizontal_Curr={currOffsetX}
                size_Min={1}
                size_Max={200}
                size_Curr={currSize}
                callback_OnOffsetChange_Vertical={
                  Callback_OnOffsetChange_Vertical
                }
                callback_OnOffsetChange_Horizontal={
                  Callback_OnOffsetChange_Horizontal
                }
                callback_OnSizeChange={Callback_OnSizeChange}
                callback_OnToggleControls={Callback_OnToggleControls}
              />

              <div className="flex items-center justify-center w-full h-full text-white">
                <ProductViewMirror
                  iFrameBaseURLMobile="https://main.d1iyqjpav8ryhy.amplifyapp.com/"
                  iFrameBaseURLDesktop="https://main.d1iyqjpav8ryhy.amplifyapp.com/"
                  productID={productInfo.productID}
                  skeJSON={productInfo.skeJson}
                  texJSON={productInfo.texJson}
                  texPNG={productInfo.texPng}
                  debugMode={debugMode}
                  curr_Size={currSize}
                  curr_Offset_X={currOffsetX}
                  curr_Offset_Y={currOffsetY}
                  switchCam={null}
                  callback_SwitchCam={null}
                />
              </div>
            </section>

            <ModifyForm_Footer
              statusDataUploading={isUploadingData}
              txtSubmitBtn={"Confirm Offsets"}
              txtCancelBtn={"Keep Old Offsets"}
              callback_OnSubmit={callback_OnSubmit}
              callback_OnCancel={callback_OnClose}
            />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default ProductOffsetModifyWindow;

const OffsetControls = ({
  showControls,
  offset_Vertical_Max,
  offset_Vertical_Curr,
  offset_Horizontal_Max,
  offset_Horizontal_Curr,
  size_Min,
  size_Max,
  size_Curr,
  callback_OnOffsetChange_Vertical,
  callback_OnOffsetChange_Horizontal,
  callback_OnSizeChange,
  callback_OnToggleControls,
}) => {
  return (
    <section className="absolute flex top-0 bottom-0 left-0 right-0 p-4 gap-4 z-10">
      {/*<div className="flex flex-col items-center justify-center h-full w-10 rounded-lg overflow-clip shadow-lg">
        <div className="flex items-center justify-center w-full h-full py-4 bg-white">
          <RangeSlider
            isVertical={true}
            val_Min={-offset_Vertical_Max}
            val_Max={offset_Vertical_Max}
            val_Initial={offset_Vertical_Curr}
            callback_Val_Current={callback_OnOffsetChange_Vertical}
          />
        </div>
        <div className="flex shrink-0 flex-col items-center justify-center py-4 gap-4 w-full bg-gradient-to-br from-tif-blue to-tif-pink text-white">
          <ArrowsUpDownIcon className="w-5 h-5" />
        </div>
      </div>*/}

      <div className="flex flex-col items-center justify-between h-full w-full">
        <div className="flex items-center justify-start w-full gap-2">
          <button
            onClick={callback_OnToggleControls}
            className="flex shrink-0 items-center justify-center h-full px-4 gap-4 text-white text-sm font-semibold bg-tif-blue rounded-lg overflow-clip shadow-lg transition-all"
          >
            <h1 className="whitespace-nowrap">
              {showControls ? "Hide Controls" : "View Controls"}
            </h1>
            {showControls && <EyeSlashIcon className="w-5 h-5" />}
            {!showControls && <EyeIcon className="w-5 h-5" />}
          </button>

          <div
            className={`${
              showControls
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } flex w-full h-10 rounded-lg overflow-clip shadow-lg`}
          >
            <div className="flex shrink-0 items-center justify-center px-4 gap-4 bg-gradient-to-br from-tif-blue to-tif-pink text-white">
              <ArrowsPointingOutIcon className="w-5 h-5" />
              <h1 className="font-medium">Size</h1>
              <h1 className="flex items-center justify-center h-8 w-8 font-semibold text-sm text-tif-blue bg-white rounded-full">
                {size_Curr}
              </h1>
            </div>
            <div className="flex items-center justify-center w-full h-full px-4 bg-white">
              <RangeSlider
                val_Min={size_Min}
                val_Max={size_Max}
                val_Initial={size_Curr}
                callback_Val_Current={callback_OnSizeChange}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            showControls
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex flex-col items-center justify-center w-full gap-2 transition-all`}
        >
          <div className="flex w-full h-10 rounded-lg overflow-clip shadow-lg">
            <div className="flex shrink-0 items-center justify-center px-4 gap-4 bg-gradient-to-br from-tif-blue to-tif-pink text-white">
              <ArrowsUpDownIcon className="w-5 h-5" />
              <h1 className="font-medium">Y Offset</h1>
              <h1 className="flex items-center justify-center h-8 w-8 font-semibold text-sm text-tif-blue bg-white rounded-full">
                {offset_Vertical_Curr}
              </h1>
            </div>
            <div className="flex items-center justify-center w-full h-full px-4 bg-white">
              <RangeSlider
                val_Min={-offset_Vertical_Max}
                val_Max={offset_Vertical_Max}
                val_Initial={offset_Vertical_Curr}
                callback_Val_Current={callback_OnOffsetChange_Vertical}
              />
            </div>
          </div>

          <div className="flex w-full h-10 rounded-lg overflow-clip shadow-lg">
            <div className="flex shrink-0 items-center justify-center px-4 gap-4 bg-gradient-to-br from-tif-blue to-tif-pink text-white">
              <ArrowsRightLeftIcon className="w-5 h-5" />
              <h1 className="font-medium">X Offset</h1>
              <h1 className="flex items-center justify-center h-8 w-8 font-semibold text-sm text-tif-blue bg-white rounded-full">
                {offset_Horizontal_Curr}
              </h1>
            </div>
            <div className="flex items-center justify-center w-full h-full px-4 bg-white">
              <RangeSlider
                val_Min={-offset_Horizontal_Max}
                val_Max={offset_Horizontal_Max}
                val_Initial={offset_Horizontal_Curr}
                callback_Val_Current={callback_OnOffsetChange_Horizontal}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RangeSlider = ({
  isVertical = false,
  val_Min,
  val_Max,
  val_Initial,
  callback_Val_Current,
}) => {
  const [valCurr, setValCurr] = useState(val_Initial);

  const handleValChange = (e) => {
    setValCurr(e.target.value);
    callback_Val_Current(e.target.value);
  };

  return (
    <div
      className={`${
        isVertical ? "flex-col" : "flex-row"
      } flex items-center justify-center w-full h-full gap-4`}
    >
      <h1 className="flex items-center justify-center">{val_Min}</h1>
      <input
        id={isVertical ? "range-slider-horizontal" : "range-slider-vertical"}
        type="range"
        min={val_Min}
        max={val_Max}
        value={valCurr}
        onChange={handleValChange}
        className={`${
          isVertical ? "w-2 h-full" : "w-full h-2"
        } bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700`}
        style={
          isVertical
            ? {
                writingMode: "vertical-lr",
                direction: "rtl",
              }
            : {}
        }
      />
      <h1 className="flex items-center justify-center">{val_Max}</h1>
    </div>
  );
};
