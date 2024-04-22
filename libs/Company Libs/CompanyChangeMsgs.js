const msg_Company_Add_Success = {
  Type: "Success",
  Title: "Success",
  Description: "New company added successfully",
  ButtonText: "Close",
};

const msg_Company_Add_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to add new company! Please try again",
  ButtonText: "Close",
};

const msg_Company_Delete_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Company deleted successfully",
  ButtonText: "Close",
};

const msg_Company_Delete_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to delete company! Please try again",
  ButtonText: "Close",
};

const msg_Company_Info_Update_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Company information updated successfully!",
  ButtonText: "Close",
};

const msg_Company_Info_Update_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update company information! Please try again",
  ButtonText: "Close",
};

const msg_Company_Cat_Add_Success = (catName) => {
  let returnMsg = {
    Type: "Success",
    Title: "Success",
    Description: "Category '" + catName + "' added successfully!",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Add_Failure = (catName) => {
  let returnMsg = {
    Type: "Error",
    Title: "Error",
    Description: "Failed to add category '" + catName + "'! Please try again",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Edit_Success = (oldCatName, newCatName) => {
  let returnMsg = {
    Type: "Success",
    Title: "Success",
    Description:
      "Category '" +
      oldCatName +
      "' changed to '" +
      newCatName +
      "' successfully!",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Edit_Failure = (oldCatName, newCatName) => {
  let returnMsg = {
    Type: "Error",
    Title: "Error",
    Description:
      "Failed to change category '" +
      oldCatName +
      "' to '" +
      newCatName +
      "'! Please try again",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Delete_Success = (catName) => {
  let returnMsg = {
    Type: "Success",
    Title: "Success",
    Description: "Category '" + catName + "' deleted successfully!",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Delete_Failure_API = (catName) => {
  let returnMsg = {
    Type: "Error",
    Title: "Error",
    Description:
      "Failed to delete category '" + catName + "'! Please try again",
    ButtonText: "Close",
  };

  return returnMsg;
};

const msg_Company_Cat_Delete_Failure_Product = (catName) => {
  let returnMsg = {
    Type: "Error",
    Title: "Error",
    Description:
      "Cannot delete category '" +
      catName +
      "' as existing product(s) are using this category ! Please update product(s) to use other categories before trying again",
    ButtonText: "Close",
  };

  return returnMsg;
};

export function GetCompanyChangeMsg_Add(isSuccess) {
  return isSuccess ? msg_Company_Add_Success : msg_Company_Add_Failure;
}

export function GetCompanyChangeMsg_Delete(isSuccess) {
  return isSuccess ? msg_Company_Delete_Success : msg_Company_Delete_Failure;
}

export function GetCompanyChangeMsg_Info_Update(isSuccess) {
  return isSuccess
    ? msg_Company_Info_Update_Success
    : msg_Company_Info_Update_Failure;
}

export function GetCompanyChangeMsg_Cat_Add(isSuccess, categoryName) {
  return isSuccess
    ? msg_Company_Cat_Add_Success(categoryName)
    : msg_Company_Cat_Add_Failure(categoryName);
}

export function GetCompanyChangeMsg_Cat_Edit(
  isSuccess,
  oldCategoryName,
  newCategoryName
) {
  return isSuccess
    ? msg_Company_Cat_Edit_Success(oldCategoryName, newCategoryName)
    : msg_Company_Cat_Edit_Failure(oldCategoryName, newCategoryName);
}

export function GetCompanyChangeMsg_Cat_Delete(
  isSuccess,
  categoryName,
  errorMode = ""
) {
  return isSuccess
    ? msg_Company_Cat_Delete_Success(categoryName)
    : errorMode == "API"
    ? msg_Company_Cat_Delete_Failure_API(categoryName)
    : msg_Company_Cat_Delete_Failure_Product(categoryName);
}
