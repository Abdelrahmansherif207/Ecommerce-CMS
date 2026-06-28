import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, Upload, Download, ArrowUp, ArrowDown } from 'lucide-react';
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
import { ProductImportDialog } from '../components/product-import-dialog';
import { ProductExportDialog } from '../components/product-export-dialog';
import { productRoutes } from '../routes/product.routes';
import type { Product } from '../types/product.types';

export function ProductsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderBy, setOrderBy] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [detailTarget, setDetailTarget] = useState<Product | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const dateRange = dateFrom && dateTo ? `${dateFrom}//${dateTo}` : undefined;

  const { data, isLoading, refetch } = useProducts({
    page,
    limit: 15,
    search: search || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    order_by: orderBy || undefined,
    sort: (orderBy ? sortDir : undefined) as 'asc' | 'desc' | undefined,
    date_range: dateRange,
  });

  const handleView = (product: Product) => {
    setDetailTarget(product);
  };

  const handleNavigateDetail = (product: Product) => {
    navigate(productRoutes.detail(product.id));
  };

  const toggleSortDir = () => {
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setOrderBy('');
    setSortDir('desc');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const hasActiveFilters = search || statusFilter !== 'all' || orderBy || dateRange;

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
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setImportOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            {t('products.importBtn')}
          </Button>
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            {t('products.exportBtn')}
          </Button>
          <Button onClick={() => navigate(productRoutes.create)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('products.addProduct')}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
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

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value ?? 'all');
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t('products.allStatuses')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('products.allStatuses')}</SelectItem>
            <SelectItem value="1">{t('products.active')}</SelectItem>
            <SelectItem value="0">{t('products.inactive')}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={orderBy}
          onValueChange={(value) => {
            setOrderBy(value ?? '');
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t('products.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t('products.sortByDefault')}</SelectItem>
            <SelectItem value="name">{t('products.name')}</SelectItem>
            <SelectItem value="price">{t('products.price')}</SelectItem>
            <SelectItem value="created_at">{t('products.date')}</SelectItem>
            <SelectItem value="stock_quantity">{t('products.stock')}</SelectItem>
            <SelectItem value="status">{t('products.status')}</SelectItem>
          </SelectContent>
        </Select>

        {orderBy && (
          <Button variant="outline" size="icon-sm" onClick={toggleSortDir} title={sortDir === 'asc' ? t('products.sortAsc') : t('products.sortDesc')}>
            {sortDir === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="w-[150px]"
            placeholder={t('products.dateFrom')}
          />
          <span className="text-muted-foreground text-sm">{t('common.to')}</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="w-[150px]"
            placeholder={t('products.dateTo')}
          />
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            {t('common.clear')}
          </Button>
        )}
      </div>

      <ProductsTable
        data={data?.data?.data || []}
        isLoading={isLoading}
        onView={handleView}
        onNavigateDetail={handleNavigateDetail}
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

      <ProductImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
      />

      <ProductExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
      />

    </div>
  );
}
