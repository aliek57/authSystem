import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import { useLogoutMutation } from '../hooks/use-auth-mutations';
import { GlowCard } from '../components/glow-card';
import { Modal } from '../components/modal';
import { AnimatedPage } from '../components/animated-page';
import { motion } from 'framer-motion';

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const logoutMutation = useLogoutMutation();
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileImage = user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=7aa2f7&color=1a1b26`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-[#1a1b26] dark:text-zinc-50 p-4">
      <AnimatedPage className="w-full max-w-md">
      <GlowCard glowColor="green" customSize className="w-full max-w-md bg-white dark:bg-[#24283b]/50">
        <div className="flex flex-col items-center p-6 text-center">
          
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-[#7aa2f7] shadow-lg shadow-[#7aa2f7]/20">
            <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
          </div>

          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-white">{user?.displayName || 'Usuário'}</h1>
          <p className="mb-8 text-sm text-zinc-500 dark:text-[#c0caf5]">{t('dashboard.title')}</p>

          <div className="w-full space-y-4 text-left">
            <div className="flex items-center gap-3 rounded-md bg-zinc-100 dark:bg-[#1f2335] p-3 border border-zinc-300 dark:border-[#414868]">
              <User className="h-5 w-5 text-[#7aa2f7]" />
              <div>
                <p className="text-xs text-zinc-500 dark:text-[#c0caf5]">{t('dashboard.name')}</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{user?.displayName || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-zinc-100 dark:bg-[#1f2335] p-3 border border-zinc-300 dark:border-[#414868]">
              <Mail className="h-5 w-5 text-[#7aa2f7]" />
              <div>
                <p className="text-xs text-zinc-500 dark:text-[#c0caf5]">{t('dashboard.email')}</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/edit-profile')}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] py-2.5 font-bold text-[#1a1b26] transition-all hover:bg-[#8db0f8] cursor-pointer"
            >
              <Edit2 className="h-4 w-4" />
              {t('dashboard.button_edit')}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#f7768e] bg-transparent py-2.5 font-bold text-[#f7768e] transition-all hover:bg-[#f7768e]/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              {t('dashboard.button_logout')}
            </motion.button>
          </div>
        </div>
      </GlowCard>

      <Modal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        title={t('modals.logout.title')}
      >
        <p className="mb-6 text-sm text-zinc-500 dark:text-[#c0caf5]">{t('modals.logout.description')}</p>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsLogoutModalOpen(false)}
            className="flex-1 rounded-md bg-zinc-200 dark:bg-[#1f2335] py-2 font-medium text-zinc-900 dark:text-white transition-colors hover:bg-zinc-300 dark:hover:bg-[#292e42] cursor-pointer"
          >
            {t('modals.logout.cancel')}
          </button>
          <button 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="flex-1 rounded-md bg-[#f7768e] py-2 font-medium text-white transition-colors hover:bg-[#ff8c9a] disabled:opacity-70 cursor-pointer"
          >
            {t('modals.logout.confirm')}
          </button>
        </div>
      </Modal>
      </AnimatedPage>
    </div>
  );
}