import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchBrands,
  fetchBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  type FetchBrandsParams,
} from '../api/brands.api';
import type { CreateBrandData, UpdateBrandData } from '../types/brand.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useBrands(params: FetchBrandsParams = {}) {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => fetchBrands(params),
  });
}

export function useBrand(id: number) {
  return useQuery({
    queryKey: ['brands', id],
    queryFn: () => fetchBrandById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandData) => createBrand(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Brand created successfully');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create brand');
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBrandData }) =>
      updateBrand(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Brand updated successfully');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update brand');
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBrand(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Brand deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete brand');
    },
  });
}
