import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const OwnerSearchField = ({
  fieldID,
  fieldName,
  fieldType,
  fieldLabel,
  fieldValue,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="relative flex items-center justify-center gap-2 peer-placeholder-shown:bg-red-500 w-full">
      <input
        id={fieldID}
        name={fieldName}
        type={fieldType}
        defaultValue={fieldValue}
        className="                    
                    peer
                    h-10 w-full px-4
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
                    -top-2
                    lg:-top-3
                    px-2
                    gap-2
                    
                    bg-white
                    text-tif-blue
                    text-sm
                    font-medium
                    
                    transition-all
                    
                    peer-placeholder-shown:bg-transparent
                    peer-placheholder-shown:text-base
                    peer-placeholder-shown:font-normal
                    peer-placeholder-shown:text-gray-400
                    peer-placeholder-shown:top-2.5                    
                    
                    peer-focus:-top-2
                    peer-focus:lg:-top-3
                    peer-focus:bg-white
                    peer-focus:text-tif-lavender
                    peer-focus:text-sm
                    peer-focus:font-medium"
      >
        {fieldLabel}
      </label>

      <button
        className="absolute right-1 flex items-center justify-center h-8 aspect-square text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-md transition-all"
        onClick={(e) => {
          e = e || window.event;
          e.preventDefault();
          handleSubmit();
        }}
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default OwnerSearchField;
