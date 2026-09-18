'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { toast.error('Neplatný odkaz'); return; }
    if (password.length < 6) { toast.error('Heslo musí mať aspoň 6 znakov'); return; }
    if (password !== confirm) { toast.error('Heslá sa nezhodujú'); return; }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setDone(true);
      toast.success('Heslo bolo zmenené');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (err: any) {
      toast.error(err.message || 'Chyba pri obnove hesla');
    } finally {
      setLoading(false);
    }
  };

  const shell = (children: React.ReactNode) => (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 sm:p-10 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
            <p className="bl-mono text-[12px] uppercase tracking-wide opacity-60 mb-4">Obnova hesla</p>
            <h1 className="bl-display text-4xl sm:text-6xl leading-[0.95]">
              Nové<br />heslo<span className="text-[var(--jp-signal)]">.</span>
            </h1>
            <p className="bl-mono mt-6 text-[12px] leading-6 opacity-70">
              Nastav si nové heslo a môžeš pokračovať v hľadaní.
            </p>
          </div>
          <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );

  if (!token) {
    return shell(
      <div className="text-center py-8">
        <p className="text-[var(--jp-signal)] bl-mono text-[13px] mb-4">Neplatný alebo expirovaný odkaz.</p>
        <Link href="/auth/forgot-password" className="bl-mono text-[13px] font-bold text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
          Požiadať o nový odkaz
        </Link>
      </div>
    );
  }

  return shell(
    done ? (
      <div className="text-center py-8">
        <CheckCircle className="h-14 w-14 text-[var(--jp-signal)] mx-auto mb-4" />
        <h2 className="bl-display text-3xl mb-2">Heslo zmenené</h2>
        <p className="bl-mono text-[12px] text-[var(--jp-muted)]">Presmerúvam na prihlásenie...</p>
      </div>
    ) : (
      <>
        <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Obnoviť heslo</h2>
        <p className="bl-mono text-[12px] text-[var(--jp-muted)] mb-6">Zadaj nové heslo.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nové heslo</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 znakov" required />
          </div>
          <div>
            <Label>Potvrdiť heslo</Label>
            <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Znovu zadaj heslo" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            <Lock className="h-4 w-4 mr-2" /> {loading ? 'Ukladám...' : 'Zmeniť heslo'}
          </Button>
        </form>
      </>
    )
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="bg-[var(--jp-canvas)] py-12">
        <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10">
          <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-8">
            <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
          </div>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}