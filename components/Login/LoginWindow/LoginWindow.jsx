import { useEffect, useState } from "react";
import LoginForm from "./SubComps/LoginForm";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginWindow = ({ doShow, callback_OnForgotPass, error }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(doShow);
  const [animateInvalid, setAnimateInvalid] = useState(false);
  const [isLogginIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    setIsOpen(doShow);
  }, [doShow]);

  useEffect(() => {
    if (error) setAnimateInvalid(true);
  }, [error]);

  const Callback_OnLogin = async (formEmail, formPassword) => {
    setIsLoggingIn(true);

    let signInStatus = await signIn("credentials", {
      email: formEmail,
      password: formPassword,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsLoggingIn(false);

    if (signInStatus.ok) {
      router.push(signInStatus.url);
    } else {
      setAnimateInvalid(true);
    }
  };

  return (
    <section
      className={`absolute flex items-center justify-center w-[90%] md:w-96 h-full ${
        isOpen
          ? "z-10 translate-x-0 scale-100 opacity-100 pointer-events-auto"
          : "-z-10 -translate-x-1/2 scale-95 opacity-0 pointer-events-none"
      } transition-all duration-500 ease-out-spring`}
    >
      <div
        className={`flex flex-col w-full h-full rounded-xl overflow-clip bg-white shadow-lg transition-all ${
          animateInvalid && "animate-loginInvalid"
        }`}
        onAnimationEnd={() => {
          setAnimateInvalid(false);
        }}
      >
        <div className="flex items-center p-4 gap-4 w-full bg-gradient-to-br from-tif-blue to-tif-pink text-white">
          <RectangleGroupIcon className="w-8 h-8 shrink-0" />
          <p className="font-bold text-lg">Dashboard Access</p>
        </div>

        <div className="flex flex-col gap-6 h-full w-full px-4 pt-6 pb-4 items-center justify-between">
          {/*!!error && <p>Authentication Failed</p>*/}
          <LoginForm
            statusIsLoggingIn={isLogginIn}
            callback_OnLogin={Callback_OnLogin}
            callback_OnForgotPass={callback_OnForgotPass}
          />
        </div>

        {/*
          <button
            onClick={() => {
              console.log("Setting Invalid True");
              setAnimateInvalid(true);
            }}
            className="flex items-center justify-center p-4 w-full bg-tif-blue text-white"
          >
            Test
          </button>
        */}
      </div>
    </section>
  );
};

export default LoginWindow;
