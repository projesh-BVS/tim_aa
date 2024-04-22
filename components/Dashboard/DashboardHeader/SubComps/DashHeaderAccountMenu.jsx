import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GetInitials } from "../DashHeader";
import { Cog6ToothIcon, PowerIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DashHeaderAccountMenu = ({ OwnerInfo }) => {
  return (
    <div className="flex items-center justify-center">
      <Menu as="div" className="relative inline-block">
        <div className="flex items-center justify-center">
          <Menu.Button className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-full transition-all">
            {!OwnerInfo.profilePic && (
              <span className="font-medium text-white dark:text-gray-300">
                {GetInitials(OwnerInfo.ownerName)}
              </span>
            )}

            {OwnerInfo.profilePic && (
              <div className="overflow-clip aspect-square h-[105%] shrink-0 relative shadow-inner border-tif-grey">
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
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95 translate-x-5 -translate-y-5"
          enterTo="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leaveTo="transform opacity-0 scale-95 translate-x-5 -translate-y-5"
        >
          <Menu.Items className="absolute right-0 mt-6 min-w-[14rem] max-w-[97vw] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-clip">
            <div className="flex flex-col items-center justify-center w-full h-36">
              <div className="relative w-full h-1/3 bg-gradient-to-br from-tif-blue to-tif-pink">
                <div className="absolute left-0 right-0 m-auto -bottom-8 flex items-center justify-center w-16 h-16 bg-tif-pink rounded-full border-white border-2 overflow-clip">
                  {!OwnerInfo.profilePic && (
                    <span className="font-medium text-white dark:text-gray-300">
                      <UserIcon className="p-2 w-full h-full text-white" />
                    </span>
                  )}
                  {OwnerInfo.profilePic && (
                    <div className="overflow-clip aspect-square h-[105%] shrink-0 relative shadow-inner border-[1px] border-tif-grey">
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
              </div>
              <div className="flex flex-col px-4 pb-2 items-center justify-end w-full h-2/3 truncate">
                <span className="font-medium text-base">
                  {OwnerInfo.ownerName}
                </span>
                <span className="font-light text-sm">{OwnerInfo.email}</span>
              </div>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active ? "bg-tif-blue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 gap-2 text-sm`}
                    href="/dashboard/account"
                  >
                    <Cog6ToothIcon
                      className={`shrink-0 w-5 h-5 ${
                        active ? "text-white" : "text-tif-blue"
                      }`}
                    />
                    Manage Account
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-tif-blue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 gap-2 text-sm`}
                    //href="/"
                    onClick={() => signOut()}
                  >
                    <PowerIcon
                      className={`shrink-0 w-5 h-5 ${
                        active ? "text-white" : "text-tif-blue"
                      }`}
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DashHeaderAccountMenu;
