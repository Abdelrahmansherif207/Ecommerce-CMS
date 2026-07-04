import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ShieldCheck } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import type { ProfilePermission } from '../types/profile.types';

interface PermissionsTabProps {
  permissions: ProfilePermission[];
}

export function PermissionsTab({ permissions }: PermissionsTabProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = search
    ? permissions.filter((p) => p.label.toLowerCase().includes(search.toLowerCase()))
    : permissions;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('profile.searchPermissions')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-8"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4" />
        <span>
          {t('profile.totalPermissions')}: {permissions.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map((permission) => (
          <Badge key={permission.id} variant="secondary" className="text-xs">
            {permission.label}
          </Badge>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">{t('profile.noPermissions')}</p>
        )}
      </div>
    </div>
  );
}
