import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/components/pagination';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useProducts } from '../hooks/use-products';
import { ProductsTable } from '../components/products-table';
import { ProductDetailDialog } from '../components/product-detail-dialog';
import { productRoutes } from '../routes/product.routes';
import type { Product } from '../types/product.types';

export function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [detailTarget, setDetailTarget] = useState<Product | null>(null);

  const { data, isLoading, refetch } = useProducts({
    page,
    limit: 15,
    search: search || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  const handleView = (product: Product) => {
    setDetailTarget(product);
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPage(1);
  };

  const hasActiveFilters = search || statusFilter !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t('products.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('products.subtitle')}
          </p>
        </div>
        <Button onClick={() => navigate(productRoutes.create)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('products.addProduct')}
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('products.searchPlaceholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="ps-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value ?? 'all');
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t('products.allStatuses')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('products.allStatuses')}</SelectItem>
              <SelectItem value="1">{t('products.active')}</SelectItem>
              <SelectItem value="0">{t('products.inactive')}</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              {t('common.clear')}
            </Button>
          )}
        </div>
      </div>

      <ProductsTable
        data={data?.data?.data || []}
        isLoading={isLoading}
        onView={handleView}
        onRefresh={refetch}
      />

      <Pagination
        page={page}
        lastPage={data?.data?.links?.last_page ?? 1}
        total={data?.data?.links?.total ?? 0}
        from={data?.data?.links?.from ?? 0}
        to={data?.data?.links?.to ?? 0}
        perPage={data?.data?.links?.per_page ?? 15}
        onPageChange={setPage}
        className="py-2"
      />

      {detailTarget && (
        <ProductDetailDialog
          product={detailTarget}
          open={!!detailTarget}
          onOpenChange={(open) => {
            if (!open) setDetailTarget(null);
          }}
        />
      )}

    </div>
  );
}
