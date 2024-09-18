import {
  AdjustmentsVerticalIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsUpDownIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  EyeIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Plugin_PreviewButton from "../UI/Plugin_PreviewButton";
import Plugin_ColorPicker from "../UI/Plugin_ColorPicker";
import Plugin_RangeSlider from "../UI/Plugin_RangeSlider";

const ProductPlugin_StyleConfig = ({
  btnStyle_Default,
  btnStyle_Loaded,
  callback_OnUpdate,
  callback_OnLoad,
  callback_OnSave,
}) => {
  const [disabled_Default, setDisabled_Default] = useState(true);
  const [disabled_Load, setDisabled_Load] = useState(false);
  const [disabled_Save, setDisabled_Save] = useState(false);

  const [btnStyle_Current, setBtnStyle_Current] = useState(btnStyle_Default);

  const Callback_OnClick_Default = () => {
    setBtnStyle_Current(btnStyle_Default);
    setDisabled_Default(true);
  };

  const Callback_OnClick_Load = async () => {
    callback_OnLoad();
  };

  const Callback_OnClick_Save = () => {
    console.log("Save Cloud Clicked");
    callback_OnSave();
  };

  const Callback_OnUpdate_BtnStyle = (updatedStyle) => {
    setBtnStyle_Current(updatedStyle);
  };

  function CheckStyle_IsSame(style1, style2) {
    if (
      style1.color_Btn_BG_Normal == style2.color_Btn_BG_Normal &&
      style1.color_Btn_BG_Hover == style2.color_Btn_BG_Hover &&
      style1.color_Btn_Txt_Normal == style2.color_Btn_Txt_Normal &&
      style1.color_Btn_Txt_Hover == style2.color_Btn_Txt_Hover &&
      style1.height_Btn == style2.height_Btn &&
      style1.radius_Corner == style2.radius_Corner
    )
      return true;
    else return false;
  }

  useEffect(() => {
    callback_OnUpdate(btnStyle_Current);
    setDisabled_Default(CheckStyle_IsSame(btnStyle_Current, btnStyle_Default));
    setDisabled_Load(
      btnStyle_Loaded != null
        ? CheckStyle_IsSame(btnStyle_Current, btnStyle_Loaded)
        : false
    );
    setDisabled_Save(
      btnStyle_Loaded != null
        ? CheckStyle_IsSame(btnStyle_Current, btnStyle_Loaded)
        : false
    );
  }, [btnStyle_Current]);

  useEffect(() => {
    if (btnStyle_Loaded != null) {
      setBtnStyle_Current(btnStyle_Loaded);
      console.log(btnStyle_Loaded);
    }
  }, [btnStyle_Loaded]);

  return (
    <section className="flex flex-col items-center justify-center h-auto md:h-3/5 w-full animate-slideInSpringedLeft">
      <StyleConfig_Header
        isDisabled_Default={disabled_Default}
        isDisabled_Load={disabled_Load}
        isDisabled_Save={disabled_Save}
        callback_OnClick_Default={Callback_OnClick_Default}
        callback_OnClick_Load={Callback_OnClick_Load}
        callback_OnClick_Save={Callback_OnClick_Save}
      />

      <div className="flex flex-col md:flex-row items-center justify-center px-5 mb-5 gap-4 w-full h-full">
        {/* Style Preview */}
        <Config_Preview btnStyle={btnStyle_Current} />
        {/* Style Controls */}
        <Config_Settings
          btnStyle={btnStyle_Current}
          callback_OnUpdate={Callback_OnUpdate_BtnStyle}
        />
      </div>
    </section>
  );
};

export default ProductPlugin_StyleConfig;

const StyleConfig_Header = ({
  isDisabled_Default,
  isDisabled_Load,
  isDisabled_Save,
  callback_OnClick_Default,
  callback_OnClick_Load,
  callback_OnClick_Save,
}) => {
  return (
    <div className="flex flex-col md:flex-row shrink-0 items-center justify-between p-2 px-5 gap-2 w-full md:h-14 text-gray-900">
      <div className="flex items-center justify-start gap-2 w-full">
        <AdjustmentsVerticalIcon className="w-5 h-5" />
        <h1 className="font-bold text-base md:text-lg">Style Configuration</h1>
      </div>

      <div className="flex items-center justify-end gap-2 h-full w-full">
        <Config_Button
          icon={<ArrowPathIcon className="w-5 h-5" />}
          label={"Default"}
          tooltip={"Resets the style to the default TIF style"}
          col_Normal={"tif-blue"}
          col_Hover={"tif-lavender"}
          col_Disabled={"tif-blue/40"}
          align="left"
          isDisabled={isDisabled_Default}
          callback_OnClick={callback_OnClick_Default}
        />
        <Config_Button
          icon={<CloudArrowDownIcon className="w-5 h-5 " />}
          label={"Load"}
          tooltip={
            "Loads the style you have saved previously, or the default TIF style if no style has been saved previously"
          }
          col_Normal={"yellow-500"}
          col_Hover={"yellow-600"}
          col_Disabled={"yellow-500/40"}
          align="center"
          isDisabled={isDisabled_Load}
          callback_OnClick={callback_OnClick_Load}
        />
        <Config_Button
          icon={<CloudArrowUpIcon className="w-5 h-5" />}
          label={"Save"}
          tooltip={"Saves the current style you have configured"}
          col_Normal={"green-500"}
          col_Hover={"green-600"}
          col_Disabled={"green-500/40"}
          align="right"
          isDisabled={isDisabled_Save}
          callback_OnClick={callback_OnClick_Save}
        />
      </div>
    </div>
  );
};

const Config_Button = ({
  icon,
  label,
  tooltip,
  col_Normal,
  col_Hover,
  col_Disabled,
  align = "center",
  isDisabled,
  callback_OnClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  let colorNormal = "bg-" + col_Normal;
  let colorHover = "hover:bg-" + col_Hover;
  let colorDisabled = "disabled:bg-" + col_Disabled;

  return (
    <button
      disabled={isDisabled}
      className={`relative flex whitespace-nowrap items-center justify-center gap-2 p-2 pr-4 w-full md:w-fit h-full font-medium text-sm text-white hover:shadow-md disabled:pointer-events-none rounded-md transition-all ${
        colorNormal ? colorNormal : "bg-yellow-500"
      } ${colorHover ? colorHover : "hover:bg-yellow-600"} ${
        colorDisabled ? colorDisabled : "disabled:bg-yellow-500/40"
      }`}
      onClick={callback_OnClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {icon}
      <h1>{label}</h1>
      <div
        className={`absolute flex top-12 items-center justify-center p-2 w-40 bg-tif-pink rounded-md shadow-lg whitespace-break-spaces transition-all ${
          isHovering
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        } ${align == "right" ? "right-0" : align == "left" ? "left-0" : ""}`}
      >
        <div
          className={`absolute -top-1.5 w-4 h-4 rotate-45 bg-tif-pink ${
            align == "right" ? "right-4" : align == "left" ? "left-4" : ""
          }`}
        />
        <h1 className="font-normal text-xs italic">{tooltip}</h1>
      </div>
    </button>
  );
};

const Config_Preview = ({ btnStyle }) => {
  const [color_PreviewBG, setColor_PreviewBG] = useState("bg-gray-500");

  return (
    <div
      className={`flex flex-col items-center justify-center w-full md:w-2/5 h-full divide-y divide-tif-blue rounded-md transition-all overflow-clip ${color_PreviewBG}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 w-full">
        <div className="flex items-center justify-start gap-2 font-black text-base md:text-lg text-gray-400">
          <EyeIcon className="w-5 h-5" />
          <h1>Preview</h1>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className={`w-5 h-5 bg-white border-2 rounded-full transition-all ${
              color_PreviewBG == "bg-gray-100"
                ? "border-red-300"
                : "border-white shadow-md"
            }`}
            onClick={() => setColor_PreviewBG("bg-gray-100")}
          />
          <button
            className={`w-5 h-5 bg-gray-600 border-2 rounded-full transition-all ${
              color_PreviewBG == "bg-gray-500"
                ? "border-red-300"
                : "border-gray-600 shadow-md"
            }`}
            onClick={() => setColor_PreviewBG("bg-gray-500")}
          />
          <button
            className={`w-5 h-5 bg-black border-2 rounded-full transition-all ${
              color_PreviewBG == "bg-gray-900"
                ? "border-red-300"
                : "border-gray-900 shadow-md"
            }`}
            onClick={() => setColor_PreviewBG("bg-gray-900")}
          />
        </div>
      </div>
      {/* Body */}
      <div className="flex items-center justify-center p-4 w-full h-24 md:h-full">
        <Plugin_PreviewButton
          col_BG_Normal={btnStyle.color_Btn_BG_Normal}
          col_BG_Hover={btnStyle.color_Btn_BG_Hover}
          col_Txt_Normal={btnStyle.color_Btn_Txt_Normal}
          col_Txt_Hover={btnStyle.color_Btn_Txt_Hover}
          radius_Corner={btnStyle.radius_Corner}
          height_Btn={btnStyle.height_Btn}
        />
      </div>
    </div>
  );
};

const Config_Settings = ({ btnStyle, callback_OnUpdate }) => {
  let minHeight_Btn = 46; //in px
  let maxHeight_Btn = 66; //in px
  let minRadius_Corner = 0; //in px
  let maxRadius_Corner = maxHeight_Btn / 2; //in px

  const [color_Btn_BG_Normal, setColor_Btn_BG_Normal] = useState(
    btnStyle.color_Btn_BG_Normal
  );
  const [color_Btn_BG_Hover, setColor_Btn_BG_Hover] = useState(
    btnStyle.color_Btn_BG_Hover
  );
  const [color_Btn_Txt_Normal, setColor_Btn_Txt_Normal] = useState(
    btnStyle.color_Btn_Txt_Normal
  );
  const [color_Btn_Txt_Hover, setColor_Btn_Txt_Hover] = useState(
    btnStyle.color_Btn_Txt_Hover
  );
  const [height_Btn, setHeight_Btn] = useState(btnStyle.height_Btn);
  const [radius_Corner, setRadius_Corner] = useState(btnStyle.radius_Corner);

  const Callback_OnChange_Color_BtnBG_Normal = (e) => {
    setColor_Btn_BG_Normal(e.target.value);
  };

  const Callback_OnChange_Color_BtnBG_Hover = (e) => {
    setColor_Btn_BG_Hover(e.target.value);
  };

  const Callback_OnChange_Color_BtnTxt_Normal = (e) => {
    setColor_Btn_Txt_Normal(e.target.value);
  };

  const Callback_OnChange_Color_BtnTxt_Hover = (e) => {
    setColor_Btn_Txt_Hover(e.target.value);
  };

  const Callback_OnChange_Height = (val) => {
    setHeight_Btn(val);
  };

  const Callback_OnChange_Radius = (val) => {
    setRadius_Corner(val);
  };

  function UpdateBtnStyle() {
    let updatedStyle = {
      color_Btn_BG_Normal: color_Btn_BG_Normal,
      color_Btn_BG_Hover: color_Btn_BG_Hover,
      color_Btn_Txt_Normal: color_Btn_Txt_Normal,
      color_Btn_Txt_Hover: color_Btn_Txt_Hover,
      height_Btn: parseInt(height_Btn),
      radius_Corner: parseInt(radius_Corner),
    };

    callback_OnUpdate(updatedStyle);
  }

  //Outputing updated button style to parent component
  useEffect(() => {
    UpdateBtnStyle();
  }, [
    color_Btn_BG_Normal,
    color_Btn_BG_Hover,
    color_Btn_Txt_Normal,
    color_Btn_Txt_Hover,
    height_Btn,
    radius_Corner,
  ]);

  //Inputing button style from parent component
  useEffect(() => {
    setColor_Btn_BG_Normal(btnStyle.color_Btn_BG_Normal);
    setColor_Btn_BG_Hover(btnStyle.color_Btn_BG_Hover);
    setColor_Btn_Txt_Normal(btnStyle.color_Btn_Txt_Normal);
    setColor_Btn_Txt_Hover(btnStyle.color_Btn_Txt_Hover);
    setHeight_Btn(btnStyle.height_Btn);
    setRadius_Corner(btnStyle.radius_Corner);
  }, [btnStyle]);

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-3/5 h-full bg-gray-100 divide-y divide-tif-blue rounded-md transition-all overflow-clip">
      {/* Header */}
      <div className="flex items-center justify-start px-2 py-1 w-full gap-2 font-black text-base md:text-lg text-gray-400">
        <Cog6ToothIcon className="w-5 h-5" />
        <h1>Settings</h1>
      </div>
      {/* Body */}
      <div className="flex flex-col items-center justify-between px-2 py-4 gap-2 w-full h-full text-xs md:text-sm">
        <Settings_Color
          icon={<SwatchIcon className="w-5 h-5" />}
          name={"BG Color"}
          value_Current_Normal={color_Btn_BG_Normal}
          value_Current_Hover={color_Btn_BG_Hover}
          callback_OnChange_Normal={Callback_OnChange_Color_BtnBG_Normal}
          callback_OnChange_Hover={Callback_OnChange_Color_BtnBG_Hover}
        />

        <Settings_Color
          icon={<SwatchIcon className="w-5 h-5" />}
          name={"Text Color"}
          value_Current_Normal={color_Btn_Txt_Normal}
          value_Current_Hover={color_Btn_Txt_Hover}
          callback_OnChange_Normal={Callback_OnChange_Color_BtnTxt_Normal}
          callback_OnChange_Hover={Callback_OnChange_Color_BtnTxt_Hover}
        />

        <Settings_Range
          icon={<ArrowsUpDownIcon className="w-5 h-5" />}
          name={"Button Height"}
          value_Min={minHeight_Btn}
          value_Max={maxHeight_Btn}
          value_Current={height_Btn}
          callback_OnChange={Callback_OnChange_Height}
        />

        <Settings_Range
          icon={<ArrowPathRoundedSquareIcon className="w-5 h-5" />}
          name={"Corner Radius"}
          value_Min={minRadius_Corner}
          value_Max={maxRadius_Corner}
          value_Current={radius_Corner}
          callback_OnChange={Callback_OnChange_Radius}
        />
      </div>
    </div>
  );
};

const Settings_Color = ({
  icon,
  name,
  value_Current_Normal,
  value_Current_Hover,
  callback_OnChange_Normal,
  callback_OnChange_Hover,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start w-2/5 gap-2">
        {icon}
        <h1>{name}</h1>
      </div>
      <div className="flex items-center justify-start w-3/5 h-full gap-2">
        <Plugin_ColorPicker
          label="Normal"
          val_Current={value_Current_Normal}
          Callback_OnChange_Color={callback_OnChange_Normal}
        />
        <Plugin_ColorPicker
          label="Hover"
          val_Current={value_Current_Hover}
          Callback_OnChange_Color={callback_OnChange_Hover}
        />
      </div>
    </div>
  );
};

const Settings_Range = ({
  icon,
  name,
  value_Min,
  value_Max,
  value_Current,
  callback_OnChange,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start w-2/5 gap-2">
        {icon}
        <h1>{name}</h1>
      </div>
      <div className="flex items-center justify-start w-3/5 h-full gap-2">
        <Plugin_RangeSlider
          val_Min={value_Min}
          val_Max={value_Max}
          val_Current={value_Current}
          callback_Val_Current={callback_OnChange}
        />
      </div>
    </div>
  );
};
