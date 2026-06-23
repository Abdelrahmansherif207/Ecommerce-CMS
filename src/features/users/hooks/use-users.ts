import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchUsers,
  fetchRoles,
  createUser,
  toggleActivation,
  deleteUser,
  forceDeleteUser,
  restoreUser,
  type FetchUsersParams,
} from '../api/users.api';
import type { CreateUserData } from '../types/user.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string) {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useUsers(params: FetchUsersParams = {}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => createUser(data),
    onSuccess: (response) => {
      toast.success(response.message || 'User created successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create user');
    },
  });
}

export function useToggleActivation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => toggleActivation(userId),
    onSuccess: (response) => {
      toast.success(response.message || 'User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to update user');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (response) => {
      toast.success(response.message || 'User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete user');
    },
  });
}

export function useForceDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => forceDeleteUser(id),
    onSuccess: (response) => {
      toast.success(response.message || 'User deleted permanently');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete user');
    },
  });
}

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => restoreUser(id),
    onSuccess: (response) => {
      toast.success(response.message || 'User restored successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to restore user');
    },
  });
}
