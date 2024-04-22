import { fetcher_Owner } from "@/libs/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const useOwner = (id = 0, useSessionData = true) => {
  const { data: session } = useSession({ required: true });
  const [ownerID, setOwnerID] = useState(null);

  useEffect(() => {
    if (session?.user) setOwnerID(session.user.ownerID);
  });

  const { data, mutate, error, isLoading, isValidating } = useSWR(
    useSessionData ? ownerID : id,
    fetcher_Owner
  );

  return {
    owner: data,
    ownerMutate: mutate,
    isOwnerLoading: isLoading,
    isOwnerError: error,
    isOwnerValidating: isValidating,
  };
};

export default useOwner;
