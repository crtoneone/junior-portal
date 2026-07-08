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

  if (loading) return <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>;
  if (!message) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <Link href="/dashboard/admin/messages" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Späť na zoznam správ
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">{message.subject}</CardTitle>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{message.name}</span>
              <span>·</span>
              <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">{message.email}</a>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{new Date(message.createdAt).toLocaleString('sk-SK')}</span>
              <Badge variant={message.status === 'UNREAD' ? 'warning' : message.status === 'REPLIED' ? 'success' : 'secondary'}>
                {statusLabels[message.status]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
            {message.message}
          </div>
        </CardContent>
      </Card>

      {message.reply && (
        <div className="mt-4 ml-6 border-l-4 border-green-300 bg-green-50 rounded-r-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-2">
            <Reply className="w-4 h-4" />
            Tvoja odpoveď ({message.repliedAt ? new Date(message.repliedAt).toLocaleString('sk-SK') : ''})
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.reply}</p>
        </div>
      )}

      {message.status !== 'REPLIED' && (
        <Card className="mt-6">
          <CardHeader><CardTitle className="text-base">Odpovedať</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              placeholder="Napíš odpoveď..."
              className="min-h-[120px]"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">Odpoveď bude viditeľná v detaile správy</p>
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
