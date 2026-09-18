import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--jp-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] hover:bg-[var(--jp-accent-hover)]',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border-2 border-[var(--jp-border)] bg-transparent text-[var(--jp-text)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)]',
        secondary: 'bg-[var(--jp-surface)] text-[var(--jp-text)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)]',
        ghost: 'text-[var(--jp-text)] hover:bg-[var(--jp-surface)]',
        link: 'text-[var(--jp-accent)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-5 py-2',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
