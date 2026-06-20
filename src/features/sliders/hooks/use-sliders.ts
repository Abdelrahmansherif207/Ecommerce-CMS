import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchSliders,
  fetchSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
  changeSliderStatus,
  reorderSliders,
  searchProducts,
  type FetchSlidersParams,
} from '../api/sliders.api';
import type { CreateSliderData, UpdateSliderData } from '../types/slider.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useSliders(params: FetchSlidersParams = {}) {
  return useQuery({
    queryKey: ['sliders', params],
    queryFn: () => fetchSliders(params),
  });
}

export function useSlider(id: number) {
  return useQuery({
    queryKey: ['sliders', id],
    queryFn: () => fetchSliderById(id),
    enabled: !!id,
  });
}

export function useCreateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSliderData) => createSlider(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Slider created successfully');
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create slider');
    },
  });
}

export function useUpdateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSliderData }) =>
      updateSlider(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Slider updated successfully');
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update slider');
    },
  });
}

export function useDeleteSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSlider(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Slider deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete slider');
    },
  });
}

export function useChangeSliderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => changeSliderStatus(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Slider status changed');
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to change slider status');
    },
  });
}

export function useReorderSliders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sliderIds: number[]) => reorderSliders(sliderIds),
    onSuccess: (response) => {
      toast.success(response.message || 'Sliders reordered successfully');
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to reorder sliders');
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
