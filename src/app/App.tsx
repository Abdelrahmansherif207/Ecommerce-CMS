import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "@/layouts/admin-layout";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { CategoriesPage } from "@/features/categories/pages/categories-page";
import { BrandsPage } from "@/features/brands/pages/brands-page";
import { SlidersPage } from "@/features/sliders/pages/sliders-page";
import { FlashSalePage } from "@/features/flash-sale/pages/flash-sale-page";
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
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/sliders" element={<SlidersPage />} />
            <Route path="/flash-sale" element={<FlashSalePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


