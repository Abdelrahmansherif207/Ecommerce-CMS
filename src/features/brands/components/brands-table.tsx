import { useState } from 'react';
import {
  MoreHorizontal,
  Pencil,
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
import { BrandImageCell } from './brand-image-cell';
import { BrandStatusBadge } from './brand-status-badge';
import { BrandDeleteDialog } from './brand-delete-dialog';
import type { Brand } from '../types/brand.types';

interface BrandsTableProps {
  data: Brand[];
  isLoading: boolean;
  onEdit: (brand: Brand) => void;
  onRefresh: () => void;
}

export function BrandsTable({
  data,
  isLoading,
  onEdit,
  onRefresh,
}: BrandsTableProps) {
  const { t } = useTranslation();
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('brands.image')}</TableHead>
              <TableHead>{t('brands.name')}</TableHead>
              <TableHead>{t('brands.details')}</TableHead>
              <TableHead>{t('common.status')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {t('common.noData')}
                </TableCell>
              </TableRow>
            ) : (
              data.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <BrandImageCell image={brand.image} alt={brand.name} />
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{brand.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        /{brand.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground line-clamp-2">
                      {brand.details || '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <BrandStatusBadge status={brand.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(brand)}>
                          <Pencil className="me-2 h-4 w-4" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteTarget(brand)}
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
        <BrandDeleteDialog
          brandId={deleteTarget.id}
          brandName={deleteTarget.name}
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
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
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
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
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
