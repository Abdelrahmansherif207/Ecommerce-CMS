import { axiosClient } from '@/shared/api';
import type { LoginData, LoginResponse, AuthData } from '../types/auth.types';

export async function login(data: LoginData): Promise<AuthData> {
  const { data: response } = await axiosClient.post<LoginResponse>('/token', data);
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await axiosClient.post('/logout');
  } catch {
    // Logout endpoint might not exist, proceed anyway
  }
}
