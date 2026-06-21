import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tags,
  FolderTree,
  BarChart3,
  Settings,
  Bell,
  CreditCard,
  Truck,
  Star,
  Megaphone,
  FileText,
  Image,
  HelpCircle,
  Tag,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export function useNavGroups(): NavGroup[] {
  const { t } = useTranslation();

  return [
    {
      title: t('sidebar.overview'),
      items: [
        { title: t('sidebar.dashboard'), url: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: t('sidebar.commerce'),
      items: [
        { title: t('sidebar.products'), url: '/products', icon: Package },
        { title: t('sidebar.orders'), url: '/orders', icon: ShoppingCart },
        { title: t('sidebar.customers'), url: '/customers', icon: Users },
        { title: t('sidebar.inventory'), url: '/inventory', icon: Truck },
        { title: t('sidebar.promotions'), url: '/promotions', icon: Megaphone },
        { title: t('sidebar.coupons'), url: '/coupons', icon: Tag },
      ],
    },
    {
      title: t('sidebar.catalog'),
      items: [
        { title: t('sidebar.categories'), url: '/categories', icon: FolderTree },
        { title: t('sidebar.brands'), url: '/brands', icon: Tags },
        { title: t('sidebar.reviews'), url: '/reviews', icon: Star },
      ],
    },
    {
      title: t('sidebar.content'),
      items: [
        { title: t('sidebar.cms'), url: '/cms', icon: FileText },
        { title: t('sidebar.sliders'), url: '/sliders', icon: Image },
        { title: t('sidebar.faqs'), url: '/faqs', icon: HelpCircle },
        { title: t('sidebar.flashSale'), url: '/flash-sale', icon: Megaphone },
        { title: t('sidebar.contacts'), url: '/contacts', icon: Mail },
      ],
    },
    {
      title: t('sidebar.insights'),
      items: [
        { title: t('sidebar.analytics'), url: '/analytics', icon: BarChart3 },
        { title: t('sidebar.payments'), url: '/payments', icon: CreditCard },
      ],
    },
    {
      title: t('sidebar.system'),
      items: [
        { title: t('sidebar.notifications'), url: '/notifications', icon: Bell },
        { title: t('sidebar.settings'), url: '/settings', icon: Settings },
      ],
    },
  ];
}



