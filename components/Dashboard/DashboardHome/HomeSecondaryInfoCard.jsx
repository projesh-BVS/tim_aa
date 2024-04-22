import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const HomeSecondaryInfoCard = ({ icon, text, page, count, index = 1 }) => {
  return (
    <div
      className="animate-appearSpringed flex items-center justify-between h-24 md:h-32 lg:h-36 w-full bg-white rounded-xl shadow-md overflow-clip"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center justify-between h-full w-1/3 p-2 text-white bg-gradient-to-br from-tif-blue to-tif-pink">
        <div className="flex items-center justify-center h-full w-full">
          {icon}
        </div>
        {/*<div className="w-[90%] h-[0.15rem] bg-white" />*/}
        <h1 className="flex items-center justify-center w-full h-full font-bold text-2xl md:text-3xl bg-white text-tif-blue border-2 border-white rounded-lg">
          {count}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-between h-full w-full p-2 gap-2">
        <div className="flex md:flex-col px-2 pt-1 gap-1 items-center justify-start h-full w-full">
          <h1 className="flex items-center justify-start md:w-full font-medium md:text-base lg:text-xl text-tif-blue">
            Total
          </h1>
          <h1 className="flex items-center justify-start md:w-full font-bold md:text-lg lg:text-2xl text-tif-blue">
            {text}
          </h1>
        </div>
        <Link
          className="relative flex items-center justify-center w-full p-1 md:p-2 bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-lg transition all"
          href={page}
        >
          <h1 className="w-full text-center font-normal text-white">
            See all {text.toLowerCase()}
          </h1>
          <ChevronRightIcon className="absolute right-2 w-5 h-5 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default HomeSecondaryInfoCard;
