const OutletUploadFormField = ({
  disabled = false,
  fieldID,
  fieldName,
  fieldType,
  fieldLabel,
  multiline = false,
  resizable = true,
  fieldValue = "",
  handleChange,
}) => {
  if (multiline) {
    return (
      <div className="relative peer-placeholder-shown:bg-red-500 w-full">
        <textarea
          id={fieldID}
          name={fieldName}
          type={fieldType}
          defaultValue={fieldValue}
          disabled={disabled}
          className={`
          ${resizable ? "resize-y" : "resize-none"}
                    peer
                    min-h-[10rem] w-full px-4 pt-2
                    rounded-lg border-2                    
                    
                    border-tif-blue
                    text-tif-blue
                    
                    hover:border-[3px]
                    hover:border-tif-lavender
                    hover:text-tif-lavender                    
                    hover:rounded-lg                    
                    
                    focus:outline-none
                    focus:bg-transparent
                    focus:text-tif-lavender
                    focus:border-tif-lavender
                    focus:rounded-lg

                    disabled:border-slate-400
                    disabled:text-slate-400
                    disabled:bg-slate-200
                    disabled:pointer-events-none
                    
                    placeholder:text-transparent
                    
                    transition-all`}
          placeholder={fieldLabel}
          onChange={handleChange}
        />
        <label
          disabled={disabled}
          htmlFor={fieldID}
          className="
                    absolute
                    left-2
                    -top-3
                    px-2
                    
                    bg-white
                    text-tif-blue
                    text-sm
                    font-medium
                    
                    transition-all
                    
                    peer-placeholder-shown:bg-transparent
                    peer-placheholder-shown:text-base
                    peer-placeholder-shown:font-normal
                    peer-placeholder-shown:text-gray-400
                    peer-placeholder-shown:top-3
                    
                    peer-focus:-top-3
                    peer-focus:bg-white
                    peer-focus:text-tif-lavender
                    peer-focus:text-sm
                    peer-focus:font-medium
                    
                    rounded-md"
        >
          {fieldLabel}
        </label>
      </div>
    );
  } else {
    return (
      <div className="relative peer-placeholder-shown:bg-red-500 w-full">
        <input
          id={fieldID}
          name={fieldName}
          type={fieldType}
          defaultValue={fieldValue}
          disabled={disabled}
          className="
                    peer
                    h-11 w-full px-4
                    rounded-lg border-2                    
                    
                    border-tif-blue
                    text-tif-blue
                    
                    hover:border-[3px]
                    hover:border-tif-lavender
                    hover:text-tif-lavender                    
                    hover:rounded-lg                    
                    
                    focus:outline-none
                    focus:bg-transparent
                    focus:text-tif-lavender
                    focus:border-tif-lavender                    
                    focus:rounded-lg

                    disabled:border-slate-400
                    disabled:text-slate-400
                    disabled:bg-slate-200
                    disabled:pointer-events-none
                    
                    placeholder:text-transparent
                    
                    transition-all"
          placeholder={fieldLabel}
          onChange={handleChange}
        />
        <label
          disabled={disabled}
          htmlFor={fieldID}
          className="
                    absolute
                    left-2
                    -top-3
                    px-2
                    
                    bg-white
                    text-tif-blue
                    text-sm
                    font-medium
                    
                    transition-all
                    
                    peer-placeholder-shown:bg-transparent
                    peer-placheholder-shown:text-base
                    peer-placeholder-shown:font-normal
                    peer-placeholder-shown:text-gray-400
                    peer-placeholder-shown:top-3
                    
                    peer-focus:-top-3
                    peer-focus:bg-white
                    peer-focus:text-tif-lavender
                    peer-focus:text-sm
                    peer-focus:font-medium
                    
                    rounded-md"
        >
          {fieldLabel}
        </label>
      </div>
    );
  }
};

export default OutletUploadFormField;
