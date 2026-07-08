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
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kontaktné správy</h1>
        <div className="text-sm text-gray-500">Celkom: {total}</div>
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
            <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Žiadne správy</div>
          ) : (
            <div className="divide-y">
              {messages.map((m: any) => (
                <Link
                  key={m.id}
                  href={`/dashboard/admin/messages/${m.id}`}
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${m.status === 'UNREAD' ? 'bg-blue-50/50' : ''}`}
                >
                  <div className={`mt-1 p-2 rounded-full ${m.status === 'UNREAD' ? 'bg-blue-100 text-blue-600' : m.status === 'REPLIED' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {m.status === 'UNREAD' ? <Mail className="w-4 h-4" /> : m.status === 'REPLIED' ? <Reply className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm font-medium ${m.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-700'}`}>{m.name}</span>
                      <Badge variant={m.status === 'UNREAD' ? 'warning' : m.status === 'REPLIED' ? 'success' : 'secondary'}>
                        {statusLabels[m.status]}
                      </Badge>
                    </div>
                    <p className={`text-sm ${m.status === 'UNREAD' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{m.subject}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{m.message}</p>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
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
          <span className="text-sm text-gray-600">Stránka {page} z {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
