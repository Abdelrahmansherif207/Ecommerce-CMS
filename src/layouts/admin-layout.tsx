import { Outlet } from 'react-router'
import { SidebarProvider, SidebarInset } from '@/shared/ui/sidebar'
import { TooltipProvider } from '@/shared/ui/tooltip'
import { AppSidebar } from '@/layouts/components/sidebar/app-sidebar'
import { Header } from '@/layouts/components/topbar/header'

export function AdminLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
