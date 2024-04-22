import { fetcher_Company } from "@/libs/fetcher";
import useSWR from "swr";

const useCompany = (id) => {
  const { data, mutate, error, isLoading, isValidating } = useSWR(
    id,
    fetcher_Company
  );

  return {
    company: data,
    companyMutate: mutate,
    isCompanyLoading: isLoading,
    isCompanyError: error,
    isCompanyValidating: isValidating,
  };
};

export default useCompany;
