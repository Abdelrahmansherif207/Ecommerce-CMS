import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "@/layouts/admin-layout";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { CategoriesPage } from "@/features/categories/pages/categories-page";
import { SettingsPage } from "@/features/settings/pages/settings-page";
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
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { GuestRoute } from "@/features/auth/components/guest-route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
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
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


