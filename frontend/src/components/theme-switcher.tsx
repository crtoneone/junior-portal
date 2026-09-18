'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme';
import { cn } from '@/lib/utils';

const OPTIONS: { key: ThemeName; label: string; route: string; desc: string }[] = [
  { key: 'bauhaus2', label: 'Bauhaus 2', route: '/landing-bauhaus2', desc: 'Brutalizmus + kajamlabs' },
  { key: 'bauhaus-primar', label: 'Bauhaus Primár', route: '/landing-bauhaus-primar', desc: 'Červená, žltá, modrá, tvary' },
  { key: 'bauhaus-poster', label: 'Bauhaus Poster', route: '/landing-bauhaus-poster', desc: 'Plagát, bočný pás, schody' },
  { key: 'brutal', label: 'Brutal', route: '/landing-brutal', desc: 'Grid, mono, oranžová, rám' },
  { key: 'brutal-dark', label: 'Brutal Dark', route: '/landing-brutal-dark', desc: 'Čierna, biele linky, mono' },
  { key: 'brutal-signal', label: 'Brutal Signal', route: '/landing-brutal-signal', desc: 'Oranžový hero, tvrdý grid' },
];

export function ThemeSwitcher({ className, light }: { className?: string; light?: boolean }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const activeRoute =
    pathname.startsWith('/landing-')
      ? (pathname.replace('/landing-', '') as ThemeName)
      : theme;

  const handleSelect = (opt: (typeof OPTIONS)[number]) => {
    setTheme(opt.key);
    setOpen(false);
    if (pathname !== opt.route) router.push(opt.route);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Vybrať tému"
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors h-[42px]',
          light
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'border-2 border-[var(--jp-border)] bg-[var(--jp-bg)] text-[var(--jp-text)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)]',
        )}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Téma</span>
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-50 w-72 max-h-[400px] overflow-y-auto border',
            light
              ? 'border-white/20 bg-[#644AE9] shadow-xl'
              : 'border-[var(--jp-border)] bg-[var(--jp-bg)] shadow-[var(--jp-shadow-strong)]',
          )}
        >
          {OPTIONS.map((opt) => {
            const isActive = activeRoute === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelect(opt)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors',
                  light ? 'hover:bg-white/10' : 'hover:bg-[var(--jp-surface)]',
                )}
              >
                <span>
                  <span className={cn('block text-xs font-bold uppercase tracking-wider', light ? 'text-white' : 'text-[var(--jp-text)]')}>
                    {opt.label}
                  </span>
                  <span className={cn('block text-[10px]', light ? 'text-white/60' : 'text-[var(--jp-muted)]')}>{opt.desc}</span>
                </span>
                {isActive && <Check className={cn('w-4 h-4 shrink-0', light ? 'text-white' : 'text-[var(--jp-accent)]')} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}