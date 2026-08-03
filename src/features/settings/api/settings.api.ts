import { axiosClient } from '@/shared/api';
import type {
  SettingsResponse,
  UpdateSettingsPayload,
  FastShippingSettingsResponse,
  UpdateFastShippingSettingsPayload,
} from '../types/settings.types';

export async function fetchSettings(): Promise<SettingsResponse> {
  const { data } = await axiosClient.get<SettingsResponse>('/settings');
  return data;
}

export async function updateSettings(payload: UpdateSettingsPayload): Promise<SettingsResponse> {
  const formData = new FormData();
  formData.append('_method', 'PUT');

  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const { data } = await axiosClient.post<SettingsResponse>('/settings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateFastShippingSettings(
  payload: UpdateFastShippingSettingsPayload
): Promise<FastShippingSettingsResponse> {
  const { data } = await axiosClient.put<FastShippingSettingsResponse>('/fast-shipping/settings', payload);
  return data;
}
