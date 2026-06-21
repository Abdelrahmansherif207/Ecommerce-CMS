import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AdminLayout } from "@/layouts/admin-layout";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { CategoriesPage } from "@/features/categories/pages/categories-page";
import { SettingsPage } from "@/features/settings/pages/settings-page";
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
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
