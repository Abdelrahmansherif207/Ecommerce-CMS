import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchCategories,
  fetchCategoryById,
  toggleFeatured,
  createCategory,
  updateCategory,
  deleteCategory,
  type FetchCategoriesParams,
} from '../api/categories.api';
import type { CreateCategoryData, UpdateCategoryData } from '../types/category.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useCategories(params: FetchCategoriesParams = {}, enabled?: boolean) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
    enabled,
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });
}

export function useFeaturedCategories(page: number = 1, perPage: number = 15) {
  return useQuery({
    queryKey: ['categories', 'featured', { page, perPage }],
    queryFn: () => fetchCategories({ featureCategory: true, page, perPage }),
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) => toggleFeatured(categoryId),
    onSuccess: (response) => {
      toast.success(response.message || 'Category feature toggled successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to toggle category feature');
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryData) => createCategory(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create category');
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      updateCategory(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update category');
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete category');
    },
  });
}

