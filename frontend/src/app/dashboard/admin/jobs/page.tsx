'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, ChevronLeft, ChevronRight, Trash2, XCircle, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';

const statusLabels: Record<string, string> = {
  ACTIVE: 'Aktívna',
  CLOSED: 'Uzavretá',
  DRAFT: 'Koncept',
};

export default function AdminJobsPage() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await api.get(`/admin/jobs?${params}`, token);
      setJobs(res.jobs);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch { toast.error('Chyba pri načítaní ponúk'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, [token, page, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchJobs(); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const changeStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/jobs/${id}/status`, { status }, token!);
      toast.success('Stav ponuky zmenený');
      fetchJobs();
    } catch { toast.error('Chyba'); }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Naozaj chceš odstrániť túto ponuku?')) return;
    try {
      await api.delete(`/admin/jobs/${id}`, token!);
      toast.success('Ponuka odstránená');
      fetchJobs();
    } catch { toast.error('Chyba'); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--jp-canvas)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-1 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Sprava
          </p>
          <h1 className="bl-display text-3xl">Ponuky<span className="text-[var(--jp-signal)]">.</span></h1>
        </div>
        <div className="bl-mono text-sm text-[var(--jp-muted)]">Celkom: {total}</div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--jp-muted)]" />
              <Input
                placeholder="Hľadať názov, popis, lokalitu..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['', 'ACTIVE', 'CLOSED', 'DRAFT'].map((s) => (
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" /></div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-[var(--jp-muted)]">Žiadne ponuky</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--jp-border)] bg-[var(--jp-surface)]">
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Názov</th>
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Firma</th>
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Lokalita</th>
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Stav</th>
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Prihlášky</th>
                    <th className="bl-mono text-left py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Vytvorené</th>
                    <th className="bl-mono text-right py-3 px-4 text-[10px] font-bold uppercase text-[var(--jp-muted)]">Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j: any) => (
                    <tr key={j.id} className="border-b-2 border-[var(--jp-border)] last:border-0 hover:bg-[var(--jp-surface)]">
                      <td className="py-3 px-4 font-bold uppercase text-[var(--jp-text)]">{j.title}</td>
                      <td className="py-3 px-4 text-[var(--jp-muted)]">{j.employer?.companyName || 'N/A'}</td>
                      <td className="py-3 px-4 text-[var(--jp-muted)]">{j.location}{j.isRemote ? ' (Remote)' : ''}</td>
                      <td className="py-3 px-4">
                        <Badge variant={j.status === 'ACTIVE' ? 'success' : j.status === 'CLOSED' ? 'warning' : 'outline'}>
                          {statusLabels[j.status] || j.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[var(--jp-muted)]">{j._count?.applications || 0}</td>
                      <td className="py-3 px-4 text-[var(--jp-muted)] bl-mono text-xs">{new Date(j.createdAt).toLocaleDateString('sk-SK')}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/jobs/${j.id}`} target="_blank">
                            <Button variant="ghost" size="sm" title="Zobraziť"><Eye className="w-4 h-4" /></Button>
                          </Link>
                          {j.status !== 'CLOSED' && (
                            <Button variant="ghost" size="sm" onClick={() => changeStatus(j.id, 'CLOSED')} title="Uzavrieť">
                              <XCircle className="w-4 h-4 text-orange-500" />
                            </Button>
                          )}
                          {j.status !== 'ACTIVE' && (
                            <Button variant="ghost" size="sm" onClick={() => changeStatus(j.id, 'ACTIVE')} title="Aktivovať">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => deleteJob(j.id)} title="Odstrániť">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
