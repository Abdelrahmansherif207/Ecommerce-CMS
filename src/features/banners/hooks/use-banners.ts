import { useQuery } from '@tanstack/react-query';
import { fetchBanners, type FetchBannersParams } from '../api/banners.api';

export function useBanners(params: FetchBannersParams = {}, enabled?: boolean) {
  return useQuery({
    queryKey: ['banners', params],
    queryFn: () => fetchBanners(params),
    enabled,
  });
}
