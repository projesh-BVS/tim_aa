import React, { useEffect, useState } from "react";
import FormField from "../../LoginWindow/SubComps/FormField";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const GenerateOTPForm = ({
  doShow,
  callback_OnClick_BtnBack,
  callback_OnSuccess_GenerateOTP,
}) => {
  const [isOpen, setIsOpen] = useState(doShow);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsOpen(doShow);
  }, [doShow]);

  const OnFieldValueChange = (e) => {
    e.target.value.length >= 10 ? setIsFormValid(true) : setIsFormValid(false);
  };

  const OnBtnClicked_Next = () => {
    if (isFormValid) {
      console.log("MOCK SUCCESS OTP GENERATION");
      //API CALL INITIATES HERE
      callback_OnSuccess_GenerateOTP();
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
        <h1>Enter your registered mobile number to continue</h1>
        <div className="flex items-center justify-center gap-2 w-full">
          <FormField
            fieldID="mobile"
            fieldName="mobile"
            fieldType="tel"
            fieldLabel="Phone"
            fieldIcon={<PhoneIcon className="w-5 h-5" />}
            autoComplete="tel"
            handleChange={OnFieldValueChange}
          />
        </div>
      </form>
      <div className="flex items-center justify-center gap-4 w-full">
        <button
          onClick={() => callback_OnClick_BtnBack()}
          className="
                flex
                w-full
                rounded-lg 
                text-center 
                bg-red-500 
                text-white 
                font-medium 
                hover:bg-red-600 hover:shadow-lg 
                focus:bg-red-600 focus:outline-none focus:shadow-lg                
                transition-all"
        >
          <div className="flex items-center justify-start p-2 gap-4 w-full h-full">
            <ChevronLeftIcon className="w-5 h-5" />
            Back
          </div>
        </button>

        <button
          disabled={!isFormValid}
          onClick={() => OnBtnClicked_Next()}
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
            <ChevronRightIcon className="w-5 h-5" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default GenerateOTPForm;
