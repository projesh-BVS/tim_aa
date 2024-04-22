import { EyeIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const OwnerCollectionHeader = ({ index, ownerInfo, editOwnerCallback }) => {
  return (
    <section className="relative flex flex-row py-2 px-4 gap-2 items-center justify-between w-full max-w-full text-white bg-gradient-to-br from-tif-blue to-tif-pink">
      <div className="flex items-center justify-start gap-4 w-full">
        <div className="overflow-clip aspect-square h-12 md:h-16 shrink-0 relative rounded-full bg-tif-pink border-2 border-white">
          {!ownerInfo.profilePic && <UserIcon className="p-2 text-white" />}
          {ownerInfo.profilePic && (
            <Image
              src={ownerInfo.profilePic}
              blurDataURL={ownerInfo.profilePic}
              alt="Profile Picture"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex flex-col shrink text-left">
          <span className="font-semibold text-base md:text-lg lg:text-xl whitespace-nowrap text-ellipsis overflow-clip">
            {ownerInfo.ownerName}
          </span>
          <span className="font-light text-sm md:text-base lg:text-lg whitespace-nowrap text-ellipsis overflow-clip">
            {ownerInfo.email}
          </span>
        </div>
      </div>

      <div
        className="animate-slideInSpringedRight absolute right-2 flex items-center justify-center gap-1 md:gap-2 p-1 md:p-2 h-12 md:h-16 w-fit bg-white rounded-xl shadow-sm"
        style={{ animationDelay: `${(index + 1) * 50}ms` }}
      >
        <Link
          className="flex items-center justify-center h-full aspect-square bg-green-400 hover:bg-green-500 hover:shadow-md text-white rounded-lg transition-all"
          href={"/dashboard/owners/view/" + ownerInfo.ownerID}
        >
          <EyeIcon className="w-5 h-5" />
        </Link>
        <button
          disabled={false}
          onClick={() => editOwnerCallback(ownerInfo)}
          className="flex items-center justify-center h-full aspect-square disabled:pointer-events-none disabled:bg-yellow-400/40 bg-yellow-400 hover:bg-yellow-500 hover:shadow-md text-white rounded-lg transition-all"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default OwnerCollectionHeader;
