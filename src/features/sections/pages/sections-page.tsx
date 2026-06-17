import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSections } from '../hooks/use-sections';
import { SectionsList } from '../components/sections-list';
import { SectionEditDialog } from '../components/section-edit-dialog';
import type { Section } from '../types/section.types';

export function SectionsPage() {
  const { t } = useTranslation();
  const { data: sections, isLoading, refetch } = useSections();
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setEditDialogOpen(true);
  };

  const sortedSections = sections?.slice().sort((a, b) => a.order - b.order) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t('sections.title')}
          </h1>
          <p className="text-muted-foreground">{t('sections.subtitle')}</p>
        </div>
      </div>

      <SectionsList
        sections={sortedSections}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      <SectionEditDialog
        section={editingSection}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
