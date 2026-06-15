export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back. Here's an overview of your store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$48,290" change="+12.5%" />
        <StatCard title="Orders" value="1,248" change="+8.2%" />
        <StatCard title="Customers" value="3,420" change="+5.1%" />
        <StatCard title="Products" value="286" change="+2.3%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Recent Orders
          </h3>
          <div className="space-y-3">
            {[
              { id: '#1234', customer: 'Alice Johnson', total: '$129.99', status: 'Delivered' },
              { id: '#1233', customer: 'Bob Smith', total: '$89.50', status: 'Shipped' },
              { id: '#1232', customer: 'Carol White', total: '$245.00', status: 'Processing' },
              { id: '#1231', customer: 'Dave Brown', total: '$59.99', status: 'Pending' },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {order.id} — {order.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.total}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Top Products
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Wireless Headphones', sold: 342, revenue: '$17,100' },
              { name: 'Smart Watch Pro', sold: 218, revenue: '$21,800' },
              { name: 'USB-C Hub', sold: 195, revenue: '$5,850' },
              { name: 'Mechanical Keyboard', sold: 167, revenue: '$13,360' },
            ].map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                </div>
                <span className="text-sm font-medium text-foreground">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string
  value: string
  change: string
}) {
  const isPositive = change.startsWith('+')
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      <p className={`mt-1 text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
        {change} vs last month
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Delivered: 'var(--order-delivered)',
    Shipped: 'var(--order-shipped)',
    Processing: 'var(--order-processing)',
    Pending: 'var(--order-pending)',
  }

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
      style={{ backgroundColor: colorMap[status] ?? 'var(--brand-text-secondary)' }}
    >
      {status}
    </span>
  )
}
