import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DollarSign, TrendingUp, CalendarRange, Wallet } from 'lucide-react';
import { Skeleton } from '@/shared/ui/skeleton';
import { getLocalizedName } from '@/shared/lib/localize';
import type { SalesData } from '../types/dashboard.types';
import { formatCurrency } from '../lib/dashboard-utils';

interface SalesAnalyticsProps {
  data: SalesData | undefined;
  isLoading: boolean;
  error: Error | null;
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-bold text-foreground">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{payload[0].name}</p>
      <p className="text-sm font-bold text-foreground">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

export function SalesAnalytics({ data, isLoading, error }: SalesAnalyticsProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">{t('dashboard.sales.title')}</h3>
        <div className="rounded-lg bg-destructive/10 p-3 text-destructive text-sm">{t('dashboard.errors.failedToLoad')}</div>
      </div>
    );
  }

  const dailyCards = data ? [
    { label: t('dashboard.sales.today'), value: data.daily_revenue.today, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: t('dashboard.sales.yesterday'), value: data.daily_revenue.yesterday, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: t('dashboard.sales.last7days'), value: data.daily_revenue.last_7_days, icon: CalendarRange, color: 'text-violet-600', bg: 'bg-violet-100 dark:bg-violet-900/30' },
    { label: t('dashboard.sales.last30days'), value: data.daily_revenue.last_30_days, icon: CalendarRange, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { label: t('dashboard.sales.averageOrderValue'), value: data.average_order_value, icon: Wallet, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
  ] : [];

  const comparisonData = data ? [
    { name: t('dashboard.sales.todayVsYesterday'), current: data.revenue_comparison.today_vs_yesterday.today, previous: data.revenue_comparison.today_vs_yesterday.yesterday, change: data.revenue_comparison.today_vs_yesterday.change },
    { name: t('dashboard.sales.thisMonthVsLastMonth'), current: data.revenue_comparison.this_month_vs_last_month.this_month, previous: data.revenue_comparison.this_month_vs_last_month.last_month, change: data.revenue_comparison.this_month_vs_last_month.change },
    { name: t('dashboard.sales.thisYearVsLastYear'), current: data.revenue_comparison.this_year_vs_last_year.this_year, previous: data.revenue_comparison.this_year_vs_last_year.last_year, change: data.revenue_comparison.this_year_vs_last_year.change },
  ] : [];

  const paymentData = (data?.revenue_by_payment_method ?? []).map((item, i) => ({
    name: getLocalizedName(item.method, lang),
    value: item.total,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{t('dashboard.sales.title')}</h3>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
          </div>
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {dailyCards.map((card) => (
              <div key={card.label} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`rounded-md p-1.5 ${card.bg} ${card.color}`}>
                    <card.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">{card.label}</span>
                </div>
                <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(card.value)}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.sales.revenueComparison')}</h4>
              {comparisonData.length > 0 ? (
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => formatCurrency(v)} width={60} />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={8} />
                      <Bar dataKey="current" fill="var(--chart-1)" radius={[4, 4, 0, 0]} barSize={16} name="Current" />
                      <Bar dataKey="previous" fill="var(--chart-3)" radius={[4, 4, 0, 0]} barSize={16} name="Previous" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
              )}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {comparisonData.map((item) => (
                  <div key={item.name} className="rounded-md border border-border p-2 text-center">
                    <p className="text-[10px] text-muted-foreground truncate">{item.name}</p>
                    <p className={`text-xs font-bold tabular-nums ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.sales.revenueByPaymentMethod')}</h4>
              {paymentData.length > 0 ? (
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={paymentData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                        {paymentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={8}
                        formatter={(value: string) => <span style={{ color: 'var(--muted-foreground)' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">{t('dashboard.errors.noData')}</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">{t('dashboard.errors.noData')}</div>
      )}
    </div>
  );
}
