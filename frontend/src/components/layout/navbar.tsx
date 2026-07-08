'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="/jobs" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
        Ponuky
      </Link>
      <Link href="/pricing" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
        Cenník
      </Link>
      <Link href="/contact" className="text-base text-white/80 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
        Kontakt
      </Link>
      <Link href="/landing-ai" className="text-base text-[#DCEF62] hover:text-[#DCEF62]/80 transition-colors font-medium" onClick={() => setMobileOpen(false)}>
        AI
      </Link>
      <Link href="/landing-spatial" className="text-base text-[#8B7CF7] hover:text-[#8B7CF7]/80 transition-colors font-medium" onClick={() => setMobileOpen(false)}>
        Spatial
      </Link>
      <Link href="/landing-brutalist" className="text-base text-[#00ff41] hover:text-[#00ff41]/80 transition-colors font-bold" onClick={() => setMobileOpen(false)}>
        Brutal
      </Link>
      <Link href="/landing-tactile" className="text-base text-[#FF6B35] hover:text-[#FF6B35]/80 transition-colors font-medium" onClick={() => setMobileOpen(false)}>
        Tactile
      </Link>
      <Link href="/landing-calm" className="text-base text-white/60 hover:text-white/80 transition-colors" onClick={() => setMobileOpen(false)}>
        Calm
      </Link>
      <Link href="/landing-corporate" className="text-base text-blue-400 hover:text-blue-300 transition-colors" onClick={() => setMobileOpen(false)}>
        Corporate
      </Link>
      <Link href="/landing-futuristic" className="text-base text-cyan-400 hover:text-cyan-300 transition-colors" onClick={() => setMobileOpen(false)}>
        Futuristic
      </Link>
      <Link href="/landing-vibrant" className="text-base text-[#FF4757] hover:text-[#FF4757]/80 transition-colors font-bold" onClick={() => setMobileOpen(false)}>
        Vibrant
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#644AE9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="DajFlek" className="h-[52px] w-auto max-w-none -ml-[30px]" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks}
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-white/10" />
            ) : user ? (
              <>
                {user.role === 'CANDIDATE' && (
                  <Link href="/cv" className="text-base text-white/80 hover:text-white">
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
                  className="text-base text-white/80 hover:text-white"
                >
                  {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                </Link>
                {user.role === 'ADMIN' && (
                  <Link href="/dashboard/admin/messages" className="text-base text-white/80 hover:text-white flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> Správy
                  </Link>
                )}
                <Button variant="outline" size="sm" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={logout}>
                  Odhlásiť
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="h-[44px] px-6 border-white/30 bg-white/10 text-white hover:bg-white/20">Prihlásiť</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="h-[44px] px-6 bg-white text-[#644AE9] hover:bg-white/90">Registrovať</Button>
                </Link>
              </>
            )}

            <button
              className="md:hidden ml-2 p-2 text-white"
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
        <div className="md:hidden bg-[#644AE9] border-t border-white/10 pb-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-3 pt-4">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
}
