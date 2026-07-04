import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query-keys';
import { fetchBanners, type FetchBannersParams } from '../api/banners.api';

export function useBanners(params: FetchBannersParams = {}, enabled?: boolean) {
  return useQuery({
    queryKey: queryKeys.banners.list(params),
    queryFn: () => fetchBanners(params),
    staleTime: 60 * 1000,
    enabled,
  });
}
