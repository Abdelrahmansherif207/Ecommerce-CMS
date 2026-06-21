import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchCoupons,
  fetchCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  type FetchCouponsParams,
} from '../api/coupons.api';
import type { CreateCouponData, UpdateCouponData } from '../types/coupon.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useCoupons(params: FetchCouponsParams = {}) {
  return useQuery({
    queryKey: ['coupons', params],
    queryFn: () => fetchCoupons(params),
  });
}

export function useCoupon(id: number) {
  return useQuery({
    queryKey: ['coupons', id],
    queryFn: () => fetchCouponById(id),
    enabled: !!id,
  });
}

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCouponData) => createCoupon(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Coupon created successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create coupon');
    },
  });
}

export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCouponData }) =>
      updateCoupon(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Coupon updated successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update coupon');
    },
  });
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCoupon(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Coupon deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete coupon');
    },
  });
}
