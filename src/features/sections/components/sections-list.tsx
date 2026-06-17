import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import type { Section } from '../types/section.types';

const TYPE_LABELS: Record<string, string> = {
  banners: 'Banners',
  sliders: 'Sliders',
  promotions: 'Promotions',
  categories: 'Categories',
  products: 'Products',
  'flash-sales': 'Flash Sales',
  brands: 'Brands',
  coupons: 'Coupons',
};

interface SectionsListProps {
  sections: Section[];
  isLoading: boolean;
  onEdit: (section: Section) => void;
}

export function SectionsList({ sections, isLoading, onEdit }: SectionsListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">{t('sections.order')}</TableHead>
          <TableHead>{t('sections.type')}</TableHead>
          <TableHead>{t('sections.title')}</TableHead>
          <TableHead className="w-24">{t('sections.actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sections.map((section) => (
          <TableRow key={section.id}>
            <TableCell className="font-mono text-sm">{section.order}</TableCell>
            <TableCell>
              <span className="text-sm font-medium">{TYPE_LABELS[section.type] || section.type}</span>
            </TableCell>
            <TableCell className="font-medium">
              {section.title || <span className="text-muted-foreground">—</span>}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEdit(section)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
