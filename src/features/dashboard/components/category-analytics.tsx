import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/shared/ui/skeleton';
import { getLocalizedName } from '@/shared/lib/localize';
import type { DashboardCategoriesData } from '../types/dashboard.types';
import { formatCurrency } from '../lib/dashboard-utils';

interface CategoryAnalyticsProps {
  data: DashboardCategoriesData | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-bold text-foreground">
        {payload[0].dataKey === 'product_count' ? `${payload[0].value} products` : formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

export function CategoryAnalytics({ data, isLoading, error }: CategoryAnalyticsProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">{t('dashboard.categories.title')}</h3>
        <div className="rounded-lg bg-destructive/10 p-3 text-destructive text-sm">{t('dashboard.errors.failedToLoad')}</div>
      </div>
    );
  }

  const productDist = (data?.product_distribution ?? []).map((item) => ({
    ...item,
    displayName: getLocalizedName(item.category_name, lang),
  }));

  const highestRev = (data?.highest_revenue ?? []).map((item) => ({
    ...item,
    displayName: getLocalizedName(item.category_name, lang),
  }));

  const lowestRev = (data?.lowest_revenue ?? []).map((item) => ({
    ...item,
    displayName: getLocalizedName(item.category_name, lang),
  }));

  const growthData = (data?.category_growth ?? []).map((item) => ({
    ...item,
    displayName: getLocalizedName(item.category_name, lang),
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{t('dashboard.categories.title')}</h3>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[220px] w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-[200px] rounded-lg" /><Skeleton className="h-[200px] rounded-lg" /></div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.categories.productDistribution')}</h4>
            {productDist.length > 0 ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productDist} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="displayName" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} width={110} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="product_count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.categories.highestRevenue')}</h4>
              {highestRev.length > 0 ? (
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={highestRev} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v: number) => formatCurrency(v)} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="displayName" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} width={90} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="revenue" fill="var(--chart-4)" radius={[0, 4, 4, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
              )}
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.categories.lowestRevenue')}</h4>
              {lowestRev.length > 0 ? (
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lowestRev} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v: number) => formatCurrency(v)} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="displayName" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} width={90} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="revenue" fill="var(--chart-2)" radius={[0, 4, 4, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.categories.growth')}</h4>
            {growthData.length > 0 ? (
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="displayName" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(v: number) => formatCurrency(v)} tickLine={false} axisLine={false} width={60} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="current_month" fill="var(--chart-1)" radius={[4, 4, 0, 0]} barSize={12} name={t('dashboard.categories.currentMonth')} />
                    <Bar dataKey="previous_month" fill="var(--chart-3)" radius={[4, 4, 0, 0]} barSize={12} name={t('dashboard.categories.previousMonth')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">{t('dashboard.errors.noData')}</div>
      )}
    </div>
  );
}
