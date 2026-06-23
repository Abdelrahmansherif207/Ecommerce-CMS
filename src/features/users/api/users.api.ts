import { axiosClient } from '@/shared/api';
import type {
  UsersListResponse,
  CreateUserResponse,
  ApiActionResponse,
  RolesResponse,
  CreateUserData,
  User,
} from '../types/user.types';

export interface FetchUsersParams {
  page?: number;
  perPage?: number;
  search?: string;
  users?: boolean;
  admins?: boolean;
  type?: string;
  active?: boolean;
  inActive?: boolean;
  orderBy?: string;
  sort?: string;
  trash?: boolean;
}

export async function fetchUsers({
  page = 1,
  perPage = 15,
  search,
  users,
  admins,
  type,
  active,
  inActive,
  orderBy,
  sort,
  trash,
}: FetchUsersParams = {}): Promise<UsersListResponse> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', perPage.toString());

  if (search) params.append('search', search);
  if (users !== undefined) params.append('users', 'true');
  if (admins !== undefined) params.append('admins', 'true');
  if (type) params.append('type', type);
  if (active !== undefined) params.append('active', 'true');
  if (inActive !== undefined) params.append('in_active', 'true');
  if (orderBy) params.append('order_by', orderBy);
  if (sort) params.append('sort', sort);
  if (trash !== undefined) params.append('trash', 'true');

  const { data } = await axiosClient.get<UsersListResponse>('/users?' + params.toString());
  return data;
}

export async function fetchRoles(): Promise<RolesResponse> {
  const { data } = await axiosClient.get<RolesResponse>('/roles');
  return data;
}

export async function createUser(payload: CreateUserData): Promise<CreateUserResponse> {
  const { data } = await axiosClient.post<CreateUserResponse>('/admin-users/add', payload);
  return data;
}

export async function toggleActivation(userId: number): Promise<ApiActionResponse> {
  const { data } = await axiosClient.put<ApiActionResponse>('/admin-users/update-activation', {
    user_id: userId,
  });
  return data;
}

export async function deleteUser(id: number): Promise<ApiActionResponse> {
  const { data } = await axiosClient.delete<ApiActionResponse>('/admin-users/delete/' + id);
  return data;
}

export async function forceDeleteUser(id: number): Promise<ApiActionResponse> {
  const { data } = await axiosClient.delete<ApiActionResponse>('/admin-users/delete-forever/' + id);
  return data;
}

export async function restoreUser(id: number): Promise<ApiActionResponse> {
  const { data } = await axiosClient.put<ApiActionResponse>('/admin-users/restore/' + id);
  return data;
}
