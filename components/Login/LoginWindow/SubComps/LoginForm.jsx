import Link from "next/link";
import FormField from "./FormField";
import { EnvelopeIcon, KeyIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import LoadingIndicator from "@/components/Common/LoadingIndicator";

const LoginForm = ({
  statusIsLoggingIn,
  callback_OnLogin,
  callback_OnForgotPass,
}) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const HandleFieldValueChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <section className="flex flex-col items-center justify-between gap-8 w-full h-full">
      <form className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-center gap-2 w-full">
          <FormField
            fieldID="email"
            fieldName="email"
            fieldType="email"
            fieldLabel="Email Address"
            fieldIcon={<EnvelopeIcon className="w-5 h-5" />}
            autoComplete="username"
            handleChange={HandleFieldValueChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <FormField
            fieldID="password"
            fieldName="password"
            fieldType="password"
            fieldLabel="Password"
            fieldIcon={<KeyIcon className="w-5 h-5" />}
            autoComplete="current-password"
            handleChange={HandleFieldValueChange}
          />
          <div className="flex items-center justify-end w-full">
            <button
              className="text-sm text-tif-blue disabled:text-tif-blue/40"
              disabled={false}
              onClick={(e) => {
                e = e || window.event;
                e.preventDefault();
                callback_OnForgotPass();
              }}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </form>
      <button
        disabled={statusIsLoggingIn}
        onClick={(e) => {
          e = e || window.event;
          e.preventDefault();
          callback_OnLogin(fields.email, fields.password);
        }}
        className={`flex w-full rounded-lg text-center bg-tif-blue disabled:bg-transparent text-white disabled:text-black disabled:border-2 disabled:border-tif-blue font-medium hover:bg-tif-lavender hover:shadow-lg focus:bg-tif-lavender focus:outline-none focus:shadow-lg disabled:pointer-events-none transition-all`}
      >
        <div className="flex items-center justify-center p-2 gap-4 w-full h-full">
          {statusIsLoggingIn && (
            <>
              <LoadingIndicator mini={true} />
              Verifying Credentials
            </>
          )}
          {!statusIsLoggingIn && (
            <>
              <LockOpenIcon className="w-5 h-5" />
              Login
            </>
          )}
        </div>
      </button>
    </section>
  );
};

export default LoginForm;
