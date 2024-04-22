import LoginForm from "./SubComps/LoginForm";

const LoginWindow = () => {
  return (
    <section className="flex flex-col w-80 rounded-xl overflow-clip bg-white shadow-lg">
      <div className="flex flex-col p-4 w-full bg-tif-blue text-white">
        <p className="font-bold text-lg">Dashboard Access</p>
      </div>
      <div className="flex flex-col gap-6 h-full w-full px-4 pt-6 pb-4 items-center justify-between">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginWindow;
