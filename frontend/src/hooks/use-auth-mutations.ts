import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/auth-service';

export function useLoginMutation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      toast.success(t('notifications.login_success'));
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.message || t('notifications.error_generic'));
    }
  });
}

export function useRegisterMutation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success(t('notifications.register_success'));
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.message || t('notifications.error_generic'));
    }
  });
}

export function useLogoutMutation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      toast.success(t('notifications.logout_success'));
      navigate('/login');
    },
    onError: () => {
      toast.error(t('notifications.error_generic'));
    }
  });
}

export function useDeleteAccountMutation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: authService.deleteAccount,
    onSuccess: () => {
      toast.success(t('notifications.delete_success'));
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.message || t('notifications.error_generic'));
    }
  });
}