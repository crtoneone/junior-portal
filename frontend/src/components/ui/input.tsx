import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-4 py-2 text-sm font-medium text-[var(--jp-text)] placeholder:font-normal placeholder:text-[var(--jp-muted)] focus:outline-none focus:bg-[var(--jp-bg)] focus:ring-2 focus:ring-[var(--jp-accent)] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
