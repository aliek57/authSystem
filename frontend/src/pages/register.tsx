import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAuthSchemas, type RegisterFormData } from '../utils/auth-schemas';
import { GlowCard } from '../components/glow-card';
import { useRegisterMutation } from '../hooks/use-auth-mutations';
import { Loader } from '../components/loader';
import { PasswordInput } from '../components/password-input';

export function Register() {
  const { t } = useTranslation();
  const { registerSchema } = getAuthSchemas(t);
  const registerMutation = useRegisterMutation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
        onError: () => {
            reset({ name: '', email: '', password: '', confirm_password: '' });
        }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-zinc-50 p-4">
      <Loader 
        isLoading={registerMutation.isPending} 
        text={t('register.loading')} 
      />
      <GlowCard glowColor="purple" customSize className="w-full max-w-md bg-[#24283b]/50">
        <div className="p-4">
          <h1 className="mb-6 text-2xl font-bold text-white text-center">{t('register.title')}</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">Nome</label>
              <input 
                {...register('name')}
                disabled={registerMutation.isPending}
                className="w-full rounded-md border border-[#414868] bg-[#1a1b26] p-2 text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.name && <span className="mt-1 text-sm text-[#f7768e]">{errors.name.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">{t('register.email')}</label>
              <input 
                {...register('email')}
                type="email"
                disabled={registerMutation.isPending}
                className="w-full rounded-md border border-[#414868] bg-[#1a1b26] p-2 text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.email && <span className="mt-1 text-sm text-[#f7768e]">{errors.email.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">{t('register.password')}</label>
              <PasswordInput 
                {...register('password')}
                disabled={registerMutation.isPending}
              />
              {errors.password && <span className="mt-1 text-sm text-[#f7768e]">{errors.password.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#c0caf5]">Confirmar Senha</label>
              <PasswordInput 
                {...register('confirm_password')}
                disabled={registerMutation.isPending}
              />
              {errors.confirm_password && <span className="mt-1 text-sm text-[#f7768e]">{errors.confirm_password.message}</span>}
            </div>

            <button 
              type="submit"
              disabled={registerMutation.isPending}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] py-2.5 font-bold text-[#1a1b26] shadow-lg shadow-[#7aa2f7]/20 transition-all duration-300 hover:opacity-85 hover:shadow-[#7aa2f7]/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {t('register.button')}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-[#c0caf5]">
            {t('register.text')} <Link to="/login" className="text-[#7aa2f7] hover:underline"> {t('register.redirect_login')} </Link>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}