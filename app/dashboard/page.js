"use client";
import DashInfoCard from "@/components/Dashboard/DashInfoCard";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import HomePluginGuideCard from "@/components/Dashboard/DashboardHome/HomePluginGuideCard";
import HomePrimaryInfoCard from "@/components/Dashboard/DashboardHome/HomePrimaryInfoCard";
import HomeSecondaryInfoCard from "@/components/Dashboard/DashboardHome/HomeSecondaryInfoCard";
import useOwner from "@/hooks/useOwner";
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  //const [ownerID, setOwnerID] = useState(null);

  //const { data: session } = useSession({ required: true });

  const { owner, isOwnerLoading, isOwnerError } = useOwner(1);
  //const { owner, isOwnerLoading, isOwnerError } = useOwner(session.user.ownerID);

  /*useEffect(() => {
    if (session?.user) setOwnerID(session.user.ownerID);
    //console.log(session.user.role);
  }, [session]);*/

  return (
    <main className="flex flex-col gap-6 pb-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<HomeIcon className="h-8 w-8" />}
        text="Dashboard"
        isLoading={isOwnerLoading}
      />
      {/*
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -mt-6 px-4 gap-4 w-full">
          <DashInfoCard
            icon={<BuildingStorefrontIcon className="w-8 h-8" />}
            text="Companies"
            page="/dashboard/companies"
            count="57"
          />
          <DashInfoCard
            icon={<BuildingStorefrontIcon className="w-8 h-8" />}
            text="Products"
            page="/dashboard/products"
            count="78"
          />          
        </section>
  */}
      <section className="animate-slideInSpringedLeft flex px-6 gap-4 -mt-6 w-full items-center justify-center">
        <HomePrimaryInfoCard
          ownerData={owner}
          isOwnerLoading={isOwnerLoading}
          isOwnerError={isOwnerError}
        />
      </section>

      {owner &&
        owner.ownerDetails.length > 0 &&
        owner.ownerDetails[0].role == "admin" && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 gap-4 w-full">
            <HomeSecondaryInfoCard
              icon={
                <BuildingOffice2Icon className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
              }
              text="Companies"
              page="/dashboard/companies"
              count={GetCompanyCount(owner)}
              index={1}
            />
            <HomeSecondaryInfoCard
              icon={
                <BuildingStorefrontIcon className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
              }
              text="Outlets"
              page="/dashboard/outlets"
              count={GetOutletCount(owner)}
              index={2}
            />
            <HomeSecondaryInfoCard
              icon={
                <ShoppingBagIcon className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
              }
              text="Products"
              page="/dashboard/products"
              count={GetProductCount(owner)}
              index={3}
            />
          </section>
        )}

      {owner &&
        owner.ownerDetails.length > 0 &&
        owner.ownerDetails[0].role == "superAdmin" && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 gap-4 w-full">
            <HomeSecondaryInfoCard
              icon={
                <BuildingOffice2Icon className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
              }
              text="Owners"
              page="/dashboard/owners"
              count={GetOwnerCount(owner)}
              index={1}
            />
          </section>
        )}

      {owner && owner.ownerDetails.length > 0 && (
        <section
          className="animate-slideInSpringedLeft flex px-6 gap-4 w-full items-center justify-center"
          style={{ animationDelay: `400ms` }}
        >
          <HomePluginGuideCard />
        </section>
      )}
    </main>
  );
}

function GetOwnerCount(ownerData) {
  let ownerCount = 0;
  for (let i = 0; i < ownerData.ownerList.length; i++) {
    if (ownerData.ownerList[i].ownerID != ownerData.ownerDetails[0].ownerID)
      ownerCount += 1;
  }

  return ownerCount;
}

function GetCompanyCount(ownerData) {
  return ownerData.companyList.length;
}

function GetOutletCount(ownerData) {
  var oCount = 0;
  ownerData.companyList.map((company) => (oCount += company.outletList.length));

  return oCount;
}

function GetProductCount(ownerData) {
  var pCount = 0;
  ownerData.companyList.map((company) => (pCount += company.productCount));

  return pCount;
}
