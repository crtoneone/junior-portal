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
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Správa odoslaná</h1>
          <p className="text-gray-500 mb-6">Ďakujeme za tvoju správu. Ozveme sa ti čo najskôr.</p>
          <Link href="/">
            <Button variant="outline">Späť na hlavnú stránku</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="bg-gradient-to-br from-[#644AE9] to-[#4A35B8]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kontaktuj nás</h1>
          <p className="text-lg text-white/80">Máš otázku, nápad na spoluprácu alebo si našiel chybu? Napíš nám.</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
            <Mail className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <a href="mailto:info@dajflek.sk" className="text-sm text-blue-600 hover:underline">info@dajflek.sk</a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
            <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Rýchla odpoveď</p>
              <p className="text-sm text-gray-500">Zvyčajne do 24 hodín</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meno</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tvoje meno" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tvoj@email.sk" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Predmet</label>
            <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Čo potrebuješ?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Správa</label>
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
  );
}
