import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "@/layouts/admin-layout";
<<<<<<< Updated upstream
=======
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { CategoriesPage } from "@/features/categories/pages/categories-page";
import { SettingsPage } from "@/features/settings/pages/settings-page";
import { ProductsPage } from "@/features/products/pages/products-page";
import { CreateProductPage } from "@/features/products/pages/create-product-page";
import { BrandsPage } from "@/features/brands/pages/brands-page";
import { SlidersPage } from "@/features/sliders/pages/sliders-page";
import { FaqsPage } from "@/features/faqs/pages/faqs-page";
import { FlashSalePage } from "@/features/flash-sale/pages/flash-sale-page";
import { CouponsPage } from "@/features/coupons/pages/coupons-page";
import { ContactsPage } from "@/features/contacts/pages/contacts-page";
import { UsersPage } from "@/features/users/pages/users-page";
import { PromotionsPage } from "@/features/promotions/pages/promotions-page";
import { AttributesPage } from "@/features/attributes/pages/attributes-page";
import { RolesPage } from "@/features/roles/pages/roles-page";
import { LoginPage } from "@/features/auth/pages/login-page";
>>>>>>> Stashed changes
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { GuestRoute } from "@/features/auth/components/guest-route";
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
const SectionsPage = lazy(() => import("@/features/cms/pages/sections-page").then(m => ({ default: m.SectionsPage })));

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
<<<<<<< Updated upstream
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
=======
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/products/create" element={<CreateProductPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/sliders" element={<SlidersPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/flash-sale" element={<FlashSalePage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/attributes" element={<AttributesPage />} />
            <Route path="/roles" element={<RolesPage />} />
>>>>>>> Stashed changes
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/sliders" element={<SlidersPage />} />
              <Route path="/faqs" element={<FaqsPage />} />
              <Route path="/flash-sale" element={<FlashSalePage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/attributes" element={<AttributesPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/cms" element={<SectionsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
