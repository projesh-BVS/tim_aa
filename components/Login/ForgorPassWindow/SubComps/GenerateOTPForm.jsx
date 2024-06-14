import React, { useEffect, useState } from "react";
import FormField from "../../LoginWindow/SubComps/FormField";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import axios from "axios";

const GenerateOTPForm = ({
  doShow,
  callback_OnClick_BtnBack,
  callback_OnSuccess_GenerateOTP,
  showLogs = true,
}) => {
  const [isOpen, setIsOpen] = useState(doShow);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailErrorContent, setEmailErrorContent] = useState("");

  useEffect(() => {
    setIsOpen(doShow);
  }, [doShow]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const OnFieldValueChange = (e) => {
    const email = e.target.value;
    const isEmailValid = emailRegex.test(email);

    setIsFormValid(isEmailValid);
    setEnteredEmail(email);
    if (showEmailError) setShowEmailError(false);
  };

  const OnBtnClicked_Next = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log("Checking Email");
      //API CALL INITIATES HERE

      let apiData = {
        action: "password_reset",
        email: enteredEmail,
      };

      setIsUploadingData(true);
      setShowEmailError(false);

      try {
        const response = await axios.post(
          "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/auth",
          apiData
        );

        if (response.status === 200) {
          Log(
            "Email Check Successful | Response: " + JSON.stringify(response),
            showLogs
          );
          setShowEmailError(false);
          callback_OnSuccess_GenerateOTP(enteredEmail);
        } else {
          Log(
            "Email Check Failed | Response: " + JSON.stringify(response),
            showLogs
          );
          setShowEmailError(true);
          setEmailErrorContent("Something went wrong! Please try again");
        }
      } catch (err) {
        Log(
          "Email Check Failed in catch | Error: " +
            JSON.stringify(err.response),
          showLogs
        );
        if (err.response.status === 404) {
          setShowEmailError(true);
          setEmailErrorContent(
            "Email doesn't exist! Please enter a valid email."
          );
        } else if (err.response.status === 500) {
          setShowEmailError(true);
          setEmailErrorContent("Failed to generate OTP! Please try again.");
        } else {
          setShowEmailError(true);
          setEmailErrorContent("Something went wrong! Please try again.");
        }
      }

      setIsUploadingData(false);
    }
  };

  return (
    <section
      className={`absolute left-0 right-0 top-0 bottom-0 p-4 flex flex-col items-center justify-between gap-8 w-full h-full ${
        isOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "-translate-x-1/2 opacity-0 pointer-events-none"
      } transition-all duration-500 ease-out-spring`}
    >
      <form className="flex flex-col gap-6 w-full">
        <h1>Enter your registered email to continue</h1>
        <div className="flex items-center justify-center gap-2 w-full">
          <FormField
            fieldID="email-otp"
            fieldName="email"
            fieldType="email"
            fieldLabel="Email"
            fieldIcon={<EnvelopeIcon className="w-5 h-5" />}
            autoComplete="email"
            handleChange={OnFieldValueChange}
          />
        </div>
      </form>

      <div
        className={`${
          showEmailError
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        } flex items-center justify-center gap-2 px-2 py-4 w-full bg-orange-100 border-orange-200 border-2 rounded-lg transition-all`}
      >
        <ExclamationCircleIcon className="w-12 h-12 text-orange-500" />
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
          <h2 className="font-medium text-sm text-orange-800">
            {emailErrorContent}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full">
        <button
          disabled={isUploadingData}
          onClick={() => callback_OnClick_BtnBack()}
          className="
                flex
                w-full
                rounded-lg 
                text-center 
                bg-red-500 
                text-white 
                font-medium
                disabled:bg-red-500/40
                disabled:pointer-events-none
                hover:bg-red-600 hover:shadow-lg 
                focus:bg-red-600 focus:outline-none focus:shadow-lg                
                transition-all"
        >
          <div className="flex items-center justify-start p-2 gap-4 w-full h-full">
            {isUploadingData && <LoadingIndicator mini={true} />}
            {!isUploadingData && <ChevronLeftIcon className="w-5 h-5" />}
            Back
          </div>
        </button>

        <button
          disabled={!isFormValid || isUploadingData}
          onClick={(e) => OnBtnClicked_Next(e)}
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
          <div className="flex items-center justify-end p-2 gap-4 w-full h-full">
            Next
            {isUploadingData && <LoadingIndicator mini={true} />}
            {!isUploadingData && <ChevronRightIcon className="w-5 h-5" />}
          </div>
        </button>
      </div>
    </section>
  );
};

export default GenerateOTPForm;

function Log(logMsg, showLogs = false) {
  if (showLogs) console.log(logMsg);
}
