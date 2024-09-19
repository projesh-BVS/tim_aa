import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import ProductPlugin_CodeConfig from "./SubComps/ProductPlugin_CodeConfig";
import ProductPlugin_StyleConfig from "./SubComps/ProductPlugin_StyleConfig";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import axios from "axios";

const ProductPluginModal = ({
  showLogs = true,
  doOpen = false,
  pluginMode,
  companies,
  products,
  callback_OnClose,
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);

  useEffect(() => {
    if (doOpen) OpenModal();
    else CloseModal();
  }, [doOpen]);

  function OpenModal() {
    setIsOpen(true);
  }

  function CloseModal() {
    setIsOpen(false);
    callback_OnClose();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={CloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <ProductPluginWindow
            pluginMode={pluginMode}
            companies={companies}
            products={products}
            callback_OnClose={CloseModal}
            showLogs={showLogs}
          />
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductPluginModal;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}

const ProductPluginWindow = ({
  pluginMode,
  companies,
  products,
  callback_OnClose,
  showLogs,
}) => {
  return (
    <div className="fixed inset-0 lg:left-64 top-16 overflow-y-auto">
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
          <Dialog.Panel className="flex flex-col gap-0 w-full md:max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
            <PluginWindowHeader
              pluginMode={pluginMode}
              callback_OnClose={callback_OnClose}
              showLogs={showLogs}
            />
            <PluginWindowBody
              pluginMode={pluginMode}
              companies={companies}
              products={products}
              showLogs={showLogs}
            />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

const PluginWindowHeader = ({ pluginMode, callback_OnClose, showLogs }) => {
  let logoSrc = "/Logos/" + pluginMode + "_Logo.svg";
  return (
    <div
      className={`flex items-center justify-between p-4 bg-gradient-to-br from-tif-blue to-tif-pink`}
    >
      <Dialog.Title
        as="div"
        className="flex gap-4 items-center text-lg font-medium leading-6 text-white"
      >
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full">
          <Image
            src={logoSrc}
            alt={pluginMode + " Logo"}
            width={20}
            height={20}
          />
        </div>
        <h1>{pluginMode + " Plugin Config"}</h1>
      </Dialog.Title>

      <button
        className="flex items-center justify-center w-8 h-8 text-white hover:bg-white/20 rounded-full transition-all"
        onClick={callback_OnClose}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

const PluginWindowBody = ({ pluginMode, companies, products, showLogs }) => {
  let btnStyle_Default = {
    color_Btn_BG_Normal: "#899CFA",
    color_Btn_BG_Hover: "#8A79FE",
    color_Btn_Txt_Normal: "#FFFFFF",
    color_Btn_Txt_Hover: "#FFFFFF",
    height_Btn: 56, // in px
    radius_Corner: 28, //in px, half of btn height
  };

  const [btnStyle_Loaded, setBtnStyle_Loaded] = useState(null);
  const [btnStyle_Current, setBtnStyle_Current] = useState(btnStyle_Default);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(
    <Cog6ToothIcon className="w-10 h-10 text-tif-blue animate-spin" />
  );
  const [notificationInfo, setNotificationInfo] = useState(
    "Setting Up Configurator"
  );

  const Callback_OnClose_Notification = () => {
    setShowNotification(false);
  };

  const Callback_OnChange_BtnStyle = (btnStyle) => {
    setBtnStyle_Current(btnStyle);
  };

  const Callback_OnLoad_BtnStyle = async () => {
    let ownerID = companies[0].ownerID;
    Log("Should load button style for ownerID - " + ownerID, showLogs);

    setNotificationIcon(
      <CloudArrowDownIcon className="w-10 h-10 text-tif-blue animate-bounce" />
    );
    setNotificationInfo("Loading Style");
    setNotificationLoading(true);
    setShowNotification(true);

    try {
      const response = await axios.get(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/plugin/arbtn?ownerID=" +
          ownerID
      );

      if (response.status === 200) {
        Log(
          "Load Plugin Button Style Successful | Response: " +
            JSON.stringify(response),
          showLogs
        );
        setNotificationLoading(false);
        setNotificationIcon(
          <CheckCircleIcon className="w-10 h-10 text-green-500" />
        );
        setNotificationInfo("Style Loaded Successfully");
        setBtnStyle_Loaded(response.data.data[0]);
      } else {
        Log("Load Plugin Button Style Failed", showLogs);
        setNotificationLoading(false);
        setNotificationIcon(
          <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        );
        setNotificationInfo("Sorry, there was an error");
      }
    } catch (err) {
      Log("Load Plugin Button Style Failed in catch", showLogs);
      setNotificationLoading(false);
      setNotificationIcon(
        <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
      );
      setNotificationInfo("Sorry, there was an error");
    }
  };

  const Callback_OnSave_BtnStyle = async () => {
    let ownerID = companies[0].ownerID;
    Log("Should save button style for ownerID - " + ownerID, showLogs);

    setNotificationIcon(
      <CloudArrowUpIcon className="w-10 h-10 text-tif-blue animate-bounce" />
    );
    setNotificationInfo("Saving Style");
    setNotificationLoading(true);
    setShowNotification(true);

    try {
      const response = await axios.patch(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/plugin/arbtn",
        {
          ownerID: ownerID,
          color_Btn_BG_Normal: btnStyle_Current.color_Btn_BG_Normal,
          color_Btn_BG_Hover: btnStyle_Current.color_Btn_BG_Hover,
          color_Btn_Txt_Normal: btnStyle_Current.color_Btn_Txt_Normal,
          color_Btn_Txt_Hover: btnStyle_Current.color_Btn_Txt_Hover,
          height_Btn: btnStyle_Current.height_Btn,
          radius_Corner: btnStyle_Current.radius_Corner,
        }
      );

      if (response.status === 200) {
        Log(
          "Save Plugin Button Style Successful | Response: " +
            JSON.stringify(response),
          showLogs
        );
        setNotificationLoading(false);
        setNotificationIcon(
          <CheckCircleIcon className="w-10 h-10 text-green-500" />
        );
        setNotificationInfo("Style Saved Successfully");
        setBtnStyle_Loaded(response.data[0]);
      } else {
        Log("Saving Plugin Button Style Failed", showLogs);
        setNotificationLoading(false);
        setNotificationIcon(
          <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        );
        setNotificationInfo("Sorry, there was an error");
      }
    } catch (err) {
      Log("Saving Plugin Button Style Failed in catch", showLogs);
      setNotificationLoading(false);
      setNotificationIcon(
        <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
      );
      setNotificationInfo("Sorry, there was an error");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center mb-5 w-full aspect-video divide-y divide-gray-200 bg-white">
      <ProductPlugin_StyleConfig
        btnStyle_Default={btnStyle_Default}
        btnStyle_Loaded={btnStyle_Loaded}
        callback_OnUpdate={Callback_OnChange_BtnStyle}
        callback_OnLoad={Callback_OnLoad_BtnStyle}
        callback_OnSave={Callback_OnSave_BtnStyle}
      />

      <ProductPlugin_CodeConfig
        companies={companies}
        products={products}
        pluginMode={pluginMode}
        btnStyle={btnStyle_Current}
      />

      <PluginWindowNotification
        doShow={showNotification}
        icon={notificationIcon}
        info={notificationInfo}
        isLoading={notificationLoading}
        callback_OnClose={Callback_OnClose_Notification}
      />
    </section>
  );
};

const PluginWindowNotification = ({
  doShow = false,
  icon,
  info,
  isLoading,
  callback_OnClose,
}) => {
  return (
    <div
      className={`absolute flex flex-col top-0 left-0 right-0 -bottom-5 items-center justify-center gap-8 bg-white/80 text-gray-600 backdrop-blur-md transition-all ${
        doShow
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {icon}
        <h1 className="font-medium">{info}</h1>
      </div>

      <div className="relative flex items-center justify-center w-full h-10">
        <div
          className={`absolute flex items-center justify-center gap-2 transition-all ${
            isLoading
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-5 opacity-0"
          }`}
        >
          <LoadingIndicator margin={0} mini={true} />
          <h1 className="text-xs">Please Wait</h1>
        </div>

        <button
          className={`absolute flex items-center justify-center px-4 py-2 gap-2 bg-tif-blue hover:bg-tif-lavender rounded-md shadow-md transition-all ${
            isLoading
              ? "pointer-events-none -translate-y-5 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          onClick={() => callback_OnClose()}
        >
          <h1 className="text-sm text-white font-medium">Okay</h1>
        </button>
      </div>
    </div>
  );
};
