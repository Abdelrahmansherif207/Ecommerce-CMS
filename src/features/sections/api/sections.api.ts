import { axiosClient } from '@/shared/api';
import type {
  Section,
  SectionsListResponse,
  SectionDetailResponse,
  UpdateSectionData,
  ApiResponse,
} from '../types/section.types';

export async function fetchSections(): Promise<Section[]> {
  const { data } = await axiosClient.get<SectionsListResponse>('/sections');
  return data.data;
}

export async function fetchSectionById(id: number): Promise<Section> {
  const { data } = await axiosClient.get<SectionDetailResponse>(`/sections/${id}`);
  return data.data;
}

export async function updateSection(
  id: number,
  payload: UpdateSectionData
): Promise<ApiResponse<Section>> {
  const { data } = await axiosClient.put<ApiResponse<Section>>(`/sections/${id}`, payload);
  return data;
}
