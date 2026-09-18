'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.role === 'CANDIDATE') router.push('/dashboard/candidate');
    else if (user.role === 'EMPLOYER') router.push('/dashboard/employer');
    else if (user.role === 'ADMIN') router.push('/dashboard/admin');
  }, [user, loading, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
      <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
    </div>
  );
}
