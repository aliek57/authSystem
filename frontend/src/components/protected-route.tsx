import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/not-logged" replace />;
  }

  return <Outlet />;
}