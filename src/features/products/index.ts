export { ProductsPage } from './pages/products-page';
export { ProductDetailPage } from './pages/product-detail-page';
export { CreateProductPage } from './pages/create-product-page';
export { ProductForm } from './components/product-form';
export { ProductFormDialog } from './components/product-form-dialog';
export { ProductImportDialog } from './components/product-import-dialog';
export { ProductExportDialog } from './components/product-export-dialog';
export {
  useProducts,
  useProduct,
  useDeleteProduct,
  useCreateProduct,
  useImportProducts,
  useExportProducts,
} from './hooks/use-products';
export { productRoutes } from './routes/product.routes';
export { PRODUCT_PERMISSIONS } from './permissions/product.permissions';
export type {
  Product,
  ProductListData,
  ProductsListResponse,
  ProductDetailResponse,
  FetchProductsParams,
} from './types/product.types';
export type { CreateProductData } from './api/products.api';
