import { useState } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useCategories } from '../hooks/use-categories';
import { CategoriesTable } from '../components/categories-table';
import { CategoryFormDialog } from '../components/category-form-dialog';
import { FeaturedCategoriesPage, AddFeaturedCategoryDialog } from './featured-categories-page';
import type { CategoryListItem } from '../types/category.types';

export function CategoriesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState<string>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [featuredDialogOpen, setFeaturedDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryListItem | null>(null);

  const { data, isLoading, refetch } = useCategories({
    page,
    perPage: 15,
    search: search || undefined,
    level: level === 'all' ? undefined : Number(level),
  });

  const handleEdit = (category: CategoryListItem) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingCategory(null);
    refetch();
  };

  const handleClearFilters = () => {
    setSearch('');
    setLevel('all');
    setPage(1);
  };

  const hasActiveFilters = search || level !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t('categories.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('categories.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setFeaturedDialogOpen(true)}>
            <Star className="mr-2 h-4 w-4" />
            {t('categories.addFeatured')}
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {t('categories.addCategory')}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">{t('categories.allCategories')}</TabsTrigger>
          <TabsTrigger value="featured">{t('categories.featured')}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('categories.searchPlaceholder')}
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
                value={level}
                onValueChange={(value) => {
                  setLevel(value ?? 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t('categories.allLevels')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('categories.allLevels')}</SelectItem>
                  <SelectItem value="1">{t('categories.root')} </SelectItem>
                  <SelectItem value="2">{t('categories.sub')} </SelectItem>
                  <SelectItem value="3">{t('categories.subSub')} </SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  {t('common.clear')}
                </Button>
              )}
            </div>
          </div>

          <CategoriesTable
            data={data?.data || []}
            isLoading={isLoading}
            onEdit={handleEdit}
            onRefresh={refetch}
          />

          {data && data.total > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('common.showing')} {data.from} {t('common.to')} {data.to} {t('common.of')} {data.total} {t('categories.title').toLowerCase()}
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
                  {t('common.showing')} {page} {t('common.of')} {data.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(data.last_page, p + 1))}
                  disabled={page >= data.last_page}
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          <FeaturedCategoriesPage />
        </TabsContent>
      </Tabs>

      <CategoryFormDialog
        category={editingCategory}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={handleFormSuccess}
      />

      <AddFeaturedCategoryDialog
        open={featuredDialogOpen}
        onOpenChange={setFeaturedDialogOpen}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
}

