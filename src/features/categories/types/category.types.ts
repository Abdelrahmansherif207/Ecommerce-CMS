export interface CategoryImage {
  desktop: string | null;
  mobile: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  level: number;
  image: CategoryImage;
  products_count: number;
  details?: string;
}

export interface CategoryDetail extends Category {
  parent: Pick<Category, 'id' | 'name' | 'slug'> | null;
  children: Pick<Category, 'id' | 'name' | 'slug'>[];
}

export interface CategoryListItem {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  level: number;
  image: CategoryImage;
  products_count: number;
  details?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
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

export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}

export type CategoriesListResponse = PaginatedResponse<CategoryListItem>;
export type CategoryDetailResponse = ApiResponse<CategoryDetail>;

export interface CreateCategoryData {
  'name[en]': string;
  'name[ar]': string;
  'details[en]'?: string;
  'details[ar]'?: string;
  image_desktop?: File;
  image_mobile?: File;
  'shops_id[]'?: number[];
  parent_id?: number | null;
}

export interface UpdateCategoryData extends CreateCategoryData {
  _method: 'PUT';
}
