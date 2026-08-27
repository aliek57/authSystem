import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Camera, Trash2, ArrowLeft } from 'lucide-react';
import { getAuthSchemas, type UpdateProfileFormData } from '../utils/auth-schemas';
import { useAuth } from '../hooks/use-auth';
import { useUpdateProfileMutation, useDeleteAccountMutation } from '../hooks/use-auth-mutations';
import { GlowCard } from '../components/glow-card';
import { Modal } from '../components/modal';
import { Loader } from '../components/loader';
import { PasswordInput } from '../components/password-input';

export function EditProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { updateProfileSchema } = getAuthSchemas(t);
  const updateMutation = useUpdateProfileMutation();
  const deleteMutation = useDeleteAccountMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photoURL || null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
    }
  });

  const fallbackImage = `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=7aa2f7&color=1a1b26`;
  const displayImage = photoPreview || fallbackImage;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setRemovePhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setRemovePhoto(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    updateMutation.mutate({ 
      name: data.name || user?.displayName || '', 
      email: data.email, 
      password: data.password, 
      photoFile, 
      removePhoto 
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-[#1a1b26] dark:text-zinc-50 p-4">
      <Loader 
        isLoading={updateMutation.isPending || deleteMutation.isPending} 
        text={updateMutation.isPending ? t('edit_profile.loading') : t('modals.delete_account.loading')} 
      />
      <div className="mb-4 w-full max-w-md">
        <Link to="/dashboard" className="flex w-fit items-center gap-2 text-[#7aa2f7] transition-colors hover:text-zinc-900 dark:hover:text-[#8db0f8] hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {t('edit_profile.button_back')}
        </Link>
      </div>

      <GlowCard glowColor="blue" customSize className="w-full max-w-md bg-white dark:bg-[#24283b]/50">
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white text-center">{t('edit_profile.title')}</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            <div className="flex flex-col items-center gap-2">
              <div 
                className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-[#7aa2f7] shadow-lg transition-transform hover:scale-105"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={displayImage} alt="Profile Preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              <div className="mt-2 flex gap-4 text-xs font-medium">
                <button 
                  type="button"
                  className="cursor-pointer text-zinc-500 dark:text-[#c0caf5] transition-colors hover:text-zinc-900 dark:hover:text-[#7aa2f7] hover:underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('edit_profile.change_photo')}
                </button>
                
                <button 
                  type="button"
                  disabled={!user?.photoURL && !photoPreview}
                  onClick={handleRemovePhoto}
                  className="text-[#f7768e] transition-colors hover:text-[#ff8c9a] hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline cursor-pointer"
                >
                  {t('edit_profile.remove_photo')}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('dashboard.name')}</label>
              <input 
                {...register('name')}
                disabled={updateMutation.isPending}
                className="w-full rounded-md border border-zinc-300 dark:border-[#414868] bg-white dark:bg-[#1a1b26] p-2 text-zinc-900 dark:text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.name && <span className="mt-1 text-sm text-[#f7768e]">{errors.name.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('dashboard.email')}</label>
              <input 
                {...register('email')}
                type="email"
                disabled={updateMutation.isPending}
                className="w-full rounded-md border border-zinc-300 dark:border-[#414868] bg-white dark:bg-[#1a1b26] p-2 text-zinc-900 dark:text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50"
              />
              {errors.email && <span className="mt-1 text-sm text-[#f7768e]">{errors.email.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('edit_profile.password')}</label>
              <PasswordInput 
                {...register('password')}
                disabled={updateMutation.isPending}
              />
              {errors.password && <span className="mt-1 text-sm text-[#f7768e]">{errors.password.message}</span>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-500 dark:text-[#c0caf5]">{t('edit_profile.confirm_password')}</label>
              <PasswordInput 
                {...register('confirm_password')}
                disabled={updateMutation.isPending}
              />
              {errors.confirm_password && <span className="mt-1 text-sm text-[#f7768e]">{errors.confirm_password.message}</span>}
            </div>
            <button 
              type="submit"
              disabled={updateMutation.isPending}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] py-2.5 font-bold text-[#1a1b26] shadow-lg shadow-[#7aa2f7]/20 transition-all duration-300 hover:opacity-85 hover:shadow-[#7aa2f7]/40 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {t('edit_profile.button_save')}
            </button>
          </form>

          <div className="mt-8 border-t border-zinc-300 dark:border-[#414868] pt-6">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#f7768e] bg-transparent py-2.5 font-bold text-[#f7768e] transition-all hover:bg-[#f7768e]/10 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              {t('edit_profile.button_delete')}
            </button>
          </div>
        </div>
      </GlowCard>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletePassword('');
        }} 
        title={t('modals.delete_account.title')}
      >
        <p className="mb-4 text-sm text-zinc-500 dark:text-[#c0caf5]">{t('modals.delete_account.description')}</p>
        
        <PasswordInput 
          placeholder={t('modals.delete_account.password_placeholder')}
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />

        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => {
              setIsDeleteModalOpen(false);
              setDeletePassword('');
            }}
            className="flex-1 rounded-md bg-zinc-200 dark:bg-[#1f2335] py-2 font-medium text-zinc-900 dark:text-white transition-colors hover:bg-zinc-300 dark:hover:bg-[#292e42] cursor-pointer"
          >
            {t('modals.delete_account.cancel')}
          </button>
          <button 
            onClick={() => deleteMutation.mutate(deletePassword)}
            disabled={deleteMutation.isPending || !deletePassword}
            className="flex-1 flex items-center justify-center rounded-md bg-[#f7768e] py-2 font-medium text-white transition-colors hover:bg-[#ff8c9a] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {t('modals.delete_account.confirm')}
          </button>
        </div>
      </Modal>
    </div>
  );
}