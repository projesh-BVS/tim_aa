import { useState } from "react";
import OwnerSearchField from "./OwnerSearchField";

const OwnerSearchSelector = ({
  isAutoSearch = false,
  fieldID,
  fieldValue = "",
  fieldName,
  fieldType,
  fieldLabel,
  callback_SearchString,
}) => {
  const [searchString, setSearchString] = useState("");

  const onHandleChange = async (e) => {
    e.preventDefault();

    if (e.target.value && e.target.value != null && e.target.value.length > 0)
      setSearchString(e.target.value);
    else setSearchString("");

    if (isAutoSearch) callback_SearchString(e.target.value);
  };

  const onHandleSubmit = async () => {
    callback_SearchString(searchString);
  };

  return (
    <form className="flex shrink-0 justify-between md:justify-center items-center gap-4 h-10 w-full md:w-96">
      <OwnerSearchField
        fieldID={fieldID}
        fieldName={fieldName}
        fieldType={fieldType}
        fieldLabel={fieldLabel}
        fieldValue={fieldValue}
        handleChange={onHandleChange}
        handleSubmit={onHandleSubmit}
      />
    </form>
  );
};

export default OwnerSearchSelector;
