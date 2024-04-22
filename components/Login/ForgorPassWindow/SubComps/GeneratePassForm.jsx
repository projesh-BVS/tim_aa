import React, { useEffect, useState } from "react";
import FormField from "../../LoginWindow/SubComps/FormField";
import {
  ArrowPathIcon,
  CheckIcon,
  CloudArrowUpIcon,
  KeyIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

const GeneratePassForm = ({ doShow, otpCharLength = 4 }) => {
  const [isOpen, setIsOpen] = useState(doShow);
  const [otp, setOtp] = useState(new Array(otpCharLength).fill(""));

  const handleOTPChange = (el, index) => {
    if (isNaN(el.value)) return false;

    setOtp([...otp.map((data, i) => (i === index ? el.value : data))]);

    if (el.nextSibling) {
      el.nextSibling.focus();
    }

    console.log("OTP : " + otp.join(""));
  };

  useEffect(() => {
    setIsOpen(doShow);
  }, [doShow]);

  return (
    <section
      className={`absolute left-0 right-0 top-0 bottom-0 p-4 flex flex-col items-center justify-between gap-8 w-full h-full ${
        isOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-1/2 opacity-0 pointer-events-none"
      } transition-all duration-500 ease-out-spring`}
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
          <div className="flex items-center justify-center gap-4 w-full">
            <h1 className="text-sm">Resend available in 1:00</h1>
            <button className="flex items-center justify-center gap-2 text-sm text-tif-blue hover:text-tif-lavender rounded-md transition-all">
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
            handleChange={null}
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
            handleChange={null}
          />
        </div>
      </form>
      <div className="flex items-center justify-center gap-4 w-full">
        <button
          //disabled={!isFormValid}
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
          <div className="flex items-center justify-center p-2 gap-4 w-full h-full">
            <CloudArrowUpIcon className="w-5 h-5" />
            Update Password
          </div>
        </button>
      </div>
    </section>
  );
};

export default GeneratePassForm;
