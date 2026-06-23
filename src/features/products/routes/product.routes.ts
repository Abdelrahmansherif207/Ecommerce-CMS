export const productRoutes = {
  list: '/products',
  create: '/products/create',
  detail: (id: number) => `/products/${id}`,
} as const;
