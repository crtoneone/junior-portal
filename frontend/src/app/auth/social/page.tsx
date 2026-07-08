'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SocialAuthPage() {
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <p className="text-gray-500">{status}</p>
    </div>
  );
}
