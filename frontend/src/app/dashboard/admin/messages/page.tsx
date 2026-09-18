'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Mail, MailOpen, Reply, Clock } from 'lucide-react';

const statusLabels: Record<string, string> = {
  UNREAD: 'Nová',
  READ: 'Prečítaná',
  REPLIED: 'Odpovedaná',
};

export default function AdminMessagesPage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      const res = await api.get(`/admin/contact-messages?${params}`, token);
      setMessages(res.messages);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch { toast.error('Chyba pri načítaní správ'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, [token, page, statusFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--jp-canvas)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-1 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Sprava
          </p>
          <h1 className="bl-display text-3xl">Správy<span className="text-[var(--jp-signal)]">.</span></h1>
        </div>
        <div className="bl-mono text-sm text-[var(--jp-muted)]">Celkom: {total}</div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-2">
            {['', 'UNREAD', 'READ', 'REPLIED'].map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setStatusFilter(s); setPage(1); }}
              >
                {s ? statusLabels[s] : 'Všetky'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" /></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-[var(--jp-muted)]">Žiadne správy</div>
          ) : (
            <div className="divide-y-2 divide-[var(--jp-border)]">
              {messages.map((m: any) => (
                <Link
                  key={m.id}
                  href={`/dashboard/admin/messages/${m.id}`}
                  className={`flex items-start gap-4 p-4 hover:bg-[var(--jp-surface)] transition-colors ${m.status === 'UNREAD' ? 'bg-[var(--jp-bg)]' : ''}`}
                >
                  <div className={`mt-1 p-2 border-2 border-[var(--jp-border)] ${m.status === 'UNREAD' ? 'bg-[var(--jp-signal)] text-[var(--jp-ink)]' : m.status === 'REPLIED' ? 'bg-[var(--jp-ink)] text-[var(--jp-signal)]' : 'bg-[var(--jp-surface)] text-[var(--jp-muted)]'}`}>
                    {m.status === 'UNREAD' ? <Mail className="w-4 h-4" /> : m.status === 'REPLIED' ? <Reply className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`bl-mono text-sm font-bold ${m.status === 'UNREAD' ? 'text-[var(--jp-text)]' : 'text-[var(--jp-text)]'}`}>{m.name}</span>
                      <Badge variant={m.status === 'UNREAD' ? 'warning' : m.status === 'REPLIED' ? 'success' : 'secondary'}>
                        {statusLabels[m.status]}
                      </Badge>
                    </div>
                    <p className={`bl-mono text-sm ${m.status === 'UNREAD' ? 'font-bold text-[var(--jp-text)]' : 'text-[var(--jp-muted)]'}`}>{m.subject}</p>
                    <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1 truncate">{m.message}</p>
                    <div className="flex items-center gap-1 mt-1.5 bl-mono text-xs text-[var(--jp-muted)]">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(m.createdAt).toLocaleString('sk-SK')}</span>
                      <span className="mx-1">·</span>
                      <span>{m.email}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="bl-mono text-sm text-[var(--jp-muted)]">Stránka {page} z {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
