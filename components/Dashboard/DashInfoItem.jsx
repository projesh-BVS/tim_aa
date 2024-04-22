import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const DashInfoItem = ({
  icon,
  text,
  page,
  count,
  fitWidth = true,
  showButton = true,
}) => {
  return (
    <div
      className={`${
        fitWidth ? "md:w-fit" : ""
      } flex gap-6 px-2 py-1 items-center justify-between w-full rounded-xl border-2 border-tif-blue`}
    >
      {/* Icon, count and category section */}
      <div className="flex w-auto gap-2 items-center">
        <div className="flex justify-center items-center gap-2 p-2 rounded-lg text-2xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
          {icon}
          {count}
        </div>
        <div className="flex flex-col text-gray-500">
          <span className="font-normal text-md lg:text-lg">Total</span>
          <span className="font-bold text-lg lg:text-xl">{text}</span>
        </div>
      </div>

      {/* Button Section */}
      {showButton && (
        <div className="flex gap-2 items-center justify-center">
          <Link href={page}>
            <button className="p-2 rounded-lg text-sm text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
              <ChevronRightIcon className="h-7 w-7 lg:h-8 lg:w-8" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashInfoItem;
