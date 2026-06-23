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
import { useDeleteAttribute } from '../hooks/use-attributes';

interface AttributeDeleteDialogProps {
  attributeId: number;
  attributeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function AttributeDeleteDialog({
  attributeId,
  attributeName,
  open,
  onOpenChange,
  onDeleted,
}: AttributeDeleteDialogProps) {
  const { t } = useTranslation();
  const deleteMutation = useDeleteAttribute();

  const handleDelete = () => {
    deleteMutation.mutate(attributeId, {
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
          <DialogTitle>{t('attributes.deleteTitle')}</DialogTitle>
          <DialogDescription>
            {t('attributes.deleteConfirm')} <strong>{attributeName}</strong>?
            {t('attributes.deleteWarning')}
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
            {deleteMutation.isPending ? t('attributes.deleting') : t('common.delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
