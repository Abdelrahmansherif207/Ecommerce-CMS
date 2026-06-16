import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login, logout } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import type { LoginData } from '../types/auth.types';
import type { ApiErrorResponse } from '@/shared/api';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (authData) => {
      setAuth(authData);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      const apiError = error as ApiErrorResponse;
      toast.error(apiError?.message || 'Login failed');
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      clearAuth();
      toast.success('Logged out successfully');
      navigate('/login');
    },
  });
}
