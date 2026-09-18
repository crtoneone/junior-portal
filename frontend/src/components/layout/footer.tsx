'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/landing-')) return null;

  const link = 'bl-mono text-[11px] font-semibold text-[var(--jp-text)] hover:text-[var(--jp-signal)] transition-colors';
  const head = 'bl-mono text-[10px] font-bold uppercase tracking-wider text-[var(--jp-muted)] mb-3';

  return (
    <footer className="border-t-2 border-[var(--jp-border)] bg-[var(--jp-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <span className="font-black text-xl tracking-tighter uppercase text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-display-font)' }}>
                DajFlek<span className="text-[var(--jp-signal)]">®</span>
              </span>
            </div>
            <p className="text-sm text-[var(--jp-muted)]">
              Pomáhame juniorom a stážistom nájsť ich prvú prácu v IT.
            </p>
          </div>
          <div>
            <h3 className={head}>Pre uchádzačov</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className={link}>Ponuky prác</Link></li>
              <li><Link href="/cv" className={link}>CV Builder</Link></li>
              <li><Link href="/auth/register" className={link}>Registrácia</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>Pre firmy</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className={link}>Cenník</Link></li>
              <li><Link href="/auth/register" className={link}>Pridať ponuku</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-sm text-[var(--jp-muted)]">info@dajflek.sk</li>
              <li className="text-sm text-[var(--jp-muted)]">Bratislava, Slovensko</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-[var(--jp-border)] pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="bl-mono text-[11px] text-[var(--jp-muted)]">&copy; 2026 DajFlek. Všetky práva vyhradené.</p>
          <p className="bl-mono text-[11px] text-[var(--jp-muted)]">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)] mr-2" />
            Práca, ktorá robí hluk.
          </p>
        </div>
      </div>
    </footer>
  );
}