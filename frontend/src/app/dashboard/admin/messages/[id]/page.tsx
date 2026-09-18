'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Reply, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const statusLabels: Record<string, string> = {
  UNREAD: 'Nová',
  READ: 'Prečítaná',
  REPLIED: 'Odpovedaná',
};

export default function AdminMessageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!token || !id) return;
    (async () => {
      try {
        const msg = await api.get(`/admin/contact-messages/${id}`, token);
        setMessage(msg);
        if (msg.status === 'UNREAD') {
          await api.patch(`/admin/contact-messages/${id}/read`, {}, token);
          setMessage((prev: any) => ({ ...prev, status: 'READ' }));
        }
      } catch { toast.error('Chyba pri načítaní správy'); router.push('/dashboard/admin/messages'); }
      finally { setLoading(false); }
    })();
  }, [token, id]);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      const updated = await api.post(`/admin/contact-messages/${id}/reply`, { reply: reply.trim() }, token!);
      setMessage(updated);
      toast.success('Odpoveď odoslaná');
      setReply('');
    } catch (e: any) { toast.error(e.message || 'Chyba'); }
    finally { setSending(false); }
  };

  if (loading) return <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-[var(--jp-canvas)]"><div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" /></div>;
  if (!message) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl bg-[var(--jp-canvas)]">
      <Link href="/dashboard/admin/messages" className="bl-mono inline-flex items-center gap-1.5 text-sm text-[var(--jp-muted)] hover:text-[var(--jp-text)] mb-6">
        <ArrowLeft className="w-4 h-4" /> Späť na zoznam správ
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg uppercase">{message.subject}</CardTitle>
            <div className="flex items-center gap-2 mt-2 bl-mono text-sm text-[var(--jp-muted)]">
              <span className="font-bold text-[var(--jp-text)]">{message.name}</span>
              <span>·</span>
              <a href={`mailto:${message.email}`} className="text-[var(--jp-signal)] font-bold hover:underline">{message.email}</a>
            </div>
            <div className="flex items-center gap-2 mt-1 bl-mono text-xs text-[var(--jp-muted)]">
              <Clock className="w-3 h-3" />
              <span>{new Date(message.createdAt).toLocaleString('sk-SK')}</span>
              <Badge variant={message.status === 'UNREAD' ? 'warning' : message.status === 'REPLIED' ? 'success' : 'secondary'}>
                {statusLabels[message.status]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] text-sm text-[var(--jp-text)] whitespace-pre-wrap">
            {message.message}
          </div>
        </CardContent>
      </Card>

      {message.reply && (
        <div className="mt-4 ml-6 border-l-4 border-[var(--jp-signal)] bg-[var(--jp-bg)] p-4 border-2 border-[var(--jp-border)]">
          <div className="flex items-center gap-2 bl-mono text-sm font-bold text-[var(--jp-signal)] mb-2">
            <Reply className="w-4 h-4" />
            Tvoja odpoveď ({message.repliedAt ? new Date(message.repliedAt).toLocaleString('sk-SK') : ''})
          </div>
          <p className="bl-mono text-sm text-[var(--jp-text)] whitespace-pre-wrap">{message.reply}</p>
        </div>
      )}

      {message.status !== 'REPLIED' && (
        <Card className="mt-6">
          <CardHeader><CardTitle className="text-base uppercase">Odpovedať</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              placeholder="Napíš odpoveď..."
              className="min-h-[120px]"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="bl-mono text-xs text-[var(--jp-muted)]">Odpoveď bude viditeľná v detaile správy</p>
              <Button onClick={sendReply} disabled={!reply.trim() || sending}>
                {sending ? 'Odosielam...' : <><Reply className="w-4 h-4 mr-1.5" /> Odoslať odpoveď</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
