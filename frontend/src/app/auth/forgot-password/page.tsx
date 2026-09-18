'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error('Zadaj email'); return; }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch {
      toast.error('Chyba pri odosielaní');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 sm:p-10 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
            <p className="bl-mono text-[12px] uppercase tracking-wide opacity-60 mb-4">Obnova hesla</p>
            <h1 className="bl-display text-4xl sm:text-6xl leading-[0.95]">
              Stratil si<br /><span className="text-[var(--jp-signal)]">heslo?</span>
            </h1>
            <p className="bl-mono mt-6 text-[12px] leading-6 opacity-70">
              Žiadny stres. Pošleme ti odkaz na obnovu a pôjdeš ďalej.
            </p>
          </div>

          <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-6 sm:p-8">
            <Link href="/auth/login" className="bl-mono inline-flex items-center text-[12px] text-[var(--jp-muted)] hover:text-[var(--jp-text)] mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" /> Späť na prihlásenie
            </Link>

            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="h-14 w-14 text-[var(--jp-signal)] mx-auto mb-4" />
                <h2 className="bl-display text-3xl mb-2">Email odoslaný</h2>
                <p className="bl-mono text-[12px] text-[var(--jp-muted)] leading-6">Ak účet s týmto emailom existuje, poslali sme ti odkaz na obnovu hesla.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Zabudnuté heslo</h2>
                <p className="bl-mono text-[12px] text-[var(--jp-muted)] mb-6">Zadaj email a pošleme ti odkaz na obnovu hesla.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tvoj@email.sk" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Mail className="h-4 w-4 mr-2" /> {loading ? 'Odosielam...' : 'Odoslať odkaz'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}