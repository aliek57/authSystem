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
      if (error.message.includes('auth/invalid-credential')) {
        toast.error(t('notifications.invalid_credentials_error'));
      } else {
        toast.error(t('notifications.error_generic'));
        navigate('/error');
      }
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
      if (error.message.includes('auth/email-already-in-use')) {
        toast.error(t('notifications.email_already_in_use_error'));
      } else {
        toast.error(t('notifications.error_generic'));
        navigate('/error');
      }
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
      navigate('/error');
    }
  });
}

export function useDeleteAccountMutation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (password: string) => authService.deleteAccount(password),
    onSuccess: () => {
      toast.success(t('notifications.delete_success'));
      navigate('/login');
    },
    onError: (error: any) => {
      if (error.message.includes('auth/wrong-password') || error.message.includes('auth/invalid-credential')) {
        toast.error('Senha incorreta.');
      } else {
        toast.error(error.message || t('notifications.error_generic'));
      }
    }
  });
}

export function useUpdateProfileMutation() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      toast.success(t('notifications.update_success'));
    },
    onError: () => {
      toast.error(t('notifications.error_generic'));
      navigate('/error');
    }
  });
}