export interface BrandImage {
  desktop: string | null;
  mobile: string | null;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: BrandImage;
  details: string;
  status: boolean;
}

export interface BrandsListOriginal {
  data: Brand[];
  current_page: number;
  from: number;
  to: number;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string;
  first_page_url: string;
}

export interface BrandsListResponse {
  status: number;
  message: string;
  success: boolean;
  data: {
    headers: Record<string, unknown>;
    original: BrandsListOriginal;
    exception: unknown;
  };
}

export interface BrandDetailResponse {
  status: number;
  message: string;
  success: boolean;
  data: Brand;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}

export interface CreateBrandData {
  'name[en]': string;
  'name[ar]': string;
  image_desktop?: File;
  image_mobile?: File;
  'details[en]'?: string;
  'details[ar]'?: string;
  status: string;
}

export interface UpdateBrandData extends CreateBrandData {
  _method: 'PUT';
}
