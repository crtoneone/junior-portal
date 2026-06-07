'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">J</div>
            <span className="text-lg font-bold text-gray-900">JuniorPortal</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Ponuky
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cenník
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
            ) : user ? (
              <>
                {user.role === 'CANDIDATE' && (
                  <Link href="/cv" className="text-sm text-gray-600 hover:text-gray-900">
                    CV Builder
                  </Link>
                )}
                <Link
                  href={user.role === 'CANDIDATE' ? '/dashboard/candidate' : '/dashboard/employer'}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Odhlásiť
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Prihlásiť</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Registrovať</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
