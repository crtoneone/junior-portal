'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Mail } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/landing-')) return null;

  const navClasses = 'bl-mono text-[12px] font-semibold text-[var(--jp-text)] hover:text-[var(--jp-signal)] transition-colors';

  const navLinks = (
    <>
      <Link href="/jobs" className={navClasses} onClick={() => setMobileOpen(false)}>
        Ponuky
      </Link>
      <Link href="/pricing" className={navClasses} onClick={() => setMobileOpen(false)}>
        Cenník
      </Link>
      <Link href="/contact" className={navClasses} onClick={() => setMobileOpen(false)}>
        Kontakt
      </Link>
      <ThemeSwitcher />
    </>
  );

  const authActions = (
    <>
      {loading ? (
        <div className="h-10 w-24 animate-pulse border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] md:hidden" />
      ) : user ? (
        <>
          <div className="md:hidden flex flex-col gap-1 pt-2">
            <p className="bl-mono text-[12px] font-semibold text-[var(--jp-muted)] px-1">
              {user.firstName} {user.lastName} — {user.role === 'ADMIN' ? 'Admin' : user.role === 'CANDIDATE' ? 'Kandidát' : 'Firma'}
            </p>
            <Link
              href={
                user.role === 'ADMIN'
                  ? '/dashboard/admin'
                  : user.role === 'CANDIDATE'
                  ? '/dashboard/candidate'
                  : '/dashboard/employer'
              }
              className={`${navClasses} flex items-center justify-between px-1 py-2 hover:text-[var(--jp-signal)]`}
            >
              {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'} <ArrowUpRight className="w-4 h-4" />
            </Link>
            {user.role === 'ADMIN' && (
              <Link
                href="/dashboard/admin/messages"
                className={`${navClasses} flex items-center justify-between px-1 py-2 hover:text-[var(--jp-signal)]`}
              >
                Správy <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <button onClick={logout} className={`${navClasses} text-left flex items-center justify-between px-1 py-2 hover:text-[var(--jp-signal)]`}>
              Odhlásiť <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {user.role === 'CANDIDATE' && (
              <Link href="/cv" className={navClasses}>
                CV Builder
              </Link>
            )}
            <Link
              href={
                user.role === 'ADMIN'
                  ? '/dashboard/admin'
                  : user.role === 'CANDIDATE'
                  ? '/dashboard/candidate'
                  : '/dashboard/employer'
              }
              className={navClasses}
            >
              {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
            </Link>
            {user.role === 'ADMIN' && (
              <Link href="/dashboard/admin/messages" className={`${navClasses} flex items-center gap-1`}>
                <Mail className="w-3.5 h-3.5" /> Správy
              </Link>
            )}
            <Button variant="outline" size="sm" onClick={logout}>
              Odhlásiť
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="md:hidden grid grid-cols-2 gap-3">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="bl-mono flex h-[52px] w-full min-w-0 items-center justify-center border-2 border-[var(--jp-text)] px-2 text-[14px] font-bold uppercase text-[var(--jp-text)] hover:border-[var(--jp-signal)] hover:text-[var(--jp-signal)] transition-colors">
              Prihlásiť
            </Link>
            <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="bl-mono flex h-[52px] w-full min-w-0 items-center justify-center border-2 border-[var(--jp-text)] bg-[var(--jp-signal)] px-2 text-[14px] font-bold uppercase text-[var(--jp-text)] hover:opacity-80 transition-colors">
              Registrovať
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className={navClasses}>
              Prihlásiť
            </Link>
            <Link href="/auth/register" className={navClasses}>
              <Button className="h-[44px] px-6">Registrovať</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[var(--jp-bg)] border-b-2 border-[var(--jp-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-black text-2xl tracking-tighter uppercase text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-display-font)' }}>
              DajFlek<span className="text-[var(--jp-signal)]">®</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {authActions}
            </div>

            <button
              className="md:hidden ml-2 p-2 text-[var(--jp-text)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--jp-bg)] border-t-2 border-[var(--jp-border)] pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 pt-4">
            {navLinks}
            <div className="flex flex-col gap-4 border-t-2 border-[var(--jp-border)] pr-4 pt-3">
              {authActions}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}