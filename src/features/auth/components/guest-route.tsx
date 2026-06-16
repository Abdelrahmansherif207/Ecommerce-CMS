import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/auth.store';

export function GuestRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
