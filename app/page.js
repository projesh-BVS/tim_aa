"use client";
const { version } = require("../package.json");
import { useEffect, useState } from "react";
import Image from "next/image";
import LoginWindow from "@/components/Login/LoginWindow/LoginWindow";
import ForgotPassWindow from "@/components/Login/ForgorPassWindow/ForgotPassWindow";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const searchError = searchParams.get("error");
  const [isModeForgotPass, setIsModeForgotPass] = useState(false);

  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.get("model-viewer") ||
          customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.

  function Callback_OnClick_OpenForgotPass() {
    setIsModeForgotPass(true);
  }

  function Callback_OnClick_CloseForgotPass() {
    setIsModeForgotPass(false);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-10 w-screen h-screen bg-tif-grey">
      <Image
        src="/Logos/TIF_Logo.svg"
        alt="Try It First Logo"
        width={150}
        height={64}
        className="animate-slideInSpringedBottom"
      />
      <div
        className={`relative flex items-center justify-center w-full animate-slideInSpringedBottom animate-delay-100 transition-all duration-[250ms] ease-out-spring ${
          isModeForgotPass ? "h-96" : "h-80"
        }`}
      >
        <LoginWindow
          doShow={!isModeForgotPass}
          callback_OnForgotPass={Callback_OnClick_OpenForgotPass}
          error={searchError}
        />
        <ForgotPassWindow
          doShow={isModeForgotPass}
          callback_OnCancel={Callback_OnClick_CloseForgotPass}
        />
      </div>

      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500 animate-slideInSpringedBottom animate-delay-200">
        <span className="font-light text-xs lg:text-sm text-gray-500">
          v {version}
        </span>
      </section>

      {/*<section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
        <span className="font-semibold lg:text-xl">
          Login is non restricted. Press the Login button to continue
        </span>
        <span className="font-light text-xs lg:text-sm text-gray-500">
          The login module is suspended for ease of testing. It will be
          activated once testing for this update is done.
        </span>
      </section>*/}
    </main>
  );
}
