"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import { ChevronLeftIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function Locked() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<LockClosedIcon className="h-8 w-8" />}
        text="Locked Module"
        isLoading={false}
      />

      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
        <span className="font-semibold lg:text-xl">
          Sorry, the module you are trying to access is locked at the moment!
        </span>
        <span className="font-light text-xs lg:text-sm text-gray-500">
          The requested feature/module is not accessible, either for segregated
          testing or it's in development.
        </span>
      </section>

      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full">
        <button
          onClick={() => router.back()}
          className="flex justify-between items-center w-32 bg-tif-blue hover:bg-tif-lavender hover:shadow-md px-4 py-2 rounded-lg text-white font-semibold transition-all"
        >
          <ChevronLeftIcon width={24} />
          <h1>Go Back</h1>
        </button>
      </section>
    </main>
  );
}

export default Locked;
