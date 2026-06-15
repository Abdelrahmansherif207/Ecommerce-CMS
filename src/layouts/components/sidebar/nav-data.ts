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
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { title: 'Products', url: '/products', icon: Package },
      { title: 'Orders', url: '/orders', icon: ShoppingCart },
      { title: 'Customers', url: '/customers', icon: Users },
      { title: 'Inventory', url: '/inventory', icon: Truck },
      { title: 'Promotions', url: '/promotions', icon: Megaphone },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { title: 'Categories', url: '/categories', icon: FolderTree },
      { title: 'Brands', url: '/brands', icon: Tags },
      { title: 'Reviews', url: '/reviews', icon: Star },
    ],
  },
  {
    title: 'Content',
    items: [
      { title: 'CMS', url: '/cms', icon: FileText },
    ],
  },
  {
    title: 'Insights',
    items: [
      { title: 'Analytics', url: '/analytics', icon: BarChart3 },
      { title: 'Payments', url: '/payments', icon: CreditCard },
    ],
  },
  {
    title: 'System',
    items: [
      { title: 'Notifications', url: '/notifications', icon: Bell },
      { title: 'Settings', url: '/settings', icon: Settings },
    ],
  },
]
