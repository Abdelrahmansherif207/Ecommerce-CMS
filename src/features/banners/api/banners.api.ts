import { axiosClient } from '@/shared/api';
import type { BannersListResponse } from '../types/banner.types';

export interface FetchBannersParams {
  page?: number;
  perPage?: number;
  active?: boolean;
  order?: string;
  sortedBy?: string;
}

export async function fetchBanners({
  page = 1,
  perPage = 15,
  active,
  order,
  sortedBy,
}: FetchBannersParams = {}): Promise<BannersListResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', perPage.toString());

  if (active !== undefined) params.append('active', active ? '1' : '0');
  if (order) params.append('order', order);
  if (sortedBy) params.append('sortedBy', sortedBy);

  const { data } = await axiosClient.get<BannersListResponse>('/banners?' + params.toString());
  return data;
}
