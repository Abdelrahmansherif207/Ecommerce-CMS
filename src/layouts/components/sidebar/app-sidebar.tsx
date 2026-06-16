import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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
    <Sidebar collapsible="icon" side={isRTL ? 'right' : 'left'}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">E</span>
          </div>
          <span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
            Ecommerce
          </span>
        </div>
      </SidebarHeader>
      <Separator />
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
