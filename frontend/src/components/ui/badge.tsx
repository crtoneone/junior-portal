import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)]',
    secondary: 'bg-[var(--jp-surface)] text-[var(--jp-text)] border border-[var(--jp-border)]',
    outline: 'border-2 border-[var(--jp-border)] bg-transparent text-[var(--jp-text)]',
    success: 'bg-[var(--jp-accent-grad)] text-[var(--jp-text)] border border-[var(--jp-border)]',
    warning: 'bg-[var(--jp-signal)] text-[var(--jp-ink)] border border-[var(--jp-border)]',
    danger: 'bg-[var(--jp-signal)] text-[var(--jp-ink)] border border-[var(--jp-border)]',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
}
