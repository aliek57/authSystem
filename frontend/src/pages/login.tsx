import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { getAuthSchemas, type LoginFormData } from '../utils/auth-schemas';
import { GlowCard } from '../components/glow-card';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../hooks/use-auth-mutations';
import { Loader } from '../components/loader';
import { PasswordInput } from '../components/password-input';
import { AnimatedPage } from '../components/animated-page';
import { motion } from 'framer-motion';
import { AnimatedForm } from '../components/animated-form';

export function Login() {
  const { t } = useTranslation();
  const { loginSchema } = getAuthSchemas(t);
  const loginMutation = useLoginMutation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
        onError: () => {
            reset({ email: '', password: '' });
        }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-[#1a1b26] dark:text-zinc-50 p-4">
        <Loader
            isLoading={loginMutation.isPending}
            text={t('login.loading')}
        />
      <AnimatedPage className="w-full max-w-md"> 
        <GlowCard glowColor="purple" customSize className="w-full max-w-md bg-white dark:bg-[#24283b]/50">
            <div className="p-4">
            <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white text-center">{t('login.title')}</h1>
            
            <AnimatedForm onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('login.email')}</label>
                <input 
                    {...register('email')}
                    type="email"
                    disabled={loginMutation.isPending}
                    className="w-full rounded-md border border-zinc-300 dark:border-[#414868] bg-white dark:bg-[#1a1b26] p-2 text-zinc-900 dark:text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
                />
                {errors.email && (
                    <span className="mt-1 text-sm text-[#f7768e]">{errors.email.message}</span>
                )}
                </div>

                <div>
                <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('login.password')}</label>
                <PasswordInput 
                    {...register('password')}
                    disabled={loginMutation.isPending}
                />
                {errors.password && (
                    <span className="mt-1 text-sm text-[#f7768e]">{errors.password.message}</span>
                )}
                </div>

                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loginMutation.isPending}
                    className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] py-2.5 font-bold text-[#1a1b26] shadow-lg shadow-[#7aa2f7]/20 transition-all duration-300 hover:opacity-85 hover:shadow-[#7aa2f7]/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                {t('login.button')}
                </motion.button>
            </AnimatedForm>
                <div className="mt-6 text-center text-sm text-zinc-500 dark:text-[#c0caf5]">
                    {t('login.text')} <Link to="/register" className="text-[#7aa2f7] hover:underline"> {t('login.redirect_register')} </Link>
                </div>
            </div>
        </GlowCard>
      </AnimatedPage>
    </div>
  );
}