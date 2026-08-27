import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export function PublicRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen bg-[#1a1b26]" />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}