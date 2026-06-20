import { axiosClient } from '@/shared/api';
import type {
  CategoriesListResponse,
  CategoryDetailResponse,
  CategoryListItem,
  CreateCategoryData,
  UpdateCategoryData,
  ApiResponse,
  FeaturedCategoriesResponse,
} from '../types/category.types';

export interface FetchCategoriesParams {
  page?: number;
  perPage?: number;
  search?: string;
  level?: number | null;
  parentId?: number | null;
  parentOnly?: boolean;
}

export async function fetchCategories({
  page = 1,
  perPage = 15,
  search,
  level,
  parentId,
  parentOnly,
}: FetchCategoriesParams = {}): Promise<CategoriesListResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());

  if (search) params.append('search', search);
  if (level !== undefined && level !== null) params.append('level', level.toString());
  if (parentId !== undefined && parentId !== null) params.append('parent_id', parentId.toString());
  if (parentOnly) params.append('parent', 'true');

  const { data } = await axiosClient.get<CategoriesListResponse>(`/categories?${params.toString()}`);
  return data;
}

export async function fetchCategoryById(id: number): Promise<CategoryDetailResponse> {
  const { data } = await axiosClient.get<CategoryDetailResponse>(`/categories/${id}`);
  return data;
}

export async function fetchFeaturedCategories({
  page = 1,
  perPage = 15,
}: { page?: number; perPage?: number } = {}): Promise<FeaturedCategoriesResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());

  const { data } = await axiosClient.get<CategoriesListResponse>(`/featured-categories?${params.toString()}`);
  return data;
}

export async function addToFeatured(categoryId: number): Promise<ApiResponse<null>> {
  const { data } = await axiosClient.post<ApiResponse<null>>(`/featured-categories/${categoryId}`);
  return data;
}

export async function removeFromFeatured(categoryId: number): Promise<ApiResponse<null>> {
  const { data } = await axiosClient.delete<ApiResponse<null>>(`/featured-categories/${categoryId}`);
  return data;
}

export async function createCategory(payload: CreateCategoryData): Promise<ApiResponse<CategoryListItem>> {
  const formData = new FormData();

  formData.append('name[en]', payload['name[en]']);
  formData.append('name[ar]', payload['name[ar]']);

  if (payload['details[en]']) formData.append('details[en]', payload['details[en]']);
  if (payload['details[ar]']) formData.append('details[ar]', payload['details[ar]']);
  if (payload.image_desktop) formData.append('image_desktop', payload.image_desktop);
  if (payload.image_mobile) formData.append('image_mobile', payload.image_mobile);
  if (payload.parent_id !== undefined && payload.parent_id !== null) {
    formData.append('parent_id', payload.parent_id.toString());
  }

  const { data } = await axiosClient.post<ApiResponse<CategoryListItem>>('/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateCategory(
  id: number,
  payload: UpdateCategoryData
): Promise<ApiResponse<CategoryListItem>> {
  const formData = new FormData();

  formData.append('_method', 'PUT');
  formData.append('name[en]', payload['name[en]']);
  formData.append('name[ar]', payload['name[ar]']);

  if (payload['details[en]']) formData.append('details[en]', payload['details[en]']);
  if (payload['details[ar]']) formData.append('details[ar]', payload['details[ar]']);
  if (payload.image_desktop) formData.append('image_desktop', payload.image_desktop);
  if (payload.image_mobile) formData.append('image_mobile', payload.image_mobile);
  if (payload.parent_id !== undefined && payload.parent_id !== null) {
    formData.append('parent_id', payload.parent_id.toString());
  }

  const { data } = await axiosClient.post<ApiResponse<CategoryListItem>>(`/categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  const { data } = await axiosClient.delete<ApiResponse<null>>(`/categories/${id}`);
  return data;
}


