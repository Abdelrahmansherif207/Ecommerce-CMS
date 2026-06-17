import { useState, useEffect } from 'react';
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
import { Input } from '@/shared/ui/input';
import { useUpdateSection } from '../hooks/use-sections';
import type { Section } from '../types/section.types';

interface SectionEditDialogProps {
  section: Section | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function SectionEditDialog({ section, open, onOpenChange, onSuccess }: SectionEditDialogProps) {
  const { t } = useTranslation();
  const updateMutation = useUpdateSection();
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [order, setOrder] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (section) {
      setTitleEn(section.title || '');
      setTitleAr(section.title || '');
      setOrder(section.order);
      setTitleVisible(true);
      setIsActive(true);
    }
  }, [section]);

  const handleSubmit = async () => {
    if (!section) return;

    updateMutation.mutate(
      {
        id: section.id,
        data: {
          title: { en: titleEn, ar: titleAr },
          order,
          title_visible: titleVisible ? 1 : 0,
          is_active: isActive ? 1 : 0,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('sections.editTitle')}</DialogTitle>
          <DialogDescription>{t('sections.editDescription')}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="titleEn" className="text-sm font-medium">{t('sections.titleEn')}</label>
            <Input id="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <label htmlFor="titleAr" className="text-sm font-medium">{t('sections.titleAr')}</label>
            <Input id="titleAr" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <label htmlFor="order" className="text-sm font-medium">{t('sections.order')}</label>
            <Input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('sections.titleVisible')}</span>
            <input
              type="checkbox"
              checked={titleVisible}
              onChange={(e) => setTitleVisible(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('sections.isActive')}</span>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? t('common.saving') : t('common.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
