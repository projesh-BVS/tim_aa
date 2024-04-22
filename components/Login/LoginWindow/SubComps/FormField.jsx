import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const FormField = ({
  fieldID,
  fieldName,
  fieldType,
  fieldLabel,
  fieldIcon,
  autoComplete = null,
  handleChange,
}) => {
  const [isVisible_Pass, setIsVisible_Pass] = useState(false);

  return (
    <div className="relative flex items-center justify-center gap-2 w-full peer-placeholder-shown:bg-red-500">
      <input
        id={fieldID}
        name={fieldName}
        type={
          fieldType != "password"
            ? fieldType
            : isVisible_Pass
            ? "text"
            : "password"
        }
        autoComplete={autoComplete}
        className="
                    peer
                    h-11 w-full px-4
                    rounded-none border-2
                    
                    border-transparent
                    border-b-tif-blue
                    text-tif-blue
                    
                    hover:border-tif-lavender
                    hover:rounded-lg
                    
                    focus:outline-none
                    focus:bg-transparent
                    focus:text-tif-lavender
                    focus:border-tif-lavender
                    focus:rounded-lg
                    
                    placeholder:text-transparent
                    
                    transition-all"
        placeholder={fieldLabel}
        onChange={handleChange}
      />
      <label
        htmlFor={fieldID}
        className="
                    absolute
                    flex
                    items-center
                    justify-center
                    left-2
                    -top-3.5                    
                    px-2
                    gap-4
                    
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
                    
                    peer-focus:-top-3.5
                    peer-focus:gap-2
                    peer-focus:bg-white
                    peer-focus:text-tif-lavender
                    peer-focus:text-sm
                    peer-focus:font-medium"
      >
        {fieldIcon}
        {fieldLabel}
      </label>
      {fieldType == "password" && (
        <button
          className="absolute right-2 text-tif-blue hover:text-tif-lavender transition-all"
          onClick={(e) => {
            e = e || window.event;
            e.preventDefault();
            setIsVisible_Pass((prev) => !prev);
          }}
        >
          {isVisible_Pass && <EyeIcon className="h-5 w-5" />}
          {!isVisible_Pass && <EyeSlashIcon className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
};

export default FormField;
