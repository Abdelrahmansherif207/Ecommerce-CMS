import { axiosClient } from '@/shared/api';
import type {
  BrandsListResponse,
  BrandDetailResponse,
  CreateBrandData,
  UpdateBrandData,
  ApiResponse,
  Brand,
} from '../types/brand.types';

export interface FetchBrandsParams {
  page?: number;
  perPage?: number;
  search?: string;
  status?: boolean | null;
}

export async function fetchBrands({
  page = 1,
  perPage = 15,
  search,
  status,
}: FetchBrandsParams = {}): Promise<BrandsListResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());

  if (search) params.append('search', search);
  if (status !== undefined && status !== null) params.append('status', status ? '1' : '0');

  const { data } = await axiosClient.get<BrandsListResponse>(`/brands?${params.toString()}`);
  return data;
}

export async function fetchBrandById(id: number): Promise<BrandDetailResponse> {
  const { data } = await axiosClient.get<BrandDetailResponse>(`/brands/${id}`);
  return data;
}

export async function createBrand(payload: CreateBrandData): Promise<ApiResponse<Brand>> {
  const formData = new FormData();

  formData.append('name[en]', payload['name[en]']);
  formData.append('name[ar]', payload['name[ar]']);
  formData.append('status', payload.status);

  if (payload['details[en]']) formData.append('details[en]', payload['details[en]']);
  if (payload['details[ar]']) formData.append('details[ar]', payload['details[ar]']);
  if (payload.image_desktop) formData.append('image_desktop', payload.image_desktop);
  if (payload.image_mobile) formData.append('image_mobile', payload.image_mobile);

  const { data } = await axiosClient.post<ApiResponse<Brand>>('/brands', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateBrand(
  id: number,
  payload: UpdateBrandData
): Promise<ApiResponse<Brand>> {
  const formData = new FormData();

  formData.append('_method', 'PUT');
  formData.append('name[en]', payload['name[en]']);
  formData.append('name[ar]', payload['name[ar]']);
  formData.append('status', payload.status);

  if (payload['details[en]']) formData.append('details[en]', payload['details[en]']);
  if (payload['details[ar]']) formData.append('details[ar]', payload['details[ar]']);
  if (payload.image_desktop) formData.append('image_desktop', payload.image_desktop);
  if (payload.image_mobile) formData.append('image_mobile', payload.image_mobile);

  const { data } = await axiosClient.post<ApiResponse<Brand>>(`/brands/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteBrand(id: number): Promise<ApiResponse<null>> {
  const { data } = await axiosClient.delete<ApiResponse<null>>(`/brands/${id}`);
  return data;
}
