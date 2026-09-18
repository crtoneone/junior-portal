'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'candidate';
  const [role, setRole] = useState<'candidate' | 'employer'>(defaultRole as any);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        ...form,
        role: role.toUpperCase(),
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registrácia zlyhala');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-6 sm:p-8">
      <div className="border-b-2 border-[var(--jp-border)] pb-4 mb-6">
        <div className="bl-mono text-[11px] text-[var(--jp-muted)] mb-1">02 / Registrácia</div>
        <h2 className="text-xl font-bold uppercase tracking-tight">Vytvor si účet</h2>
      </div>

      <div className="grid grid-cols-2 border-2 border-[var(--jp-border)] bg-[var(--jp-border)] gap-[2px] mb-6">
        <button
          onClick={() => setRole('candidate')}
          className={cn(
            'bl-mono py-3 text-[12px] font-bold uppercase transition-colors',
            role === 'candidate' ? 'bg-[var(--jp-signal)] text-[var(--jp-ink)]' : 'bg-[var(--jp-surface)] text-[var(--jp-muted)] hover:text-[var(--jp-text)]'
          )}
        >
          Hľadám prácu
        </button>
        <button
          onClick={() => setRole('employer')}
          className={cn(
            'bl-mono py-3 text-[12px] font-bold uppercase transition-colors',
            role === 'employer' ? 'bg-[var(--jp-signal)] text-[var(--jp-ink)]' : 'bg-[var(--jp-surface)] text-[var(--jp-muted)] hover:text-[var(--jp-text)]'
          )}
        >
          Hľadám ľudí
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="border-2 border-[var(--jp-signal)] bg-[var(--jp-signal)] p-3 bl-mono text-[12px] text-[var(--jp-ink)]">{error}</div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Meno</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Priezvisko</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tvoj@email.sk"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Heslo</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimálne 8 znakov"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
        </div>
        {role === 'employer' && (
          <div className="space-y-2">
            <Label htmlFor="companyName">Názov spoločnosti</Label>
            <Input
              id="companyName"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              required
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registrujem...' : 'Vytvoriť účet'}
        </Button>
      </form>
      <p className="bl-mono mt-5 pt-4 border-t-2 border-[var(--jp-border)] text-[12px] text-[var(--jp-muted)]">
        Už máš účet?{' '}
        <Link href="/auth/login" className="font-bold text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
          Prihlás sa
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 sm:p-10 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
            <p className="bl-mono text-[12px] uppercase tracking-wide opacity-60 mb-4">Registrácia</p>
            <h1 className="bl-display text-4xl sm:text-6xl leading-[0.95]">
              Tvoja prvá<br />práca<span className="text-[var(--jp-signal)]">.</span>
            </h1>
            <p className="bl-mono mt-6 text-[12px] leading-6 opacity-70">
              Zadarmo, bez záväzkov. Pre juniorov, stážistov a absolventov v IT.
            </p>
          </div>
          <Suspense fallback={
            <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-8">
              <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
            </div>
          }>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}