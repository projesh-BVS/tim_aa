const FormField = ({ fieldID, fieldName, fieldType, fieldLabel }) => {
    return (
        <div className="relative peer-placeholder-shown:bg-red-500">
            <input
                id={fieldID}
                name={fieldName}
                type={fieldType}
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
            />
            <label
                htmlFor={fieldID}
                className="
                    absolute
                    left-2
                    -top-3.5
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
                    peer-placeholder-shown:top-2
                    
                    peer-focus:-top-3.5
                    peer-focus:bg-white
                    peer-focus:text-tif-lavender
                    peer-focus:text-sm
                    peer-focus:font-medium"
            >
                {fieldLabel}
            </label>
        </div>
    );
};

export default FormField;