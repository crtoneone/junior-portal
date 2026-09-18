'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Prihlásenie zlyhalo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 sm:p-10 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
            <p className="bl-mono text-[12px] uppercase tracking-wide opacity-60 mb-4">Prihlásenie</p>
            <h1 className="bl-display text-4xl sm:text-6xl leading-[0.95]">
              Späť<br />do <span className="text-[var(--jp-signal)]">akcie.</span>
            </h1>
            <p className="bl-mono mt-6 text-[12px] leading-6 opacity-70">
              Prihlás sa a pokračuj v snahe nájsť si prácu, ktorá robí hluk.
            </p>
          </div>

          <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-6 sm:p-8">
            <div className="border-b-2 border-[var(--jp-border)] pb-4 mb-6">
              <div className="bl-mono text-[11px] text-[var(--jp-muted)] mb-1">01 / Vstup</div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Prihlásenie</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="border-2 border-[var(--jp-signal)] bg-[var(--jp-signal)] p-3 bl-mono text-[12px] text-[var(--jp-ink)]">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tvoj@email.sk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <Link href="/auth/forgot-password" className="bl-mono text-[12px] text-[var(--jp-muted)] hover:text-[var(--jp-signal)]">
                  Zabudnuté heslo?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
              </Button>
            </form>
            <p className="bl-mono mt-5 pt-4 border-t-2 border-[var(--jp-border)] text-[12px] text-[var(--jp-muted)]">
              Ešte nemáš účet?{' '}
              <Link href="/auth/register" className="font-bold text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
                Registruj sa
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}