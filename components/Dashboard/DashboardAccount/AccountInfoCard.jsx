import {
  EnvelopeIcon,
  KeyIcon,
  PencilIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const AccountInfoCard = ({
  ownerData,
  callback_Edit_AccInfo,
  callback_Edit_AccPass,
  callback_Edit_AccPhoto,
}) => {
  const OwnerInfo = ownerData.ownerDetails[0];

  return (
    <section className="relative flex mt-20 md:mt-[7.5rem] items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="absolute flex items-center justify-center w-36 md:w-56 h-36 md:h-56 z-10 -top-[4.5rem] md:-top-[7rem] left-0 right-0 m-auto bg-white shadow-[inset_0_0px_10px_5px_rgba(0,0,0,0.2)] rounded-full overflow-clip">
        {!OwnerInfo.profilePic && (
          <span className="font-medium">
            <UserIcon className="p-8 md:p-14 w-full h-full text-tif-blue" />
          </span>
        )}
        {OwnerInfo.profilePic && (
          <div className="overflow-clip aspect-square h-[105%] shrink-0 relative border-[1px] border-tif-grey">
            <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[97%] w-[97%] z-10 shadow-[inset_0_0px_10px_5px_rgba(0,0,0,0.35)] rounded-full" />
            <Image
              src={OwnerInfo.profilePic}
              blurDataURL={OwnerInfo.profilePic}
              alt="Profile Picture"
              placeholder="blur"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
      <div className="absolute flex items-center justify-center w-40 md:w-60 h-40 md:h-60 -top-20 md:-top-[7.5rem] left-0 right-0 m-auto bg-gradient-to-br from-tif-blue from-60% to-tif-pink rounded-full overflow-clip " />
      <button
        onClick={() => callback_Edit_AccPhoto()}
        className="absolute flex items-center justify-center -top-10 md:-top-12 left-0 right-0 m-auto translate-x-[6.25rem] md:translate-x-36 z-10 w-8 md:w-10 h-8 md:h-10 p-2 md:p-[0.6rem] bg-tif-blue hover:bg-tif-lavender text-white hover:shadow-md rounded-full transition-all"
      >
        <PencilIcon className="w-full h-full" />
      </button>

      <div className="flex flex-col w-full z-0 text-center md:text-left rounded-2xl overflow-clip">
        <div className="w-full h-24 md:h-36 bg-gradient-to-br from-tif-blue to-tif-pink" />

        <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Personal Info */}
          <div className="flex flex-col items-center justify-center p-4 gap-4 w-full h-full divide-y-2 divide-gray-200">
            <h1 className="flex items-center justify-start h-8 w-full font-bold text-xl">
              Personal Info
            </h1>
            <div className="flex flex-col items-center justify-between pt-4 gap-4 w-full h-full">
              <div className="flex items-center justify-start gap-4 w-full">
                <UserIcon className="shrink-0 h-5 w-5" />
                <h1 className="shrink-0 font-semibold text-base text-gray-900">
                  Name :{" "}
                  <span className="items-start w-full font-normal text-sm text-black">
                    {OwnerInfo.ownerName}
                  </span>
                </h1>
              </div>
              <div className="flex items-center justify-start gap-4 w-full">
                <PhoneIcon className="shrink-0 h-5 w-5" />
                <h1 className="shrink-0 font-semibold text-base text-gray-900">
                  Phone :{" "}
                  <span className="items-start w-full font-normal text-sm text-black">
                    {OwnerInfo.mobile}
                  </span>
                </h1>
              </div>
              <button
                onClick={() => callback_Edit_AccInfo()}
                className="flex items-center justify-center p-4 gap-4 w-full bg-tif-blue hover:bg-tif-lavender text-white hover:shadow-md rounded-xl transition-all"
              >
                <PencilSquareIcon className="shrink-0 w-5 h-5" />
                <h1>Edit Personal Info</h1>
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="flex flex-col items-center justify-center p-4 gap-4 w-full h-full divide-y-2 divide-gray-200">
            <h1 className="flex items-center justify-start h-8 w-full font-bold text-xl">
              Account Info
            </h1>
            <div className="flex flex-col items-center justify-between pt-4 gap-4 w-full h-full">
              <div className="flex items- justify-start gap-4 w-full">
                <EnvelopeIcon className="shrink-0 h-5 w-5" />
                <h1 className="shrink-0 font-semibold text-base text-gray-900">
                  Email :{" "}
                  <span className="items-start w-full font-normal text-sm text-black">
                    {OwnerInfo.email}
                  </span>
                </h1>
              </div>
              <button
                onClick={() => callback_Edit_AccPass()}
                className="flex items-center justify-center p-4 gap-4 w-full bg-tif-blue hover:bg-tif-lavender text-white hover:shadow-md rounded-xl transition-all"
              >
                <KeyIcon className="shrink-0 w-5 h-5" />
                <h1>Change Password</h1>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AccountInfoCard;
