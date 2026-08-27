import { useNavigate } from 'react-router-dom';
import { ServerCrash, Home } from 'lucide-react';
import { GlowCard } from '../components/glow-card';
import { useTranslation } from 'react-i18next';

export function GenericError() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] p-4 text-zinc-50">
      <GlowCard glowColor="red" customSize className="w-full max-w-md bg-[#24283b]/50">
        <div className="flex flex-col items-center p-6 text-center">
          
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7768e]/10 shadow-lg shadow-[#f7768e]/20">
            <ServerCrash className="h-10 w-10 text-[#f7768e]" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">{t('generic_error.title')}</h1>
          <p className="mb-8 text-sm text-[#c0caf5]">
            {t('generic_error.description')}
          </p>

          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#f7768e] to-[#ff8c9a] py-2.5 font-bold text-[#1a1b26] shadow-lg shadow-[#f7768e]/20 transition-all duration-300 hover:opacity-85 hover:shadow-[#f7768e]/40 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            {t('generic_error.button')}
          </button>
        </div>
      </GlowCard>
    </div>
  );
}