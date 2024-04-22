import { fetcher_AllCompanies, fetcher_Owner } from "@/libs/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllProducts(id = 0, useSessionData = true) {
  const { data: session } = useSession({ required: true });
  const [ownerID, setOwnerID] = useState(null);

  useEffect(() => {
    if (session?.user) setOwnerID(session.user.ownerID);
  });

  const {
    data: ownerData,
    error: ownerError,
    isLoading: isOwnerLoading,
  } = useSWR(useSessionData ? ownerID : id, fetcher_Owner);

  const {
    data: allCompaniesData,
    error: allCompaniesError,
    isLoading: isCompaniesLoading,
  } = useSWR(
    () => (ownerData ? ownerData.companyList : null),
    fetcher_AllCompanies
  );

  const isLoading = isOwnerLoading || isCompaniesLoading;
  const isAllProductsError =
    ownerError ||
    allCompaniesError ||
    (ownerData && ownerData.ownerDetails.length == 0) ||
    (allCompaniesData && allCompaniesData.length == 0);

  let allProducts = [];
  let allCompanies = [];

  if (allCompaniesData) {
    allCompanies = ownerData.companyList;

    for (let i = 0; i < allCompaniesData.length; i++) {
      for (let j = 0; j < allCompaniesData[i].catalogue.length; j++) {
        allProducts.push(allCompaniesData[i].catalogue[j]);
      }
    }
  }

  return {
    companies: allCompanies,
    products: allProducts,
    isAllProductsLoading: isLoading,
    isAllProductsError,
  };
}
