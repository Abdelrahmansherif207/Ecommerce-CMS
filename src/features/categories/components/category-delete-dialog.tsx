import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useDeleteCategory } from '../hooks/use-categories';

interface CategoryDeleteDialogProps {
  categoryId: number;
  categoryName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function CategoryDeleteDialog({
  categoryId,
  categoryName,
  open,
  onOpenChange,
  onDeleted,
}: CategoryDeleteDialogProps) {
  const { t } = useTranslation();
  const deleteMutation = useDeleteCategory();

  const handleDelete = () => {
    deleteMutation.mutate(categoryId, {
      onSuccess: () => {
        onDeleted();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('categories.deleteTitle')}</DialogTitle>
          <DialogDescription>
            {t('categories.deleteConfirm')} <strong>{categoryName}</strong>?
            {t('categories.deleteWarning')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? t('categories.deleting') : t('common.delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
