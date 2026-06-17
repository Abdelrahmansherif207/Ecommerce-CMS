import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/shared/ui/sidebar'
import { NavMain } from './nav-main'
import { useNavGroups } from './nav-data'
import { Separator } from '@/shared/ui/separator'
import { useLanguage } from '@/shared/hooks/use-language'

export function AppSidebar() {
  const navGroups = useNavGroups();
  const { isRTL } = useLanguage();

  return (
    <Sidebar
      collapsible="icon"
      side={isRTL ? 'right' : 'left'}
      className="!top-(--layout-header-height) !h-auto"
    >
      <SidebarContent>
        <NavMain groups={navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <div className="px-2 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          v0.0.1
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
