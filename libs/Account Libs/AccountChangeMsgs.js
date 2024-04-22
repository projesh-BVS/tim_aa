const msg_Acc_Info_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Profile information updated successfully!",
  ButtonText: "Close",
};

const msg_Acc_Info_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update profile information! Please try again",
  ButtonText: "Close",
};

const msg_Acc_Pass_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Password changed successfully!",
  ButtonText: "Close",
};

const msg_Acc_Pass_Failure_Generic = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to change password! Please try again",
  ButtonText: "Close",
};

const msg_Acc_Pass_OldNotMatched = {
  Type: "Error",
  Title: "Error",
  Description: "Old password didn't match! Please try again",
  ButtonText: "Close",
};

const msg_Acc_Photo_Success = {
  Type: "Success",
  Title: "Success",
  Description: "Profile photo updated successfully!",
  ButtonText: "Close",
};

const msg_Acc_Photo_Failure = {
  Type: "Error",
  Title: "Error",
  Description: "Failed to update profile photo! Please try again",
  ButtonText: "Close",
};

export function GetAccountModifyMsg_Info(isSuccess) {
  return isSuccess ? msg_Acc_Info_Success : msg_Acc_Info_Failure;
}

export function GetAccountModifyMsg_Pass(isSuccess, isGeneric) {
  return isSuccess
    ? msg_Acc_Pass_Success
    : isGeneric
    ? msg_Acc_Pass_Failure_Generic
    : msg_Acc_Pass_OldNotMatched;
}

export function GetAccountModifyMsg_Photo(isSuccess) {
  return isSuccess ? msg_Acc_Photo_Success : msg_Acc_Photo_Failure;
}
