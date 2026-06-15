import { Search, Bell, LogOut, Settings, User, Moon, Sun } from 'lucide-react'
import { SidebarTrigger } from '@/shared/ui/sidebar'
import { Separator } from '@/shared/ui/separator'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/avatar'

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="h-9 pl-8 bg-muted/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  )
}

function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon-sm">
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function NotificationButton() {
  return (
    <Button variant="ghost" size="icon-sm" className="relative">
      <Bell className="size-4" />
      <Badge
        variant="destructive"
        className="absolute -right-1 -top-1 size-4 p-0 flex items-center justify-center text-[10px]"
      >
        3
      </Badge>
    </Button>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Avatar className="size-7">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            JD
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
