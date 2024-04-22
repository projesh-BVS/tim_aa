import { fetcher_Analytics } from "@/libs/fetcher";
import useSWR from "swr";

const useAnalytics = (id) => {
  const { data, error, isLoading } = useSWR(id, fetcher_Analytics);
  return {
    analytics: data,
    isAnalyticsLoading: isLoading,
    isAnalyticsError: error,
  };
};

export default useAnalytics;
