import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "@/layouts/admin-layout";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { Loader2 } from "lucide-react";

const DashboardPage = lazy(() => import("@/features/dashboard/pages/dashboard-page").then(m => ({ default: m.DashboardPage })));
const CategoriesPage = lazy(() => import("@/features/categories/pages/categories-page").then(m => ({ default: m.CategoriesPage })));
const SettingsPage = lazy(() => import("@/features/settings/pages/settings-page").then(m => ({ default: m.SettingsPage })));
const BrandsPage = lazy(() => import("@/features/brands/pages/brands-page").then(m => ({ default: m.BrandsPage })));
const SlidersPage = lazy(() => import("@/features/sliders/pages/sliders-page").then(m => ({ default: m.SlidersPage })));
const FaqsPage = lazy(() => import("@/features/faqs/pages/faqs-page").then(m => ({ default: m.FaqsPage })));
const FlashSalePage = lazy(() => import("@/features/flash-sale/pages/flash-sale-page").then(m => ({ default: m.FlashSalePage })));
const CouponsPage = lazy(() => import("@/features/coupons/pages/coupons-page").then(m => ({ default: m.CouponsPage })));
const ContactsPage = lazy(() => import("@/features/contacts/pages/contacts-page").then(m => ({ default: m.ContactsPage })));
const UsersPage = lazy(() => import("@/features/users/pages/users-page").then(m => ({ default: m.UsersPage })));
const PromotionsPage = lazy(() => import("@/features/promotions/pages/promotions-page").then(m => ({ default: m.PromotionsPage })));
const AttributesPage = lazy(() => import("@/features/attributes/pages/attributes-page").then(m => ({ default: m.AttributesPage })));
const RolesPage = lazy(() => import("@/features/roles/pages/roles-page").then(m => ({ default: m.RolesPage })));
const LoginPage = lazy(() => import("@/features/auth/pages/login-page").then(m => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/forgot-password-page").then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/reset-password-page").then(m => ({ default: m.ResetPasswordPage })));
const ProfilePage = lazy(() => import("@/features/profile/pages/profile-page").then(m => ({ default: m.ProfilePage })));
const ProductsPage = lazy(() => import("@/features/products/pages/products-page").then(m => ({ default: m.ProductsPage })));
const CreateProductPage = lazy(() => import("@/features/products/pages/create-product-page").then(m => ({ default: m.CreateProductPage })));
const ProductDetailPage = lazy(() => import("@/features/products/pages/product-detail-page").then(m => ({ default: m.ProductDetailPage })));
const OrdersPage = lazy(() => import("@/features/orders/pages/orders-page").then(m => ({ default: m.OrdersPage })));
const OrderDetailPage = lazy(() => import("@/features/orders/pages/order-detail-page").then(m => ({ default: m.OrderDetailPage })));
const SectionsPage = lazy(() => import("@/features/cms/pages/sections-page").then(m => ({ default: m.SectionsPage })));
const ActivityLogsPage = lazy(() => import("@/features/activity-logs/pages/activity-logs-page").then(m => ({ default: m.ActivityLogsPage })));
const NotificationsPage = lazy(() => import("@/features/notifications/pages/notifications-page").then(m => ({ default: m.NotificationsPage })));

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/products/create" element={<CreateProductPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/sliders" element={<SlidersPage />} />
              <Route path="/faqs" element={<FaqsPage />} />
              <Route path="/flash-sale" element={<FlashSalePage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/attributes" element={<AttributesPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/cms" element={<SectionsPage />} />
              <Route path="/activity-logs" element={<ActivityLogsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
