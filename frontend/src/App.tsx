import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';
import { Toaster } from 'react-hot-toast';
import { GenericError } from './pages/generic-error';
import { NotLogged } from './pages/not-logged';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { Register } from './pages/register';
import { EditProfile } from './pages/edit-profile';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ className: 'bg-[#24283b] text-white' }} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/error" element={<GenericError />} />
        <Route path="/not-logged" element={<NotLogged />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
