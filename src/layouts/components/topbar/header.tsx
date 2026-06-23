import { useTranslation } from 'react-i18next';
import { Search, Bell, LogOut, Settings, Languages } from "lucide-react";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useLogout } from "@/features/auth/hooks/use-auth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLanguage } from "@/shared/hooks/use-language";

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
      {/* Brand / Logo — always visible in the full-width header */}
      <div className="flex items-center gap-2 min-w-fit me-4">
        <img src="/meem.svg" alt="Meem Logo" className="h-10 w-auto shrink-0 object-contain" />
      </div>

      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search..." className="h-9 pl-8 bg-muted/50" />
      </div>

      <div className="ms-auto flex items-center gap-2">
        <LanguageSwitcher />
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Languages className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={language === "en" ? "bg-accent" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ar")}
          className={language === "ar" ? "bg-accent" : ""}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
  );
}

function UserMenu() {
  const { t } = useTranslation();
  const logoutMutation = useLogout();
  const { user } = useAuthStore();

  const initials = user?.role?.[0]?.slice(0, 2).toUpperCase() || 'AD';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="rounded-full hover:bg-muted">
          </Button>
        }
      >
        <Avatar className="size-7">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{t('sidebar.settings')}</span>
              <span className="text-xs text-muted-foreground">
                {user?.role?.join(', ') || 'Admin'}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
            <Settings className="mr-2 size-4" />
            {t('sidebar.settings')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="mr-2 size-4" />
            {logoutMutation.isPending ? 'Signing out...' : 'Log out'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
