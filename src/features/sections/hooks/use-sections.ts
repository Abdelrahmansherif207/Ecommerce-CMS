import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchSections, fetchSectionById, updateSection } from '../api/sections.api';
import type { UpdateSectionData } from '../types/section.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string) {
  const apiError = error as ApiErrorResponse;
  toast.error(apiError?.message || fallbackMessage);
}

export function useSections() {
  return useQuery({
    queryKey: ['sections'],
    queryFn: fetchSections,
  });
}

export function useSection(id: number) {
  return useQuery({
    queryKey: ['sections', id],
    queryFn: () => fetchSectionById(id),
    enabled: !!id,
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSectionData }) =>
      updateSection(id, data),
    onSuccess: (response) => {
      toast.success(response.message || 'Section updated successfully');
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update section');
    },
  });
}
