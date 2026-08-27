import { type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 dark:bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg bg-white dark:bg-[#24283b] p-6 shadow-xl border border-zinc-200 dark:border-[#414868]">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
        {children}
      </div>
    </div>
  );
}