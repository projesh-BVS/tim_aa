import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const Plugin_CodeGenerator = ({
  pluginMode,
  companyID = -1,
  productSKU = "-1",
  col_BG_Normal,
  col_BG_Hover,
  col_Txt_Normal,
  col_Txt_Hover,
  height_Btn,
  radius_Corner,
  callback_OnGenerateCode,
}) => {
  const liquidCode = `
{% if product %}  
  <style>
    #tryItFirstButton {
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    #tryItFirstButton:hover {
      background-color: ${col_BG_Hover} !important;
      color: ${col_Txt_Hover} !important;
    }
  </style>
  <a id="tryItFirstButton" href="https://shringar.tryitfirst.in/plugin/{{ product.variants.first.sku }}?companyID=${companyID}" style="
    background-color: ${col_BG_Normal};
    color: ${col_Txt_Normal};
    height: ${height_Btn}px;
    border-radius: ${radius_Corner}px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    border: none;
    font-family: inherit; /* Inherit font family from theme */
    font-size: inherit; /* Inherit font size from theme */
    text-decoration: none; /* Remove underline from link text */
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  ">
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px; /* Adjust padding for better spacing */
      height: calc(${height_Btn}px - 10px); /* Adjust height to fit padding */
      aspect-ratio: 1;
      background-color: white;
      border-radius: ${radius_Corner - 2}px;
    ">
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      ">
        <img src="https://brandlogo.s3.ap-south-1.amazonaws.com/TIF_Bag_Logo.svg" alt="TryItFirst Logo" style="
          width: 100%;
          height: 100%;
        ">
      </div>
    </div>
    <h1 style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-weight: 500;
      font-size: inherit; /* Inherit font size from theme */
      margin: 0; /* Remove margin from h1 */
      color: ${col_Txt_Normal}; /* Apply text color */
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    ">
      Try It On Yourself
    </h1>
  </a>
{% else %}
  <p>Product SKU not available. Ensure this block is used on a product page.</p>
{% endif %}
  `;
  const magentoCodeDev = `
  -- Magento Plugin is under development --   
  Col BG Normal: ${col_BG_Normal} | Col BG Hover: ${col_BG_Hover}
  Col Text Normal: ${col_Txt_Normal} | Col Text Hover: ${col_Txt_Hover}
  Button Height: ${height_Btn} | Button Radius: ${radius_Corner} | Product SKU: ${productSKU}
  `;
  const magentoCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      #tryItFirstButton {
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
      }
      #tryItFirstButton:hover {
        background-color: ${col_BG_Hover} !important;
        color: ${col_Txt_Hover} !important;
      }
    </style>
  </head>

  <body>
    <a id="tryItFirstButton" href="https://shringar.tryitfirst.in/plugin/${productSKU}?companyID=${companyID}" style="
      background-color: ${col_BG_Normal};
      color: ${col_Txt_Normal};
      height: ${height_Btn}px;
      border-radius: ${radius_Corner}px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 5px;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      border: none;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        height: calc(${height_Btn}px - 10px); /* Adjust height to fit padding */
        aspect-ratio: 1;
        background-color: white;
        border-radius: ${radius_Corner - 2}px;
      ">
        <img src="https://brandlogo.s3.ap-south-1.amazonaws.com/TIF_Bag_Logo.svg" alt="TryItFirst Logo" style="
          width: 100%;
          height: 100%;
        ">
      </div>
      <h1 style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: inherit;
        margin: 0;
        color: ${col_Txt_Normal}; /* Apply text color */
        transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      ">
        Try It On Yourself
      </h1>
    </a>
</body>
</html>`;
  const [isCodeHidden, setIsCodeHidden] = useState(true);

  useEffect(() => {
    pluginMode == "Shopify" && callback_OnGenerateCode(liquidCode);
    pluginMode == "Magento" && callback_OnGenerateCode(magentoCode);
    setIsCodeHidden(UpdateCodeVisibility());
  }, [
    companyID,
    productSKU,
    col_BG_Normal,
    col_BG_Hover,
    col_Txt_Normal,
    col_Txt_Hover,
    height_Btn,
    radius_Corner,
  ]);

  function UpdateCodeVisibility() {
    if (pluginMode == "Shopify") return companyID == -1;
    else if (pluginMode == "Magento")
      return companyID == -1 || productSKU == -1;
    else return true;
  }

  return (
    <div className="relative flex p-4 w-full h-full max-h-28 bg-slate-600 text-white text-xs font-light rounded-md overflow-clip transition-all">
      <code
        className={`overflow-y-auto $ ${
          isCodeHidden ? "blur-sm" : "blur-none"
        }`}
        style={{ userSelect: isCodeHidden ? "none" : "auto" }}
      >
        {pluginMode == "Shopify" && liquidCode}
        {pluginMode == "Magento" && magentoCode}
      </code>

      <div
        className={`${
          isCodeHidden ? "flex items-center justify-center" : "hidden"
        } absolute top-0 left-0 right-0 bottom-0 bg-black/40 text-white`}
      >
        <div className="flex items-center justify-center px-4 py-2 gap-2 max-w-[80%] text-sm font-normal bg-red-500 rounded-md shadow-md animate-loginInvalid">
          <ExclamationTriangleIcon className="shrink-0 h-5 w-5" />
          {pluginMode == "Shopify" && (
            <h1>Please select a company to generate plugin code</h1>
          )}
          {pluginMode == "Magento" && (
            <h1>Please select a company & product to generate plugin code</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plugin_CodeGenerator;
