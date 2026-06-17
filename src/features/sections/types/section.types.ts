export interface SectionSetting {
  front: Record<string, unknown>;
  back: Record<string, unknown> | unknown[];
}

export interface Section {
  id: number;
  type: string;
  title: string | null;
  endpoint: string;
  order: number;
  with_product: boolean;
  setting: SectionSetting;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}

export type SectionsListResponse = ApiResponse<Section[]>;
export type SectionDetailResponse = ApiResponse<Section>;

export interface UpdateSectionData {
  title?: { en: string; ar: string };
  order?: number;
  title_visible?: number;
  is_active?: number;
}
