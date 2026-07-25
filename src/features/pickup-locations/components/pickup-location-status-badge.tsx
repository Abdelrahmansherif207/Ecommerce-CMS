import { useTranslation } from 'react-i18next';
import { Badge } from '@/shared/ui/badge';

interface PickupLocationStatusBadgeProps {
  status: boolean;
}

export function PickupLocationStatusBadge({ status }: PickupLocationStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <Badge variant={status ? 'success' : 'secondary'}>
      {status ? t('pickupLocations.active') : t('pickupLocations.inactive')}
    </Badge>
  );
}
