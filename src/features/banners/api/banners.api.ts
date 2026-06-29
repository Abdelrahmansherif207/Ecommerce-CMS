import { axiosClient } from '@/shared/api';
import type { BannersListResponse } from '../types/banner.types';

export interface FetchBannersParams {
  page?: number;
  perPage?: number;
  search?: string;
  active?: boolean;
  order?: string;
  sortedBy?: string;
}

export async function fetchBanners({
  page = 1,
  perPage = 15,
  search,
  active,
  order,
  sortedBy,
}: FetchBannersParams = {}): Promise<BannersListResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', perPage.toString());

  if (search) params.append('search', search);
  if (active !== undefined) params.append('active', active ? '1' : '0');
  if (order) params.append('order', order);
  if (sortedBy) params.append('sortedBy', sortedBy);

  const { data } = await axiosClient.get<BannersListResponse>('/banners?' + params.toString());
  return data;
}
