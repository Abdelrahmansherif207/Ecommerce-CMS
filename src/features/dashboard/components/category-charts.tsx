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
import { Skeleton } from '@/shared/ui/skeleton';
import { getLocalizedName } from '@/shared/lib/localize';
import type { CategoryStatsData } from '../types/dashboard.types';
import { formatCurrency } from '../lib/dashboard-utils';

interface CategoryChartsProps {
  data: CategoryStatsData | undefined;
  isLoading: boolean;
  error: Error | null;
}

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-bold text-foreground">{payload[0].value} products</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{entry.name}</p>
      <p className="text-sm font-bold text-foreground">{formatCurrency(entry.value)}</p>
    </div>
  );
};

export function CategoryCharts({ data, isLoading, error }: CategoryChartsProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">{t('dashboard.categoryStats.title')}</h3>
        <div className="rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
          {t('dashboard.errors.failedToLoad')}
        </div>
      </div>
    );
  }

  const productDist = (data?.product_distribution ?? []).map((item) => ({
    ...item,
    displayName: getLocalizedName(item.category_name, lang),
  }));

  const salesDist = data?.sales_distribution ?? [];

  const salesPieData = salesDist.map((item, index) => ({
    name: getLocalizedName(item.category_name, lang),
    value: item.total_sales,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        {t('dashboard.categoryStats.title')}
      </h3>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t('dashboard.categoryStats.productDistribution')}
            </h4>
            {productDist.length > 0 ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productDist}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="displayName" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} width={110} />
                    <Tooltip content={<BarTooltip />} />
                    <Bar dataKey="product_count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                {t('dashboard.errors.noData')}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t('dashboard.categoryStats.salesDistribution')}
            </h4>
            {salesPieData.length > 0 ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={salesPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {salesPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={8}
                      formatter={(value: string) => <span style={{ color: 'var(--muted-foreground)' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                {t('dashboard.errors.noData')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
