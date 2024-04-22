"use client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import LoadingIndicator from "../Common/LoadingIndicator";

const DashPageHeader = ({ icon, text, isLoading, showBackBtn }) => {
  const router = useRouter();

  return (
    <section className="sticky top-0 flex p-6 gap-4 z-10 w-full items-center bg-gradient-to-b from-tif-grey from-90%">
      {showBackBtn && (
        <button
          onClick={() => router.back()}
          className="bg-inherit hover:bg-gray-500 hover:text-white hover:shadow-md p-1 rounded-md text-gray-500 transition-all"
        >
          <ChevronLeftIcon width={20} />
        </button>
      )}
      <div className="text-gray-400">{icon}</div>
      <div className=" font-black text-2xl md:text-4xl text-gray-400">
        {text}
      </div>
      {isLoading && <LoadingIndicator />}
    </section>
  );
};

export default DashPageHeader;
