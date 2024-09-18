const Plugin_ColorPicker = ({
  label = "Label",
  val_Current,
  Callback_OnChange_Color,
}) => {
  return (
    <div className="flex items-center justify-center px-[0.125rem] w-full h-full gap-2 pl-2 text-xs bg-gray-500/20 rounded-full">
      <h1>{label}</h1>
      <input
        type="color"
        id="color-input"
        value={val_Current}
        onChange={Callback_OnChange_Color}
      />
    </div>
  );
};

export default Plugin_ColorPicker;
