import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import GenerateOTPForm from "./SubComps/GenerateOTPForm";
import GeneratePassForm from "./SubComps/GeneratePassForm";

const ForgotPassWindow = ({ doShow, callback_OnCancel }) => {
  const [isOpen, setIsOpen] = useState(doShow);
  const [windowMode, setWindowMode] = useState("GenerateOTP");
  const [animateInvalid, setAnimateInvalid] = useState(false);
  const [requestedEmail, setRequestedEmail] = useState("");

  useEffect(() => {
    setIsOpen(doShow);
    if (doShow) setWindowMode("GenerateOTP");
  }, [doShow]);

  function Callback_OnSuccess_OTPGenerated(reqEmail) {
    setRequestedEmail(reqEmail);
    setWindowMode("GeneratePass");
  }

  function Callback_OnSuccess_PasswordUpdated() {
    callback_OnCancel();
  }

  return (
    <section
      className={`absolute flex items-center justify-center w-[90%] md:w-96 h-full ${
        isOpen
          ? "z-10 translate-x-0 scale-100 opacity-100 pointer-events-auto"
          : "-z-10 translate-x-1/2 scale-95 opacity-0 pointer-events-none"
      } transition-all duration-500 ease-out-spring`}
    >
      <div
        className={`flex flex-col w-full h-full rounded-xl overflow-clip bg-white shadow-lg ${
          animateInvalid && "animate-loginInvalid"
        }`}
        onAnimationEnd={() => {
          setAnimateInvalid(false);
        }}
      >
        <div className="flex items-center p-4 gap-4 w-full bg-gradient-to-br from-tif-blue to-tif-pink text-white">
          <ExclamationTriangleIcon className="w-8 h-8 shrink-0" />
          <p className="font-bold text-lg">Forgot Password</p>
        </div>

        <div className="relative flex flex-col gap-6 h-full w-full px-4 pt-6 pb-4 items-center justify-between">
          <GenerateOTPForm
            doShow={windowMode == "GenerateOTP"}
            callback_OnClick_BtnBack={callback_OnCancel}
            callback_OnSuccess_GenerateOTP={Callback_OnSuccess_OTPGenerated}
          />
          <GeneratePassForm
            doShow={windowMode == "GeneratePass"}
            otpCharLength={6}
            requestEmail={requestedEmail}
            callback_OnSuccess_UpdatePassword={
              Callback_OnSuccess_PasswordUpdated
            }
          />
        </div>

        {/*<button
          onClick={() => setAnimateInvalid(true)}
          className="flex items-center justify-center p-4 w-full bg-tif-blue text-white"
        >
          Test
        </button>*/}
      </div>
    </section>
  );
};

export default ForgotPassWindow;
