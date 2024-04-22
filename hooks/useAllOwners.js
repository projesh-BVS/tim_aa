import { fetcher_AllOwners, fetcher_Owner } from "@/libs/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const useAllOwners = () => {
  const { data: session } = useSession({ required: true });
  const [ownerID, setOwnerID] = useState(null);

  useEffect(() => {
    if (session?.user) setOwnerID(session.user.ownerID);
  });

  const {
    data: superAdminData,
    mutate: superAdminMutate,
    error: superAdminError,
    isLoading: isSuperAdminLoading,
    isValidating: isSuperAdminValidating,
  } = useSWR(ownerID, fetcher_Owner);

  const {
    data: allOwnersData,
    mutate: allOwnersMutate,
    error: allOwnersError,
    isLoading: isOwnersLoading,
    isValidating: isOwnersValidating,
  } = useSWR(
    () =>
      superAdminData
        ? GetFilteredOwnersList(superAdminData.ownerList, ownerID)
        : null,
    fetcher_AllOwners
  );

  const isLoading = isSuperAdminLoading || isOwnersLoading;
  const isAllOwnersError =
    superAdminError ||
    allOwnersError ||
    (superAdminData && superAdminData.ownerDetails.length == 0) ||
    (allOwnersData && allOwnersData.length == 0);

  return {
    allOwners: allOwnersData,
    allOwnersMutate: allOwnersMutate,
    isAllOwnersLoading: isLoading,
    isAllOwnersError,
    isAllOwnersValidating: isOwnersValidating,
  };
};

export default useAllOwners;

function GetFilteredOwnersList(ownerList, filterID) {
  let filteredOwners = [];

  for (let i = 0; i < ownerList.length; i++) {
    if (ownerList[i].ownerID != filterID) filteredOwners.push(ownerList[i]);
  }

  return filteredOwners;
}
