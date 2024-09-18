const Plugin_RangeSlider = ({
  isVertical = false,
  val_Min,
  val_Max,
  val_Current,
  callback_Val_Current,
}) => {
  const handleValChange = (e) => {
    callback_Val_Current(e.target.value);
  };

  return (
    <div
      className={`${
        isVertical ? "flex-col" : "flex-row"
      } flex items-center justify-center w-full h-full gap-2`}
    >
      <h1 className="flex items-center justify-center w-16 h-full whitespace-nowrap bg-gray-500/20 text-xs font-normal rounded-full">
        {val_Current + " px"}
      </h1>

      <input
        id={isVertical ? "range-slider-horizontal" : "range-slider-vertical"}
        type="range"
        min={val_Min}
        max={val_Max}
        value={val_Current}
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
    </div>
  );
};

export default Plugin_RangeSlider;
