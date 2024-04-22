const msg_Owner_Add_Success = {
  Type: "Success",
  Title: "Success",
  Description: "New owner added successfully",
  ButtonText: "Close",
};

const msg_Owner_Add_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to add new owner! Please try again",
  ButtonText: "Close",
};

const msg_Owner_Edit_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Owner information updated successfully",
  ButtonText: "Close",
};

const msg_Owner_Edit_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update owner information! Please try again",
  ButtonText: "Close",
};

export function GetOwnerMsg_Add(isSuccess) {
  return isSuccess ? msg_Owner_Add_Success : msg_Owner_Add_Failure;
}

export function GetOwnerMsg_Edit(isSuccess) {
  return isSuccess ? msg_Owner_Edit_Success : msg_Owner_Edit_Failure;
}
