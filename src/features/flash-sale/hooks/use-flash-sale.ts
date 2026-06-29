import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchFlashSales,
  fetchFlashSaleById,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
  reorderFlashSales,
  searchProducts,
  type FetchFlashSalesParams,
} from '../api/flash-sale.api';
import type { CreateFlashSaleData, UpdateFlashSaleData } from '../types/flash-sale.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useFlashSales(params: FetchFlashSalesParams = {}, enabled?: boolean) {
  return useQuery({
    queryKey: ['flash-sales', params],
    queryFn: () => fetchFlashSales(params),
    enabled,
  });
}

export function useFlashSale(id: number) {
  return useQuery({
    queryKey: ['flash-sales', id],
    queryFn: () => fetchFlashSaleById(id),
    enabled: !!id,
  });
}

export function useCreateFlashSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFlashSaleData) => createFlashSale(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Flash sale created successfully');
      queryClient.invalidateQueries({ queryKey: ['flash-sales'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create flash sale');
    },
  });
}

export function useUpdateFlashSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFlashSaleData }) =>
      updateFlashSale(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Flash sale updated successfully');
      queryClient.invalidateQueries({ queryKey: ['flash-sales'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update flash sale');
    },
  });
}

export function useDeleteFlashSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFlashSale(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Flash sale deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['flash-sales'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete flash sale');
    },
  });
}

export function useReorderFlashSales() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flashSaleIds: number[]) => reorderFlashSales(flashSaleIds),
    onSuccess: (response) => {
      toast.success(response.message || 'Flash sales reordered successfully');
      queryClient.invalidateQueries({ queryKey: ['flash-sales'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to reorder flash sales');
    },
  });
}

export function useProductSearch(search: string) {
  return useQuery({
    queryKey: ['products', 'search', search],
    queryFn: () => searchProducts(search),
    enabled: search.length > 0,
  });
}
