import { useState } from 'react';
import {
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Skeleton } from '@/shared/ui/skeleton';
import { CategoryImageCell } from './category-image-cell';
import { CategoryLevelBadge } from './category-level-badge';
import { CategoryDeleteDialog } from './category-delete-dialog';
import type { CategoryListItem } from '../types/category.types';

interface CategoriesTableProps {
  data: CategoryListItem[];
  isLoading: boolean;
  onEdit: (category: CategoryListItem) => void;
  onAddToFeatured?: (category: CategoryListItem) => void;
  onRefresh: () => void;
}

export function CategoriesTable({
  data,
  isLoading,
  onEdit,
  onAddToFeatured,
  onRefresh,
}: CategoriesTableProps) {
  const { t } = useTranslation();
  const [deleteTarget, setDeleteTarget] = useState<CategoryListItem | null>(null);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('categories.image')}</TableHead>
              <TableHead>{t('categories.name')}</TableHead>
              <TableHead>{t('categories.level')}</TableHead>
              <TableHead>{t('categories.parent')}</TableHead>
              <TableHead className="text-end">{t('categories.products')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t('common.noData')}
                </TableCell>
              </TableRow>
            ) : (
              data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <CategoryImageCell
                      image={category.image}
                      alt={category.name}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{category.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        /{category.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CategoryLevelBadge level={category.level} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {category.parent_id ? `ID: ${category.parent_id}` : 'â€”'}
                    </span>
                  </TableCell>
                  <TableCell className="text-end">
                    {category.products_count}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(category)}>
                          <Pencil className="me-2 h-4 w-4" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                         {onAddToFeatured && (
                           <DropdownMenuItem onClick={() => onAddToFeatured(category)}>
                             <Star className="me-2 h-4 w-4" />
                             {t('categories.addToFeatured')}
                           </DropdownMenuItem>
                         )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteTarget(category)}
                        >
                          <Trash2 className="me-2 h-4 w-4" />
                          {t('common.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {deleteTarget && (
        <CategoryDeleteDialog
          categoryId={deleteTarget.id}
          categoryName={deleteTarget.name}
          open={!!deleteTarget}
          onOpenChange={(open) => {
            if (!open) setDeleteTarget(null);
          }}
          onDeleted={onRefresh}
        />
      )}
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead className="text-end">Products</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1 h-3 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="ms-auto h-4 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


