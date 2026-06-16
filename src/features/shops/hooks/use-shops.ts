import { useQuery } from '@tanstack/react-query';
import { fetchShops, type FetchShopsParams } from '../api/shops.api';

export function useShops(params: FetchShopsParams = {}) {
  return useQuery({
    queryKey: ['shops', params],
    queryFn: () => fetchShops(params),
  });
}
