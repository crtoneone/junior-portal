'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function EmployerAuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/auth/register?role=employer');
    } else {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
      <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
    </div>
  );
}
