import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { getAuthSchemas, type LoginFormData } from '../utils/auth-schemas';
import { GlowCard } from '../components/glow-card';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../hooks/use-auth-mutations';

export function Login() {
  const { t } = useTranslation();
  const { loginSchema } = getAuthSchemas(t);
  const loginMutation = useLoginMutation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-zinc-50 p-4">
      <GlowCard glowColor="purple" customSize className="w-full max-w-md bg-[#24283b]/50">
        <div className="p-4">
          <h1 className="mb-6 text-2xl font-bold text-white text-center">{t('login.title')}</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">{t('login.email')}</label>
              <input 
                {...register('email')}
                type="email"
                disabled={loginMutation.isPending}
                className="w-full rounded-md border border-[#414868] bg-[#1a1b26] p-2 text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.email && (
                <span className="mt-1 text-sm text-[#f7768e]">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">{t('login.password')}</label>
              <input 
                {...register('password')}
                type="password"
                disabled={loginMutation.isPending}
                className="w-full rounded-md border border-[#414868] bg-[#1a1b26] p-2 text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.password && (
                <span className="mt-1 text-sm text-[#f7768e]">{errors.password.message}</span>
              )}
            </div>

            <button 
              type="submit"
              disabled={loginMutation.isPending}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] py-2.5 font-bold text-[#1a1b26] shadow-lg shadow-[#7aa2f7]/20 transition-all duration-300 hover:opacity-85 hover:shadow-[#7aa2f7]/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('login.loading')}
                </>
              ) : (
                t('login.button')
              )}
            </button>
          </form>
            <div className="mt-6 text-center text-sm text-[#c0caf5]">
                {t('login.text')} <Link to="/register" className="text-[#7aa2f7] hover:underline"> {t('login.redirect_register')} </Link>
            </div>
        </div>
      </GlowCard>
    </div>
  );
}