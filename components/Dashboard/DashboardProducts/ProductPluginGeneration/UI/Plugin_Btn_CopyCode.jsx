import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Plugin_Btn_CopyCode = ({
  codeString,
  selectedCompany,
  selectedProduct,
  pluginMode,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={
        pluginMode == "Shopify"
          ? selectedCompany == -1
          : selectedCompany == -1 || selectedProduct == -1
      }
      className={`relative flex items-center justify-center gap-2 p-2 pr-4 h-full font-medium text-sm text-white bg-green-500 disabled:bg-green-500/40 disabled:pointer-events-none hover:bg-green-600 hover:shadow-md rounded-md overflow-clip transition-all`}
      onClick={handleCopy}
    >
      <div
        className={`flex items-center justify-center w-full h-full gap-2 ${
          isCopied
            ? "animate-slideOutSpringedRight"
            : "animate-slideInSpringedLeft"
        }`}
      >
        <ClipboardIcon className="h-5 w-5" />
        <h1>Copy</h1>
      </div>

      <div
        className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${
          isCopied
            ? "animate-slideInSpringedLeft"
            : "animate-slideOutSpringedRight"
        }`}
      >
        <CheckCircleIcon className="w-5 h-5" />
      </div>
    </button>
  );
};

export default Plugin_Btn_CopyCode;
