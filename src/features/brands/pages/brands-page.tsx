import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useBrands } from '../hooks/use-brands';
import { BrandsTable } from '../components/brands-table';
import { BrandFormDialog } from '../components/brand-form-dialog';
import type { Brand } from '../types/brand.types';

export function BrandsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const { data, isLoading, refetch } = useBrands({
    page,
    perPage: 15,
    search: search || undefined,
  });

  const brands = data?.data?.original?.data ?? [];
  const total = data?.data?.original?.total ?? 0;
  const from = data?.data?.original?.from ?? 0;
  const to = data?.data?.original?.to ?? 0;
  const lastPage = data?.data?.original?.last_page ?? 1;

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingBrand(null);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingBrand(null);
    refetch();
  };

  const handleClearSearch = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t('brands.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('brands.subtitle')}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          {t('brands.addBrand')}
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('brands.searchPlaceholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="ps-9"
          />
        </div>

        {search && (
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            {t('common.clear')}
          </Button>
        )}
      </div>

      <BrandsTable
        data={brands}
        isLoading={isLoading}
        onEdit={handleEdit}
        onRefresh={refetch}
      />

      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t('common.showing')} {from} {t('common.to')} {to} {t('common.of')} {total} {t('brands.title').toLowerCase()}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              {t('common.previous')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t('common.showing')} {page} {t('common.of')} {lastPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page >= lastPage}
            >
              {t('common.next')}
            </Button>
          </div>
        </div>
      )}

      <BrandFormDialog
        brand={editingBrand}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
