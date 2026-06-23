import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchSections,
  fetchSectionById,
  createSection,
  updateSection,
  deleteSection,
  toggleSectionActive,
  reorderSections,
  fetchSectionTypes,
  fetchTypeSettings,
  fetchProductTypes,
  searchEntities,
} from '../api/sections.api';
import type { CreateSectionPayload, UpdateSectionPayload } from '../types/section.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

// ─── Queries ─────────────────────────────────────────────────────

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

export function useSectionTypes() {
  return useQuery({
    queryKey: ['section-types'],
    queryFn: fetchSectionTypes,
    staleTime: 5 * 60 * 1000, // types rarely change
  });
}

export function useTypeSettings(typeName: string) {
  return useQuery({
    queryKey: ['section-types', typeName, 'settings'],
    queryFn: () => fetchTypeSettings(typeName),
    enabled: !!typeName,
  });
}

export function useProductTypes() {
  return useQuery({
    queryKey: ['product-types'],
    queryFn: fetchProductTypes,
    staleTime: 5 * 60 * 1000,
  });
}

export function useEntitySearch(endpoint: string, search: string) {
  return useQuery({
    queryKey: [endpoint, 'search', search],
    queryFn: () => searchEntities(endpoint, search),
    enabled: !!endpoint,
  });
}

// ─── Mutations ───────────────────────────────────────────────────

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSectionPayload) => createSection(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Section created successfully');
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create section');
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSectionPayload }) =>
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

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSection(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Section deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete section');
    },
  });
}

export function useToggleSectionActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleSectionActive(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Section status updated');
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to toggle section status');
    },
  });
}

export function useReorderSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionIds: number[]) => reorderSections(sectionIds),
    onSuccess: (response) => {
      toast.success(response.message || 'Sections reordered successfully');
      queryClient.invalidateQueries({ queryKey: ['sections'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to reorder sections');
    },
  });
}
