import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AdminLayout } from '@/layouts/admin-layout'
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
