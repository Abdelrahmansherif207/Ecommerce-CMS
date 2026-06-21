import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchFaqs,
  fetchFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
  type FetchFaqsParams,
} from '../api/faqs.api';
import type { CreateFaqData, UpdateFaqData } from '../types/faq.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useFaqs(params: FetchFaqsParams = {}) {
  return useQuery({
    queryKey: ['faqs', params],
    queryFn: () => fetchFaqs(params),
  });
}

export function useFaq(id: number) {
  return useQuery({
    queryKey: ['faqs', id],
    queryFn: () => fetchFaqById(id),
    enabled: !!id,
  });
}

export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFaqData) => createFaq(data),
    onSuccess: (response) => {
      toast.success(response.message || 'FAQ created successfully');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create FAQ');
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFaqData }) =>
      updateFaq(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'FAQ updated successfully');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update FAQ');
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFaq(id),
    onSuccess: (response) => {
      toast.success(response.message || 'FAQ deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete FAQ');
    },
  });
}

export function useReorderFaqs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (faqIds: number[]) => reorderFaqs(faqIds),
    onSuccess: (response) => {
      toast.success(response.message || 'FAQs reordered successfully');
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to reorder FAQs');
    },
  });
}
