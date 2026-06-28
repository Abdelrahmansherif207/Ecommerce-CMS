import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchProducts,
  fetchProductById,
  deleteProduct,
  createProduct,
  importProducts,
  exportProducts,
  type CreateProductData,
} from '../api/products.api';
import type { FetchProductsParams } from '../types/product.types';
import type { ApiErrorResponse } from '@/shared/api';

function handleApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  const apiError = error as ApiErrorResponse;
  const message = apiError?.message || fallbackMessage;
  toast.error(message);
  return apiError;
}

export function useProducts(params: FetchProductsParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to delete product');
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to create product');
    },
  });
}

export function useImportProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => importProducts(file),
    onSuccess: (response) => {
      toast.success(response.message || 'Products imported successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to import products');
    },
  });
}

export function useExportProducts() {
  return useMutation({
    mutationFn: () => exportProducts(),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Products exported successfully');
    },
    onError: (error: unknown) => {
      handleApiError(error, 'Failed to export products');
    },
  });
}
