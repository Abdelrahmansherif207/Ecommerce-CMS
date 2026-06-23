export interface CategoryBrief {
  id: number;
  name: string;
  slug: string;
}

export interface FlashSaleBrief {
  id: number;
  title: string;
  slug: string;
  image: { desktop: string | null; mobile: string | null };
  description: string;
  start_date: string;
  end_date: string;
  status: boolean;
  is_valid: boolean;
  type: string;
  discount: string;
  max_discount_amount: string | null;
  created_at: string;
}

export interface ProductVariant {
  id?: number;
  price: number;
  quantity: number;
  sku?: string;
  attribute_values: number[];
  height?: string;
  width?: string;
  length?: string;
  weight?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  current_price: number;
  price_after_discount: number | null;
  price_after_flash_sale: number | null;
  discount_type: string;
  discount_amount: number;
  start_date: string | null;
  end_date: string | null;
  sku: string;
  stock_quantity: number;
  reserved_quantity: number;
  available_stock: number;
  quantity: number;
  sold_quantity: number;
  in_stock: number;
  status: boolean;
  product_type: string | null;
  height: string;
  width: string;
  length: string;
  weight: string;
  has_flash_sale: boolean;
  has_discount: boolean;
  is_fast_shipping_available: boolean;
  discount_valid?: boolean;
  created_at: string;
  updated_at?: string;
  images: string[];
  categories: CategoryBrief[];
  flash_sales: FlashSaleBrief[];
  variants: ProductVariant[];
}

export interface PaginationLinks {
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

export interface ProductListData {
  data: Product[];
  links: PaginationLinks;
}

export type ProductsListResponse = ApiResponse<ProductListData>;
export type ProductDetailResponse = ApiResponse<Product>;
export type DeleteProductResponse = ApiResponse<null>;

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  category?: string;
  brand?: string;
  price_min?: number;
  price_max?: number;
  order_price?: string;
  order?: string;
}
