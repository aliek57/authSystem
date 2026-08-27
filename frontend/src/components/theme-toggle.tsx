import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-800 transition-all duration-400 hover:bg-zinc-300 dark:bg-[#1f2335] dark:text-[#7aa2f7] dark:hover:bg-[#292e42] cursor-pointer"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}