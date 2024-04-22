"use client";
import useOwner from "@/hooks/useOwner";
import Image from "next/image";
import LoadingIndicator from "../../Common/LoadingIndicator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import DashHeaderAccountMenu from "./SubComps/DashHeaderAccountMenu";
import DashHeaderMobileMenu from "./SubComps/DashHeaderMobileMenu";

const DashHeader = () => {
  const { owner, isOwnerLoading, isOwnerError } = useOwner(1);

  return (
    <section className="flex flex-shrink-0 z-50 items-center justify-between p-2 w-full h-16 bg-white shadow-lg">
      {isOwnerLoading && (
        <>
          <div className="flex items-center justify-center w-12 h-12">
            <LoadingIndicator />
          </div>

          <Link href="/dashboard">
            <Image
              src="/Logos/TIF_Logo.svg"
              alt="Try It First Logo"
              width={150}
              height={64}
            />
          </Link>

          <div className="flex items-center justify-center w-12 h-12">
            <LoadingIndicator />
          </div>
        </>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <>
          <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
            <h1>Error</h1>
            <ExclamationTriangleIcon width={32} />
          </div>

          <Link href="/dashboard">
            <Image
              src="/Logos/TIF_Logo.svg"
              alt="Try It First Logo"
              width={150}
              height={64}
            />
          </Link>

          <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
            <h1>Error</h1>
            <ExclamationTriangleIcon width={32} />
          </div>
        </>
      )}

      {isOwnerError && (
        <>
          <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
            <h1>Error</h1>
            <ExclamationTriangleIcon width={32} />
          </div>

          <Link href="/dashboard">
            <Image
              src="/Logos/TIF_Logo.svg"
              alt="Try It First Logo"
              width={150}
              height={64}
            />
          </Link>

          <div className="flex items-center justify-center h-12 p-2 gap-2 text-red-500">
            <h1>Error</h1>
            <ExclamationTriangleIcon width={32} />
          </div>
        </>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <>
          <div className="lg:hidden">
            <DashHeaderMobileMenu Role={owner.ownerDetails[0].role} />
          </div>

          <Link href="/dashboard">
            <Image
              src="/Logos/TIF_Logo.svg"
              alt="Try It First Logo"
              width={150}
              height={64}
            />
          </Link>

          <DashHeaderAccountMenu OwnerInfo={owner.ownerDetails[0]} />
        </>
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
