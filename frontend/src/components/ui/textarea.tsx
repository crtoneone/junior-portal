import { cn } from '@/lib/utils';
import { type TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-4 py-3 text-sm font-medium text-[var(--jp-text)] placeholder:font-normal placeholder:text-[var(--jp-muted)] focus:outline-none focus:bg-[var(--jp-bg)] focus:ring-2 focus:ring-[var(--jp-accent)] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
