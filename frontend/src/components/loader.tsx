import { Loader2 } from 'lucide-react';

interface LoaderProps {
  isLoading: boolean;
  text?: string;
}

export function Loader({ isLoading, text = 'Carregando...' }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1b26]/80 backdrop-blur-md transition-all">
      <Loader2 className="mb-4 h-16 w-16 animate-spin text-[#7aa2f7]" />
      <h2 className="text-xl font-bold text-white tracking-wide">{text}</h2>
    </div>
  );
}