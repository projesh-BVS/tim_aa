import { fetcher_Brand } from '@/libs/fetcher'
import useSWR from 'swr'

const useBrand = (id) => {
  const {data, error, isLoading} = useSWR(id, fetcher_Brand)

  return {
    brand: data,
    isBrandLoading: isLoading,
    isBrandError: error
  }
}

export default useBrand