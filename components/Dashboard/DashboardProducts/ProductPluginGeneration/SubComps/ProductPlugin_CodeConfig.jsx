import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Plugin_CompanySelector from "../UI/Plugin_CompanySelector";
import Plugin_Btn_CopyCode from "../UI/Plugin_Btn_CopyCode";
import Plugin_CodeGenerator from "../UI/Plugin_CodeGenerator";
import Plugin_ProductSelector from "../UI/PluginProductSelector";

const ProductPlugin_CodeConfig = ({
  companies,
  products,
  pluginMode,
  btnStyle,
}) => {
  const [selectedCompany, setSelectedCompany] = useState(-1);
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [genereatedCode, setGeneratedCode] = useState("");

  const Callback_OnGenerate_Code = (val) => {
    setGeneratedCode(val);
  };

  useEffect(() => {
    setSelectedProduct(-1);
  }, [selectedCompany]);

  return (
    <section className="flex flex-col items-center justify-center h-auto md:h-2/5 w-full animate-slideInSpringedLeft animate-delay-75">
      <div className="flex flex-col md:flex-row shrink-0 items-center justify-between p-2 px-5 gap-2 w-full md:h-14 text-gray-900">
        <div className="flex items-center justify-start gap-2 w-full md:w-fit whitespace-nowrap">
          <CodeBracketIcon className="w-5 h-5" />
          <h1 className="font-bold text-base md:text-lg">Plugin Code</h1>
        </div>
        <div className="flex items-center justify-end gap-2 h-full w-full">
          <Plugin_CompanySelector
            companies={companies}
            selectedCompany={selectedCompany}
            onChange={setSelectedCompany}
          />
          {pluginMode == "Magento" && (
            <Plugin_ProductSelector
              products={products}
              selectedProduct={selectedProduct}
              selectedCompany={selectedCompany}
              onChange={setSelectedProduct}
            />
          )}

          <Plugin_Btn_CopyCode
            codeString={genereatedCode}
            selectedCompany={selectedCompany}
            selectedProduct={selectedProduct}
            pluginMode={pluginMode}
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 w-full h-full">
        <Plugin_CodeGenerator
          pluginMode={pluginMode}
          companyID={selectedCompany}
          productSKU={selectedProduct}
          col_BG_Normal={btnStyle.color_Btn_BG_Normal}
          col_BG_Hover={btnStyle.color_Btn_BG_Hover}
          col_Txt_Normal={btnStyle.color_Btn_Txt_Normal}
          col_Txt_Hover={btnStyle.color_Btn_Txt_Hover}
          height_Btn={btnStyle.height_Btn}
          radius_Corner={btnStyle.radius_Corner}
          callback_OnGenerateCode={Callback_OnGenerate_Code}
        />
      </div>
    </section>
  );
};

export default ProductPlugin_CodeConfig;
