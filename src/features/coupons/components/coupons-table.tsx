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
import { CouponImageCell } from './coupon-image-cell';
import { CouponStatusBadge } from './coupon-status-badge';
import { CouponDeleteDialog } from './coupon-delete-dialog';
import type { Coupon } from '../types/coupon.types';

interface CouponsTableProps {
  data: Coupon[];
  isLoading: boolean;
  onEdit: (coupon: Coupon) => void;
  onRefresh: () => void;
}

function formatDate(dateStr: string): string {
  return dateStr ? dateStr.split('T')[0] : '';
}

export function CouponsTable({
  data,
  isLoading,
  onEdit,
  onRefresh,
}: CouponsTableProps) {
  const { t } = useTranslation();
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('coupons.image')}</TableHead>
              <TableHead>{t('coupons.code')}</TableHead>
              <TableHead>{t('coupons.name')}</TableHead>
              <TableHead>{t('coupons.discount')}</TableHead>
              <TableHead>{t('coupons.dates')}</TableHead>
              <TableHead>{t('coupons.usage')}</TableHead>
              <TableHead>{t('common.status')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {t('common.noData')}
                </TableCell>
              </TableRow>
            ) : (
              data.map((coupon) => {
                const parsedName: Record<string, string> = (() => {
                  try {
                    return typeof coupon.name === 'string' ? JSON.parse(coupon.name) : coupon.name;
                  } catch {
                    return { en: coupon.name, ar: coupon.name };
                  }
                })();
                const displayName = parsedName.en || parsedName.ar || coupon.name;

                return (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <CouponImageCell image={coupon.image} alt={displayName} />
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {coupon.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <p className="font-medium truncate max-w-[200px]">{displayName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{Number(coupon.discount).toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">{coupon.discount_type}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground">
                        <p>{formatDate(coupon.start_date)}</p>
                        <p>{formatDate(coupon.end_date)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-center">
                        <p className="font-medium">{coupon.used}</p>
                        <p className="text-xs text-muted-foreground">/ {coupon.limiter ?? '\u221E'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CouponStatusBadge status={coupon.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(coupon)}>
                            <Pencil className="me-2 h-4 w-4" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteTarget(coupon)}
                          >
                            <Trash2 className="me-2 h-4 w-4" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {deleteTarget && (
        <CouponDeleteDialog
          couponId={deleteTarget.id}
          couponCode={deleteTarget.code}
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
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-10 w-10 rounded-lg" /></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell><Skeleton className="h-5 w-16" /></TableCell>
              <TableCell><Skeleton className="h-8 w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
