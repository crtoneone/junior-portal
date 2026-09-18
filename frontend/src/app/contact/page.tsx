'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact-messages', form);
      setSent(true);
      toast.success('Správa odoslaná!');
    } catch (err: any) {
      toast.error(err.message || 'Chyba pri odosielaní');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-[var(--jp-canvas)]">
        <div className="text-center max-w-md border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-2 border-[var(--jp-border)] bg-[var(--jp-signal)]">
            <CheckCircle className="h-8 w-8 text-[var(--jp-ink)]" />
          </div>
          <h1 className="text-2xl font-bold uppercase text-[var(--jp-text)] mb-3">Správa odoslaná</h1>
          <p className="bl-mono text-[12px] text-[var(--jp-muted)] mb-6">Ďakujeme za tvoju správu. Ozveme sa ti čo najskôr.</p>
          <Link href="/">
            <Button variant="outline">Späť na hlavnú stránku</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 sm:p-10 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
            <p className="bl-mono text-[12px] uppercase tracking-wide opacity-60 mb-4">Kontakt</p>
            <h1 className="bl-display text-4xl sm:text-6xl leading-[0.95]">
              Ozvi<br />sa<span className="text-[var(--jp-signal)]">.</span>
            </h1>
            <p className="bl-mono mt-6 text-[12px] leading-6 opacity-70">
              Otázka, nápad na spoluprácu alebo chyba? Napíš nám.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--jp-ink-text)]">
                  <Mail className="w-5 h-5 text-[var(--jp-signal)]" />
                </div>
                <div>
                  <p className="bl-mono text-[11px] opacity-60">Email</p>
                  <a href="mailto:info@dajflek.sk" className="text-sm font-bold text-[var(--jp-ink-text)] hover:text-[var(--jp-signal)]">info@dajflek.sk</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--jp-ink-text)]">
                  <MessageSquare className="w-5 h-5 text-[var(--jp-signal)]" />
                </div>
                <div>
                  <p className="bl-mono text-[11px] opacity-60">Rýchla odpoveď</p>
                  <p className="text-sm font-bold text-[var(--jp-ink-text)]">Zvyčajne do 24 hodín</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-6 sm:p-8">
            <div className="border-b-2 border-[var(--jp-border)] pb-4 mb-6">
              <div className="bl-mono text-[11px] text-[var(--jp-muted)] mb-1">03 / Formulár</div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Napíš nám správu</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="bl-mono block text-[11px] font-bold uppercase text-[var(--jp-text)] mb-1.5">Meno</label>
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tvoje meno" />
                </div>
                <div>
                  <label className="bl-mono block text-[11px] font-bold uppercase text-[var(--jp-text)] mb-1.5">Email</label>
                  <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tvoj@email.sk" />
                </div>
              </div>
              <div>
                <label className="bl-mono block text-[11px] font-bold uppercase text-[var(--jp-text)] mb-1.5">Predmet</label>
                <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Čo potrebuješ?" />
              </div>
              <div>
                <label className="bl-mono block text-[11px] font-bold uppercase text-[var(--jp-text)] mb-1.5">Správa</label>
                <Textarea
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tvoja správa..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={sending}>
                {sending ? 'Odosielam...' : <><Send className="w-4 h-4 mr-2" /> Odoslať správu</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}