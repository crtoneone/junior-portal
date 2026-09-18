'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function SocialAuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Spracúvam prihlásenie...');

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');

    if (token && refreshToken) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setStatus('Prihlásenie úspešné, presmerúvam...');
      setTimeout(() => {
        window.location.href = '/dashboard/candidate';
      }, 1000);
    } else {
      setStatus('Prihlásenie zlyhalo');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
      <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-8 text-center max-w-md w-full">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent mx-auto mb-4" />
        <p className="bl-mono text-[13px] text-[var(--jp-text)]">{status}</p>
      </div>
    </div>
  );
}

export default function SocialAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-8 text-center max-w-md w-full">
          <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent mx-auto mb-4" />
          <p className="bl-mono text-[13px] text-[var(--jp-text)]">Spracúvam prihlásenie...</p>
        </div>
      </div>
    }>
      <SocialAuthContent />
    </Suspense>
  );
}