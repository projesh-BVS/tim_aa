import React, { useEffect, useState } from "react";
import FormField from "../../LoginWindow/SubComps/FormField";
import {
  ArrowPathIcon,
  CheckIcon,
  CloudArrowUpIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import LoadingIndicator from "@/components/Common/LoadingIndicator";

const GeneratePassForm = ({
  doShow,
  otpCharLength = 6,
  requestEmail,
  callback_OnSuccess_UpdatePassword,
}) => {
  const [isOpen, setIsOpen] = useState(doShow);
  const [otp, setOtp] = useState(new Array(otpCharLength).fill(""));
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isUploadingPassword, setIsUploadingPassword] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [updateNotificationContent, setUpdateNotificationContent] =
    useState("");

  let notficationContent_Success = {
    Title: "Success",
    Description: "Your password was updated successfully",
    ButtonText: "Go To Login",
    ButtonAction: () => {
      setShowUpdateNotification(false);
      callback_OnSuccess_UpdatePassword();
    },
  };

  let notficationContent_Expired = {
    Title: "Sorry!",
    Description: "Your OTP has expired",
    ButtonText: "Try Again",
    ButtonAction: () => setShowUpdateNotification(false),
  };

  let notficationContent_Invalid = {
    Title: "Sorry!",
    Description: "Your OTP is invalid",
    ButtonText: "Try Again",
    ButtonAction: () => setShowUpdateNotification(false),
  };

  let notficationContent_Error = {
    Title: "Error!",
    Description: "Something went wrong",
    ButtonText: "Try Again",
    ButtonAction: () => setShowUpdateNotification(false),
  };

  const handleOTPChange = (el, index) => {
    if (isNaN(el.value)) return false;

    setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);

    if (el.nextSibling && el.value) {
      el.nextSibling.focus();
    }

    if (el.previousSibling && !el.value) {
      el.previousSibling.focus();
    }
  };

  useEffect(() => {
    setIsOpen(doShow);
    setTimeLeft(60);
  }, [doShow]);

  useEffect(() => {
    if (isResendDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResendDisabled]);

  useEffect(() => {
    CheckFormValidity();
  }, [otp, newPass, confirmPass]);

  const HandleOTPResend = async (event) => {
    event.preventDefault();

    setTimeLeft(60);
    setIsResendDisabled(true);
    // TODO: Add logic to resend OTP

    let apiData = {
      action: "password_reset",
      email: requestEmail,
    };

    try {
      const response = await axios.post(
        "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/auth",
        apiData
      );

      console.log("OTP Resend Response in try: " + JSON.stringify(response));
    } catch (err) {
      console.log("OTP Resend Response in catch: " + JSON.stringify(response));
    }
  };

  const HandleUpdatePassword = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log("Updating Password");
      //API CALL INITIATES HERE

      let apiData = {
        action: "verify_reset_code",
        email: requestEmail,
        reset_code: otp.join(""),
        password: confirmPass,
      };

      setIsUploadingPassword(true);
      //setShowEmailError(false);

      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/auth",
          apiData
        );

        if (response.status === 200) {
          console.log(
            "Password Update Successful | Response: " + JSON.stringify(response)
          );

          setUpdateNotificationContent(notficationContent_Success);
          setShowUpdateNotification(true);
        } else {
          console.log(
            "Password Update Failed | Response: " + JSON.stringify(response)
          );

          setUpdateNotificationContent(notficationContent_Error);
          setShowUpdateNotification(true);
        }
      } catch (err) {
        console.log(
          "Password Update Failed in catch | Error: " +
            JSON.stringify(err.response)
        );

        if (err.response.status === 400) {
          console.log("Expired OTP");
          setUpdateNotificationContent(notficationContent_Expired);
          setShowUpdateNotification(true);
        } else if (err.response.status === 404) {
          console.log("Invalid OTP");
          setUpdateNotificationContent(notficationContent_Invalid);
          setShowUpdateNotification(true);
        } else {
          console.log("General Error");
          setUpdateNotificationContent(notficationContent_Error);
          setShowUpdateNotification(true);
        }
      }

      setIsUploadingPassword(false);
    }
  };

  const OnFieldValueChange_NewPass = (e) => {
    setNewPass(e.target.value);
  };

  const OnFieldValueChange_ConfirmPass = (e) => {
    setConfirmPass(e.target.value);
  };

  const CheckFormValidity = () => {
    let isOTPValid = otp.join("").length == otpCharLength;
    let isNewPassValid = newPass != "";
    let isConfirmPassValid = confirmPass != "" && newPass == confirmPass;

    setIsFormValid(isOTPValid && isNewPassValid && isConfirmPassValid);
  };

  return (
    <section
      className={`absolute left-0 right-0 top-0 bottom-0 p-4 flex flex-col items-center justify-between gap-8 w-full h-full ${
        isOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-1/2 opacity-0 pointer-events-none"
      } transition-all duration-500 ease-out-spring`}
    >
      {/* OTP & PASSWORD FORM & UPDATE BUTTON */}
      <div
        className={`${
          showUpdateNotification
            ? "pointer-events-none -translate-x-1/2 opacity-0"
            : isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-1/2 opacity-0"
        } flex flex-col items-center justify-between gap-8 w-full h-full transition-all`}
      >
        <form className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-center gap-2 justify-between">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2 p-2">
                <LockClosedIcon className="text-tif-blue w-5 h-5" />
                <h1>OTP</h1>
              </div>
              <div className="flex items-center justify-center gap-2 w-fit">
                {otp.map((data, index) => {
                  return (
                    <input
                      key={"otp" + index}
                      value={data}
                      onChange={(e) => handleOTPChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      type="text"
                      name="otp"
                      autoComplete="one-time-code"
                      className="border-2 border-tif-blue focus:border-tif-lavender w-8 h-8 text-lg rounded-lg text-center"
                      maxLength={1}
                    />
                  );
                })}
              </div>
            </div>
            <div
              className={`${
                isUploadingPassword ? "opacity-50" : "opacity-100"
              } flex items-center justify-center gap-4 w-full`}
            >
              <h1 className={`${isResendDisabled ? "" : "hidden"} text-sm`}>
                Resend available in {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </h1>
              <button
                className={`flex items-center justify-center gap-2 text-sm  hover:text-tif-lavender rounded-md transition-all ${
                  isResendDisabled
                    ? "hidden pointer-events-none text-gray-400"
                    : "text-tif-blue"
                }`}
                onClick={(e) => HandleOTPResend(e)}
                disabled={isResendDisabled}
              >
                <ArrowPathIcon className="w-4 h-4" />
                <h1>Resend OTP</h1>
              </button>
            </div>
          </div>
          <div className="hidden items-center justify-center gap-2 w-full">
            <FormField
              fieldID="username"
              fieldName="username"
              fieldType="email"
              fieldLabel="Email"
              fieldIcon={<KeyIcon className="w-5 h-5" />}
              fieldValue={requestEmail}
              autoComplete="username"
              handleChange={null}
            />
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <FormField
              fieldID="newPassword"
              fieldName="newPassword"
              fieldType="password"
              fieldLabel="New Password"
              fieldIcon={<KeyIcon className="w-5 h-5" />}
              autoComplete="new-password"
              handleChange={OnFieldValueChange_NewPass}
            />
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <FormField
              fieldID="confirmPassword"
              fieldName="confirmPassword"
              fieldType="password"
              fieldLabel="Confirm Password"
              fieldIcon={<KeyIcon className="w-5 h-5" />}
              autoComplete="new-password"
              handleChange={OnFieldValueChange_ConfirmPass}
            />
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            disabled={!isFormValid || isUploadingPassword}
            onClick={(e) => HandleUpdatePassword(e)}
            className="
                flex
                w-full
                rounded-lg 
                text-center 
                bg-green-500 
                text-white 
                font-medium
                disabled:bg-green-500/40
                disabled:pointer-events-none
                hover:bg-green-600 hover:shadow-lg 
                focus:bg-green-600 focus:outline-none focus:shadow-lg                
                transition-all"
          >
            <div className="flex items-center justify-center p-2 gap-4 w-full h-full">
              {isUploadingPassword && <LoadingIndicator mini={true} />}
              {!isUploadingPassword && <CloudArrowUpIcon className="w-5 h-5" />}
              Update Password
            </div>
          </button>
        </div>
      </div>

      {/* UPDATE NOTIFICATION */}
      <div
        className={`${
          showUpdateNotification && isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-1/2 opacity-0"
        } absolute left-0 right-0 top-0 bottom-0 p-4 flex flex-col items-center justify-between w-full h-full transition-all`}
      >
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <h1
            className={`${
              updateNotificationContent.Title === "Success"
                ? "text-green-500"
                : "text-red-500"
            } font-bold text-xl`}
          >
            {updateNotificationContent.Title}
          </h1>
          <h1
            className={`${
              updateNotificationContent.Title === "Success"
                ? "text-green-800"
                : "text-red-800"
            } font-bold text-sm`}
          >
            {updateNotificationContent.Description}
          </h1>
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            onClick={() => updateNotificationContent.ButtonAction()}
            className={`
                flex
                w-full
                rounded-lg 
                text-center
                font-medium
                text-white
                hover:shadow-lg
                focus:outline-none focus:shadow-lg
                disabled:pointer-events-none
                transition-all

                ${
                  updateNotificationContent.Title === "Success"
                    ? "bg-green-500 disabled:bg-green-500/40  hover:bg-green-600  focus:bg-green-600"
                    : "bg-red-500 disabled:bg-red-500/40  hover:bg-red-600  focus:bg-red-600"
                }`}
          >
            <div className="flex items-center justify-center p-2 gap-4 w-full h-full">
              {updateNotificationContent.Title === "Success" && (
                <LockOpenIcon className="w-5 h-5" />
              )}
              {updateNotificationContent.Title != "Success" && (
                <ArrowPathIcon className="w-5 h-5" />
              )}
              {updateNotificationContent.ButtonText}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GeneratePassForm;
