import { useQuery } from '@tanstack/react-query';
import { fetchBanners, type FetchBannersParams } from '../api/banners.api';

export function useBanners(params: FetchBannersParams = {}) {
  return useQuery({
    queryKey: ['banners', params],
    queryFn: () => fetchBanners(params),
  });
}
