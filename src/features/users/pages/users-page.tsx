import { useState } from 'react';
import { Plus, Search, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Pagination } from '@/shared/components/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useUsers } from '../hooks/use-users';
import { UsersTable } from '../components/users-table';
import { UserFormDialog } from '../components/user-form-dialog';


export function UsersPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showTrash, setShowTrash] = useState(false);
  const [orderBy, setOrderBy] = useState('created_at');
  const [sort, setSort] = useState('desc');
  const [formOpen, setFormOpen] = useState(false);

  const params = {
    page,
    perPage,
    search: search || undefined,
    users: typeFilter === 'users' ? true : undefined,
    admins: typeFilter === 'admins' ? true : undefined,
    active: activeFilter === '1' ? true : undefined,
    inActive: activeFilter === '0' ? true : undefined,
    orderBy: orderBy || undefined,
    sort: sort || undefined,
    trash: showTrash || undefined,
  };

  const { data, isLoading, refetch } = useUsers(params);

  const users = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const from = data?.data?.from ?? 0;
  const to = data?.data?.to ?? 0;
  const lastPage = data?.data?.last_page ?? 1;

  const handleFormSuccess = () => {
    setFormOpen(false);
    refetch();
  };

  const handleClearSearch = () => {
    setSearch('');
    setPage(1);
  };

  const toggleTrash = () => {
    setShowTrash(!showTrash);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{t('users.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('users.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showTrash ? 'secondary' : 'outline'}
            onClick={toggleTrash}
          >
            <Trash className="mr-2 h-4 w-4" />
            {showTrash ? t('users.showActive') : t('users.showTrash')}
          </Button>
          {!showTrash && (
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t('users.addUser')}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('users.searchPlaceholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="ps-9"
          />
        </div>

        {search && (
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            {t('common.clear')}
          </Button>
        )}

        {!showTrash && (
          <>
            <Select value={typeFilter} onValueChange={(v) => v && (setTypeFilter(v), setPage(1))}>
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder={t('users.type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('users.allTypes')}</SelectItem>
                <SelectItem value="users">{t('users.usersOnly')}</SelectItem>
                <SelectItem value="admins">{t('users.adminsOnly')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={activeFilter} onValueChange={(v) => v && (setActiveFilter(v), setPage(1))}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder={t('common.status')}>
                  {activeFilter === '1' ? t('users.active') : activeFilter === '0' ? t('users.inactive') : t('common.all')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="1">{t('users.active')}</SelectItem>
                <SelectItem value="0">{t('users.inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        <Select value={orderBy} onValueChange={(v) => v && (setOrderBy(v), setPage(1))}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder={t('users.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">{t('users.sortName')}</SelectItem>
            <SelectItem value="email">{t('users.sortEmail')}</SelectItem>
            <SelectItem value="created_at">{t('users.sortCreatedAt')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => v && (setSort(v), setPage(1))}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder={t('users.sortedBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">{t('users.asc')}</SelectItem>
            <SelectItem value="desc">{t('users.desc')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setPage(1); }}>
          <SelectTrigger className="h-8 w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTable
        data={users}
        isLoading={isLoading}
        isTrash={showTrash}
        onRefresh={refetch}
      />

      <Pagination
        page={page}
        lastPage={lastPage}
        total={total}
        from={from}
        to={to}
        perPage={perPage}
        onPageChange={setPage}
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}
