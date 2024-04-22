import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const OwnerAccInfoCard = ({ ownerInfo }) => {
  return (
    <section className="flex items-center justify-between w-full h-28 md:h-36 gap-4 md:gap-6">
      {/* Profile Picture Div */}
      <div className="flex items-center justify-center w-28 md:w-36 aspect-square shrink-0 bg-tif-pink rounded-2xl border-4 border-white shadow-lg overflow-clip">
        {!ownerInfo.profilePic && (
          <span className="font-medium">
            <UserIcon className="p-8 w-full h-full text-white" />
          </span>
        )}
        {ownerInfo.profilePic && (
          <div className="overflow-clip aspect-square h-[105%] shrink-0 relative bg-white">
            <Image
              src={ownerInfo.profilePic}
              blurDataURL={ownerInfo.profilePic}
              alt="Profile Picture"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      {/* Profile Info Div */}
      <div className="flex flex-col items-center justify-between py-3 md:py-4 w-full h-full text-gray-600 overflow-clip">
        <div className="flex items-center justify-start w-full gap-2">
          <UserIcon className="w-5 h-5" />
          <h1 className="font-bold text-base md:text-lg">
            {ownerInfo.ownerName}
          </h1>
        </div>
        <div className="flex items-center justify-start w-full gap-2">
          <EnvelopeIcon className="w-5 h-5" />
          <h1 className="font-medium text-sm md:text-base">
            {ownerInfo.email}
          </h1>
        </div>
        <div className="flex items-center justify-start w-full gap-2">
          <PhoneIcon className="w-5 h-5" />
          <h1 className="font-medium text-base md:text-base">
            {ownerInfo.mobile}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default OwnerAccInfoCard;
