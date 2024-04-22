"use client";
import useOwner from "@/hooks/useOwner";
import Image from "next/image";
import LoadingIndicator from "../Common/LoadingIndicator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const DashHeader = () => {
  const { owner, isOwnerLoading, isOwnerError } = useOwner(1);

  return (
    <section className="flex flex-shrink-0 z-10 items-center justify-between p-2 w-full h-16 bg-white shadow-lg">
      <Link href="/dashboard">
        <Image
          src="/Logos/TIF_Logo.svg"
          alt="Try It First Logo"
          width={150}
          height={64}
        />
      </Link>

      {isOwnerLoading && (
        <div className="flex items-center justify-center w-12 h-12">
          <LoadingIndicator />
        </div>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
          <h1>Error</h1>
          <ExclamationTriangleIcon width={32} />
        </div>
      )}

      {isOwnerError && (
        <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
          <h1>Error</h1>
          <ExclamationTriangleIcon width={32} />
        </div>
      )}
      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <Link href="/dashboard/locked">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-full mr-2 transition-all">
            <span className="font-medium text-white dark:text-gray-300">
              {GetInitials(owner.ownerDetails[0].ownerName)}
            </span>
          </div>
        </Link>
      )}
    </section>
  );
};

export default DashHeader;

export function GetInitials(nameString) {
  var names = nameString.split(" ");
  var initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}
