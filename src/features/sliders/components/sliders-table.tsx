import { useState } from 'react';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  GripVertical,
  Power,
  PowerOff,
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
import { SliderImageCell } from './slider-image-cell';
import { SliderStatusBadge } from './slider-status-badge';
import { SliderDeleteDialog } from './slider-delete-dialog';
import { useChangeSliderStatus, useReorderSliders } from '../hooks/use-sliders';
import type { Slider } from '../types/slider.types';

interface SlidersTableProps {
  data: Slider[];
  isLoading: boolean;
  onEdit: (slider: Slider) => void;
  onRefresh: () => void;
}

export function SlidersTable({
  data,
  isLoading,
  onEdit,
  onRefresh,
}: SlidersTableProps) {
  const { t } = useTranslation();
  const [deleteTarget, setDeleteTarget] = useState<Slider | null>(null);
  const changeStatusMutation = useChangeSliderStatus();
  const reorderMutation = useReorderSliders();

  const handleToggleStatus = (slider: Slider) => {
    changeStatusMutation.mutate(slider.id, {
      onSuccess: onRefresh,
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const ids = data.map((s) => s.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    reorderMutation.mutate(ids, { onSuccess: onRefresh });
  };

  const handleMoveDown = (index: number) => {
    if (index === data.length - 1) return;
    const ids = data.map((s) => s.id);
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    reorderMutation.mutate(ids, { onSuccess: onRefresh });
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead className="w-10">#</TableHead>
              <TableHead>{t('sliders.image')}</TableHead>
              <TableHead>{t('sliders.title')}</TableHead>
              <TableHead>{t('common.status')}</TableHead>
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
              data.map((slider, index) => (
                <TableRow key={slider.id}>
                  <TableCell className="p-1">
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        type="button"
                        className="cursor-pointer text-muted-foreground hover:text-foreground disabled:opacity-30"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                      >
                        <GripVertical className="h-3.5 w-3.5 rotate-0" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {slider.order}
                  </TableCell>
                  <TableCell>
                    <SliderImageCell image={slider.image} alt={slider.title} />
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{slider.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        /{slider.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SliderStatusBadge status={slider.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleToggleStatus(slider)}
                        disabled={changeStatusMutation.isPending}
                        title={slider.status ? t('sliders.deactivate') : t('sliders.activate')}
                      >
                        {slider.status ? <Power className="h-4 w-4 text-green-600" /> : <PowerOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(slider)}>
                            <Pencil className="me-2 h-4 w-4" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteTarget(slider)}
                          >
                            <Trash2 className="me-2 h-4 w-4" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {deleteTarget && (
        <SliderDeleteDialog
          sliderId={deleteTarget.id}
          sliderTitle={deleteTarget.title}
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
            <TableHead className="w-10" />
            <TableHead className="w-10">#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-8 w-6" /></TableCell>
              <TableCell><Skeleton className="h-4 w-6" /></TableCell>
              <TableCell><Skeleton className="h-10 w-10 rounded-lg" /></TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1 h-3 w-20" />
              </TableCell>
              <TableCell><Skeleton className="h-5 w-16" /></TableCell>
              <TableCell><Skeleton className="h-8 w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
