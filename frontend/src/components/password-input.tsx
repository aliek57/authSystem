import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          className={`w-full rounded-md border border-zinc-300 dark:border-[#414868] bg-white dark:bg-[#1a1b26] p-2 pr-10 text-zinc-900 dark:text-white outline-none transition-all focus:border-[#7aa2f7] focus:ring-1 focus:ring-[#7aa2f7] disabled:opacity-50 ${className || ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-[#c0caf5] hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';